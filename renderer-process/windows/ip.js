/**
 * Created by Hisune on 2016/8/19.
 * User: hi@hisune.com
 */
'use strict';

const ipToSearch = $('#ip-to-search'),
    ipWhere = $('#ip-where'),
    ipPing = $('#ip-ping'),
    ipTrace = $('#ip-trace'),
    ipPort = $('#ip-port'),
    ipResult = $('#ip-result'),
    geoip = require('geoip-lite'),
    dns = require('dns'),
    childProcess = require('child_process'),
    util = require('util'),
    net = require('net');

var initClick = function(call)
{
    let string = ipToSearch.val().trim(),
        array = string.replace(/\n/gi, ',').split(',').map(function(e){return e.trim();});
    if(string){
        ipResult.empty();
        array.forEach(function(item){
            call(item);
        });
    }
}

var geoResolve = function(item, display)
{
    let geo = geoip.lookup(item);
    ipResult.append((display || item) + ' : ' + (geo ? (geo.country + ' - ' + geo.city) : 'Unknown') + '<br>');
}

ipWhere.click(function(){
    initClick(function(item){
        if(item.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){ // ip
            geoResolve(item);
        }else{
            item = item.replace(/(^https?:\/\/)?/, '').replace(/\/(.*)/, '');
            dns.resolve4(item, function (err, addresses) {
                if (err){
                    ipResult.append(item + ' - DNS err' + '<br>');
                }else{
                    geoResolve(addresses[0], item + ' - ' + addresses[0]);
                }
            });
        }
    });
});

ipPing.click(function(){
    let cmd;
    if(process.platform == 'win32')
        cmd = 'chcp 65001 && ping %s -n 20';
    else
        cmd = 'ping %s -c 20';
    initClick(function(item){
        let _cmd = childProcess.exec(util.format(cmd, item));
        _cmd.stdout.on('data', function (data) {
            ipResult.append(data.toString('utf8').replace(/\r\n/g, '<br />'));
        });
    });
});

ipTrace.click(function(){
    let cmd;
    if(process.platform == 'win32')
        cmd = 'chcp 65001 && tracert %s';
    else
        cmd = 'traceroute %s';
    initClick(function(item){
        let _cmd = childProcess.exec(util.format(cmd, item));
        _cmd.stdout.on('data', function (data) {
            ipResult.append(data.toString('utf8').replace(/\r\n/g, '<br />'));
        });
    });
});

ipPort.click(function(){
    initClick(function(item){
        let array = item.split(':'), host = array[0], port = array[1] || 80;
        ipResult.append('connecting ' + item + '<br>');
        let client = net.connect({port: port, host: host}, () => {
            ipResult.append('connected to ' + host + ':' + port + ' successfully!<br>');
        });
        client.on('data', (data) => {
            ipResult.append('get data ' + data.toString() + '<br>');
            client.end();
        });
        client.on('error', (err) => {
            console.log('get error ' + err.message + '<br>');
            ipResult.append('get error ' + err.message + '<br>');
        });
        client.on('timeout', () => {
            console.log('connect timeout<br>');
            ipResult.append('connect timeout<br>');
        });
    });
});