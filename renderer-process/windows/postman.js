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
    highlight = require('highlight.js');

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
    let that = $(this), start = new Date().getTime();
    that.text('Processing');
    let options = {
        uri: postmanUrl.val(),
        method: postmanUrlType.val(),
        headers: jsonOrText(postmanHeaders)
    };
    if(postmanUrlType.val() != 'GET'){
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
            postmanResult.append(responseCode('Response Status Code: ' + response.statusCode +
                '<br>Http Version: ' + response.httpVersion +
                '<br>Response Time: ' + (end - start) + 'ms', 'js'));
            postmanResult.append('Response Headers: <br>');
            postmanResult.append(responseCode(JSON.stringify(response.headers, null, 4), 'json'));
            postmanResult.append('Response Body: <a onclick="$(\'#p-r-b-h\').show();$(\'#p-r-b-j\').hide();">html</a> | <a onclick="$(\'#p-r-b-h\').hide();$(\'#p-r-b-j\').show();">json</a><br>');
            postmanResult.append(responseCode(escapeHtml(body), 'html', 'p-r-b-h'));
            try{
                body = JSON.stringify(JSON.parse(body), null, 4);
            }catch(e){}
            postmanResult.append(responseCode(escapeHtml(body), 'json', 'p-r-b-j'));
        }
        that.text('Make a Request');
        highlightCode();
    });
});