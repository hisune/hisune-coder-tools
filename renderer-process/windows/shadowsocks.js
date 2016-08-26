/**
 * Created by Hisune on 2016/8/24.
 * User: hi@hisune.com
 */
'use strict';

const storage = require('electron-json-storage'),
    shadowsocks = require('shadowsocks'),
    util = require('util'),
    ssr = $('#shadowsocks-result');


util.log = function (s) {
    console.log(new Date().toLocaleString() + (" - " + s));
    return ssr.text(s);
};

let ss = {};
 
$('#ss-server-ip').change(function() {
    if($(this).val() == 'add'){
        $('#add-a-new-ip').show();
        $('#ss-server-port').val('8388');
        $('#ss-server-password').val('');
        $('#ss-server-local_port').val('1080');
        $('#ss-server-encryption').val('aes-256-cfb');
        $('#ss-server-timeout').val('600');
    }else{
        $('#add-a-new-ip').hide();
        fillSs(ss.ss[$(this).val()]);
    }
});

$('#ss-save').click(() => {
    let ip = $('#add-a-new-ip').val(),
        port = $('#ss-server-port').val(),
        password = $('#ss-server-password').val(),
        localPort = $('#ss-server-local_port').val(),
        encryption = $('#ss-server-encryption').val(),
        timeout = $('#ss-server-timeout').val();
    if(!ip || !port || !password || !localPort || !encryption){
        alert('参数不完整');
    }else{
        storage.get('shadowsocks', (error, data) => {
            data.default = ip;
            data.ss[ip] = {
                ip: ip,
                port: port,
                password: password,
                local_port: localPort,
                encryption: encryption,
                timeout: timeout
            };
            storage.set('shadowsocks', data, (error) => {
                initSs();
            });
        })
    }
});

$('#ss-delete').click(() => {
    storage.get('shadowsocks', (error, data) => {
        let val = $('#ss-server-ip').val();
        delete data.ss[val];
        if(val == data.default){
            data.default = 'add';
        }
        storage.set('shadowsocks', data, (error) => {
            initSs();
        });
    });
});

var fillSs = function(ss)
{
    $('#add-a-new-ip').val(ss.ip);
    for(var j in ss){
        $('#ss-server-' + j).val(ss[j]);
    }
};

var initSs = function()
{
    storage.get('shadowsocks', (error, data) => {
        if(Object.keys(data).length < 1){
            data = {default: 'add', ss: {}};
            storage.set('shadowsocks', data, () => {
                $('#add-a-new-ip').show();
            });
        }
        ss = data;
        let sssip = $('#ss-server-ip');
        sssip.html('<option value="add">Add a New</option>');
        for(var i in ss.ss){
            sssip.append('<option value="' + i + '">' + ss.ss[i].ip + '</option>');
            if(i == ss.default){
                fillSs(ss.ss[i]);
            }
        }
        if(ss.default == 'add') $('#add-a-new-ip').show();
        else{
            $('#add-a-new-ip').hide();
            try{
                if (window.shadowsocks && window.shadowsocks.address()) {
                    window.shadowsocks.close();
                }
                util.log('starting shadowscks');
                setTimeout(function(){
                    window.shadowsocks = shadowsocks.createServer(ss.ss[ss.default].ip, ss.ss[ss.default].port, ss.ss[ss.default].local_port, ss.ss[ss.default].password, ss.ss[ss.default].encryption, 1000 * (ss.ss[ss.default].timeout || 600), '127.0.0.1');
                }, 1000);
            }catch (e){
                console.log(e);
            }
        }
    });
}

initSs();

