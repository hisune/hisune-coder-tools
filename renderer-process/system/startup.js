/**
 * Created by Hisune on 2016/8/24.
 * User: hi@hisune.com
 */
'use strict';

const storage = require('electron-json-storage'),
     clipboard = require('electron').clipboard;

$('#add-startup').click(() => {
    const {dialog} = require('electron').remote,
        path = require('path');
    dialog.showOpenDialog({properties: ['openFile']}, (filter) => {
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
        let array = [],
            sc = $('#startup-container');
        for(var i in data)
            array.push(data[i]);
        array.sort(function(a, b) {
            return parseFloat(b.sort) - parseFloat(a.sort);
        });
        sc.empty();
        for(var j in array){
            sc.append('<li onmouseover="$(this).children(\'span\').show()" onmouseleave="$(this).children(\'span\').hide()">' +
                '<div class="startup-div" data-path="' + array[j].path + '" onclick="openStartup($(this))">' +
                '<div class="glyphicon fa fa-' + array[j].icon + '" aria-hidden="true"></div>' +
                '<div class="glyphicon-class" style="font-size: 16px;">' + array[j].name + '</div>' +
                '</div>' +
                '<span data-path="' + array[j].path + '" data-sort="' + array[j].sort + '" data-ico="' + array[j].icon +
                '" data-name="' + array[j].name + '" class="startup-button-edit" onclick="displayEdit($(this))">编辑</span>' +
                '</li>');
        }
    });
}

startupInit();
