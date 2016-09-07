/**
 * Created by Hisune on 2016/8/22.
 * User: hi@hisune.com
 */
'use strict';

const highlight = require('highlight.js'),
    uglify = require('uglify-js'),
    htmlMinifier = require('html-minifier');

$('.compress-action').click(function(){
    let type = $(this).data('format'),
        contentObj = $('#compress-' + type + '-content'),
        content = contentObj.val().trim(),
        resultObj = $('#compress-' + type + '-result'),
        indent = parseInt($('#compress-' + type + '-indent').val()),
        result;
    switch(type){
        case 'json':
            try{
                let newContent = JSON.stringify(JSON.parse(content.replace(/\r?\n|\r/g, '')));
                if($(this).data('acton') == 'beautify'){
                    result = vkbeautify.json(newContent, indent);
                }else{
                    result = vkbeautify.jsonmin(newContent);
                }
            }catch (e){
                // 提示错误，并选择错误的字符，并scroll到错误的位置
                let split = e.message.split(' '),
                    line = split[split.length - 1];
                if(!isNaN(line)){
                    let total = content.substr(0, line).split('\n').length;
                    line = parseInt(line);
                    if(line > 0)
                        line -= 3;
                    line += total;

                    // let height = contentObj.height(),
                    //     rows = contentObj[0].rows;
                    contentObj.val(content.replace(/\r?\n|\r/g, '\n'));
                    contentObj[0].setSelectionRange(line, line + 5);
                    // contentObj[0].scrollTop = Math.floor(total / rows) * height;
                }
                result = e.message + '\nnot a valid json format:\n' + content;
                resultObj.text('not a valid json format:\n' + e.message);
                resultObj.parent().show();
                return false;
            }
            break;
        case 'css':
            if($(this).data('acton') == 'beautify'){
                result = vkbeautify.css(content, indent);
            }else{
                result = vkbeautify.cssmin(content);
            }
            break;
        case 'sql':
            if($(this).data('acton') == 'beautify'){
                result = vkbeautify.sql(content, indent);
            }else{
                result = vkbeautify.sqlmin(content);
            }
            break;
        case 'xml':
            if($(this).data('acton') == 'beautify'){
                result = vkbeautify.xml(content, indent);
            }else{
                result = vkbeautify.xmlmin(content);
            }
            break;
        case 'html':
            if($(this).data('acton') == 'beautify'){
                let _t = indent ? ' ' : '\t';
                result = style_html(content, indent || 1, _t, 80);
            }else{
                let options     = {
                    removeComments:                 true,
                    removeCommentsFromCDATA:        true,
                    removeCDATASectionsFromCDATA:   true,
                    collapseWhitespace:             true,
                    collapseBooleanAttributes:      true,
                    removeAttributeQuotes:          false,
                    removeRedundantAttributes:      true,
                    useShortDoctype:                true,
                    removeEmptyAttributes:          true,
                    removeEmptyElements:            false,
                    removeOptionalTags:             false,
                    removeScriptTypeAttributes:     false,
                    removeStyleLinkTypeAttributes:  false,
                    minifyJS:                       true,
                    minifyCSS:                      true
                };
                try{
                    let newContent = content.replace(/\r?\n|\r/g, '');
                    result = htmlMinifier.minify(newContent, options);
                }catch(e){
                    result = e.message;
                }
            }
            break;
        case 'js':
            if($(this).data('acton') == 'beautify'){
                let _t = indent ? ' ' : '\t';
                result = style_js(content, indent || 1, _t);
            }else{
                try{
                    result = uglify.minify(content, {fromString: true, mangle: $('#compress-js-mangle').is(':checked')}).code;
                }catch(e){
                    result = e.message;
                }
            }
            break;
    }
    contentObj.val(result);
    resultObj.text(result);
    resultObj.parent().show();
    highlight.highlightBlock(resultObj[0]);
});