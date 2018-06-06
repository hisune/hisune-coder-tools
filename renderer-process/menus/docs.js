'use strict';

const dialogs = new (require('dialogs')),
    storage = require('electron-json-storage');

function initDocsClick()
{
    storage.get('docs', (error, data) => {
        if(data){
            var keys = Object.keys(data);
            keys.forEach(function(i) {
                $('#add-doc').before('<li><a href="#" data-url="'+data[i]+'">'+i+'</a> |</li>');
            });
            bindDocsClick();
        }
    });
}
function bindDocsClick() {
    $('.nav-title-ul li a').click(function(){
        $('.nav-title-ul li').removeClass('active');
        $(this).parent().addClass('active');
        $('#docs-iframe').attr('src', $(this).data('url'));
    });
}
function addDoc(name, url)
{
    $('#add-doc').before('<li><a href="#" data-url="'+url+'">'+name+'</a> |</li>');
    storage.get('docs', (error, data) => {
        data[name] = url;
        storage.set('docs', data, (error) => {
            bindDocsClick();
        });
    });
}
$('#add-doc').click(function(){
    var that = $(this);
    dialogs.prompt('输入NAME#URL:', (title) => {
        if (title) {
            title = title.split('#');
            if(title.length != 2){
                alert('格式错误');
            }else{
                addDoc(title[0],title[1]);
            }
        }
    });
});
$('#reduce-doc').click(function(){
    var name = $('.nav-title-ul li.active a').text();
    storage.get('docs', (error, data) => {
        if(data[name]){
            delete data[name];
            $('.nav-title-ul li.active').remove();
            storage.set('docs', data, (error) => {
                
            });
        }else{
            alert('不可删除');
        }
    });
});
initDocsClick();
