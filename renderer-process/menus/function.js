/**
 * Created by Hisune on 2016/8/19.
 * User: hi@hisune.com
 */
'use strict';

const crypto = require('crypto'),
    request = require('request');

var randomString = function(length, string)
{
    var text = "";
    length = length || 16;
    string = string || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += string.charAt(Math.floor(Math.random() * string.length));

    return text;
};

var hash = function (str, type)
{
    var md5sum = crypto.createHash(type || 'md5');
    md5sum.update(str.toString(), 'utf8');
    str = md5sum.digest('hex');
    return str;
};

var appendResult = function(obj, content)
{
    obj.append('<span class="output-result">' + content + '</span>');
};

// yyyy-MM-dd hh:mm:ss
var dateFormat = function (fmt, d)
{
    var date = d || new Date();
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
 
$('#function').find('.demo-button').click(function(){
    let action = $(this).text(),
        result = $(this).parent().next(),
        string = $(this).parent().find('.demo-input').val(),
        type = $(this).next('select').val();
    if(string){
        $(this).parent().parent().addClass('is-open');
        switch(action){
            case 'random':
                appendResult(result, randomString($('#func-random-length').val(), $('#func-random-string').val()));
                break;
            case 'hash':
                appendResult(result, string + ': <code>' + hash(string, type) + '</code>');
                break;
            case 'base64':
                if(type == 'decode')
                    appendResult(result, new Buffer(string, 'base64').toString());
                else
                    appendResult(result, new Buffer(string).toString('base64'));
                break;
            case 'url':
                if(type == 'decode')
                    appendResult(result, decodeURIComponent(string));
                else
                    appendResult(result, encodeURIComponent(string));
                break;
            case 'unix2str':
                appendResult(result, string + ': <code>' + dateFormat('yyyy-MM-dd hh:mm:ss', new Date(parseInt(string) * 1000)) + '</code>');
                break;
            case 'str2unix':
                if(string.indexOf(':') <= 0)
                    string = string + ' 00:00';
                appendResult(result, string + ': <code>' + (new Date(string).getTime() / 1000 | 0) + '</code>');
                break;
            case 'qrcode':
                $('#qrcode-result').qrcode(string);
                break;
            case 'en-cn':
                result.children('.demo-close').nextAll().remove();
                string = encodeURIComponent(string);
                request.get('http://fanyi.youdao.com/openapi.do?keyfrom=hello-today&key=2131466618&type=data&doctype=json&version=1.1&q=' + string, (error, response, body) => {
                    if(error){
                        appendResult(result, error);
                    }else{
                        try{
                            let detail = JSON.parse(body), html = '';
                            switch(detail.errorCode){
                                case 20:
                                    html = '要翻译的文本过长';
                                    break;
                                case 30:
                                    html = '无法进行有效的翻译';
                                    break;
                                case 40:
                                    html = '不支持的语言类型';
                                    break;
                                case 50:
                                    html = '无效的key';
                                    break;
                                case 0:
                                    html += '<p>';
                                    if(detail.hasOwnProperty("basic") && detail.basic.hasOwnProperty("explains")){
                                        for(var i in detail.basic.explains){
                                            html += detail.basic.explains[i] + '<br>';
                                        }
                                    }
                                    html += '</p><p>';
                                    if(detail.hasOwnProperty("web")){
                                        for(var i in detail.web){
                                            html += detail.web[i].key + ': ';
                                            html += detail.web[i]["value"].join(', ') + '<br>';
                                        }
                                    }
                                    html += '</p>';
                                    break;
                                default:
                                    html = '未知错误';
                            }
                            appendResult(result, html);
                        }catch (e){
                            appendResult(result, e.message);
                        }
                    }
                });
                break;
            case 'translate':
                result.children('.demo-close').nextAll().remove();
                let salt = new Date().getTime(),
                    sign = hash('20160823000027286' + string + salt + 'MhTRr7SWKg3LuzMum2jw', 'md5');
                string = encodeURIComponent(string);
                request.get('http://api.fanyi.baidu.com/api/trans/vip/translate?from=auto&to=' + $('#func-translate-target').val() + '&appid=20160823000027286&salt=' + salt + '&sign='+sign+'&q=' + string, (error, response, body) => {
                    if(error){
                        appendResult(result, error);
                    }else{
                        try{
                            let detail = JSON.parse(body), html = '';
                            if(detail.hasOwnProperty('trans_result')){
                                for(var i in detail.trans_result){
                                    html += detail.trans_result[i].dst + '<br>';
                                }
                            }else{
                                html = body;
                            }
                            appendResult(result, html);
                        }catch (e){
                            appendResult(result, e.message);
                        }
                    }
                });
                break;
        }
    }
});

$('#func-unix2str-string').val(new Date().getTime() / 1000 | 0);
$('#func-str2unix-string').val(dateFormat('yyyy-MM-dd hh:mm:ss'));