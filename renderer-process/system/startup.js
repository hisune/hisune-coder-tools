/**
 * Created by Hisune on 2016/8/24.
 * User: hi@hisune.com
 */
'use strict';

const storage = require('electron-json-storage'),
    clipboard = require('electron').clipboard;

$('#add-startup,#add-startup-path').click(() => {
    const {dialog} = require('electron').remote,
        path = require('path');
    dialog.showOpenDialog({defaultPath: $('#add-startup-action').attr('data-path'), properties: ['openFile']}, (filter) => {
        if(filter){
            $('#add-startup-action').attr('data-path', filter[0]).show();
            $('#add-startup').hide();
            $('#add-startup-name').val(path.basename(filter[0]));
        }
    });
});

$('#add-startup-delete').click(() => {
    let path = $('#add-startup-action').attr('data-path');
    storage.get('startup', (error, data) => {
        delete data[path];
        storage.set('startup', data, (error) => {
            startupInit();
        })
    });
});

$('#icons').children('section').children('.fontawesome-icon-list').children('.fa-hover').click(function(){
    let icon = $(this).children('a').children('i').attr('class').replace(/fa(\s)fa-/, '');
    $('#add-startup-icon').val(icon);
    clipboard.writeText(icon)
});

$('#add-startup-save').click(() => {
    storage.get('startup', (error, data) => {
        let json = {},
            path = $('#add-startup-action').attr('data-path');
        data[path] = {
            path: path,
            sort: $('#add-startup-sort').val(),
            dir: $('#add-startup-dir').val(),
            icon: $('#add-startup-icon').val(),
            name: $('#add-startup-name').val(),
        }
        storage.set('startup', data, (error) => {
            startupInit();
        });
    });
});

var startupInit = function()
{
    $('#add-startup-action').hide();
    $('#add-startup').show();
    storage.get('startup', (error, data) => {
        let obj = {},
            sc = $('#startup-container');

        for(let i in data){
            let dir = data[i].dir ? data[i].dir : '';
            if(!obj.hasOwnProperty(dir)) obj[dir] = [];
            obj[dir].push(data[i]);
        }
        let keys = Object.keys(obj),
            len = keys.length;
        keys.sort();

        sc.empty();

        for (let i = 0; i < len; i++) {
            let j = keys[i], container = '';
            obj[j].sort(function(a, b) {
                return parseFloat(b.sort) - parseFloat(a.sort);
            });

            if(j){
                container += '<div style="clear: both;"></div><div class="demo">' +
                    '<div class="demo-wrapper">' +
                    '<button onclick="event.target.parentElement.classList.toggle(\'is-open\')" id="tray-demo-toggle" class="js-container-target demo-toggle-button">' + j + '</button>' +
                    '<div class="demo-box demo-box2">';
            }
            for(let k in obj[j]){
                container += '<li onmouseover="$(this).children(\'span\').show()" onmouseleave="$(this).children(\'span\').hide()">' +
                    '<div class="startup-div" data-path="' + obj[j][k].path + '" onclick="openStartup($(this))">' +
                    '<div class="glyphicon fa fa-' + obj[j][k].icon + '" aria-hidden="true"></div>' +
                    '<div class="glyphicon-class" style="font-size: 16px;">' + obj[j][k].name + '</div>' +
                    '</div>' +
                    '<span data-path="' + obj[j][k].path + '" data-sort="' + obj[j][k].sort + '" data-dir="' + (obj[j][k].dir ? obj[j][k].dir : '') + '" data-ico="' + obj[j][k].icon +
                    '" data-name="' + obj[j][k].name + '" class="startup-button-edit" onclick="displayEdit($(this))">编辑</span>' +
                    '</li>';
            }
            if(j){
                container += '</div></div></div>';
            }
            sc.append(container);
        }
    });
}

startupInit();
