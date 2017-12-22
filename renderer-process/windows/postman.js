/**
 * Created by Hisune on 2016/8/22.
 * User: hi@hisune.com
 */
'use strict';
 
const request = require('request'),
    makeARequest = $('#make-a-request'),
    postmanUrlType = $('#postman-url-type'),
    postmanUrl = $('#postman-url'),
    postmanHeaders = $('#postman-headers'),
    postmanRequestType = $('#postman-request-type'),
    postmanRequest = $('#postman-request'),
    postmanResult = $('#postman-result'),
    postmanSaved = $('#postman-saved'),
    highlight = require('highlight.js'),
    dialogs = new (require('dialogs')),
    storage = require('electron-json-storage');

let jsonOrText = function(obj)
{
    let string = obj.val().trim(), json = {};
    try{
        json = JSON.parse(string);
    }catch(e){
        let array = string.split('\n');
        for(let i in array){
            let line = array[i].split(':');
            if(line.length == 2)
                json[line[0].trim()] = line[1].trim();
            else if(line.length > 2){
                let shift = line.shift();
                json[shift.trim()] = line.join(':');
            }
        }
    }

    return json;
};

let responseCode = function(res, cla, id)
{
    return '<pre id="' +  (id || '')+ '"><code class="language-' + (cla || 'html') + ' hljs javascript postman-code">' + res + '</code></pre>';
};

let escapeHtml = function(html)
{
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
};

let highlightCode = function(obj)
{
    $(obj || '.postman-code').each(function(i, block) {
        highlight.highlightBlock(block);
    });
};

makeARequest.click(function(){
    let that = $(this), start = new Date().getTime(), uri = postmanUrl.val();
    that.text('Processing');
    let options = {
        uri: uri.indexOf('http') < 0 ? 'http://' + uri : uri,
        method: postmanUrlType.val(),
        headers: jsonOrText(postmanHeaders)
    };
    if(['GET', 'DELETE'].indexOf(postmanUrlType.val()) == -1){
        if(postmanRequestType.val() == 'form'){
            options.form = jsonOrText(postmanRequest);
        }else{
            options.body = postmanRequest.val();
        }
    }else{
        options.qs = jsonOrText(postmanRequest);
    }

    request(options, (error, response, body) => {
        let end = new Date().getTime();
        postmanResult.empty();
        if(error){
            postmanResult.append('Response Error: ' + error);
        }else{
            postmanResult.append('Code: <b>' + response.statusCode + '</b> in <b>' + (end - start) + 'ms</b>, ');
            postmanResult.append('Response Body: <a onclick="$(\'.postman-result\').parent().hide();$(\'#p-r-b-j\').show();">json</a> | ' +
                '<a onclick="$(\'.postman-result\').parent().hide();$(\'#p-r-b-v\').show();">view</a> | ' +
                '<a onclick="$(\'.postman-result\').parent().hide();$(\'#p-r-b-h\').show();">html</a> <br>');
            try{
                postmanResult.append(responseCode(escapeHtml(JSON.stringify(JSON.parse(body), null, 4)), 'json postman-result', 'p-r-b-j'));
            }catch(e){
                postmanResult.append(responseCode('Not a valid json: ' + e.message + "\r\n" + escapeHtml(body), 'json postman-result', 'p-r-b-j'));
            }
            console.log(body);
            $('<iframe class="postman-result" frameborder="0" style="width: 100%; min-height: 300px;"/>').appendTo($('<pre id="p-r-b-v"/>').appendTo(postmanResult)).contents().find('body').append(body);
            postmanResult.append(responseCode(escapeHtml(body), 'html postman-result', 'p-r-b-h'));
            postmanResult.append('Response Headers: <br>');
            postmanResult.append(responseCode(JSON.stringify(response.headers, null, 4), 'json'));
        }
        that.text('Make a Request');
        highlightCode();
    });
});

let initSaved = function()
{
    storage.get('postman', (error, data) => {
        if (error) throw error;

        postmanSaved.html('<option>None Selected</option>');
        for(let i in data){
            if(data.hasOwnProperty(i)){
                postmanSaved.append('<option value="' + i + '">' + i + '</option>');
            }
        }
    });
};

$('#save-a-request').click(function(){
    let saveName = $('#save-name').val();
    if(saveName == ''){
        dialogs.alert('Plz input a save name.');
    }else{
        storage.get('postman', (error, data) => {
            if (error) throw error;

            data[saveName] = {
                type: $('#postman-url-type').val(),
                url: $('#postman-url').val(),
                headers: $('#postman-headers').val(),
                request_type: $('#postman-request-type').val(),
                request: $('#postman-request').val(),
            };
            storage.set('postman', data, () => {
                initSaved();
            });
        });
    }
});

$('#delete-a-request').click(function(){
    let value = postmanSaved.val();
    storage.get('postman', (error, data) => {
        if (error) throw error;

        if(data.hasOwnProperty(value)){
            delete data[value];
            storage.set('postman', data, () => {
                initSaved();
            });
        }
    });
});

postmanSaved.change(function(){
    let value = $(this).val();
    storage.get('postman', (error, data) => {
        if (error) throw error;

        if(data.hasOwnProperty(value)){
            $('#save-name').val(value);
            $('#postman-url-type').val(data[value]['type']);
            $('#postman-url').val(data[value]['url']);
            $('#postman-headers').val(data[value]['headers']);
            $('#postman-request-type').val(data[value]['request_type']);
            $('#postman-request').val(data[value]['request']);
        }
    });
});

initSaved();

