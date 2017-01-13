/**
 * Created by Hisune on 2016/9/1.
 * User: hi@hisune.com
 */
'use strict';

const storage = require('electron-json-storage'),
    dialogs = new (require('dialogs')),
    calendarDom = $('#calendar'),
    calendarEventObj = $('#calendar-event'),
    today = new Date(),
    calendar = {lunarInfo:[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],Gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],sTermInfo:["9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","9778397bd19801ec9210c965cc920e","97b6b97bd19801ec95f8c965cc920f","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd197c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bcf97c3598082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd19801ec9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bd07f1487f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b97bd197c36c9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b70c9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","977837f0e37f149b0723b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0723b06bd","7f07e7f0e37f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f595b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e37f14998083b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14898082b0723b02d5","7f07e7f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66aa89801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e26665b66a449801e9808297c35","665f67f0e37f1489801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722"],nStr1:["日","一","二","三","四","五","六","七","八","九","十"],nStr2:["初","十","廿","卅"],nStr3:["正","二","三","四","五","六","七","八","九","十","冬","腊"],lYearDays:function(y){var i,sum=348;for(i=32768;i>8;i>>=1)sum+=calendar.lunarInfo[y-1900]&i?1:0;return sum+calendar.leapDays(y)},leapMonth:function(y){return 15&calendar.lunarInfo[y-1900]},leapDays:function(y){return calendar.leapMonth(y)?65536&calendar.lunarInfo[y-1900]?30:29:0},monthDays:function(y,m){return m>12||m<1?-1:calendar.lunarInfo[y-1900]&65536>>m?30:29},solarDays:function(y,m){if(m>12||m<1)return-1;var ms=m-1;return 1==ms?y%4==0&&y%100!=0||y%400==0?29:28:calendar.solarMonth[ms]},toGanZhiYear:function(lYear){var ganKey=(lYear-3)%10,zhiKey=(lYear-3)%12;return 0==ganKey&&(ganKey=10),0==zhiKey&&(zhiKey=12),calendar.Gan[ganKey-1]+calendar.Zhi[zhiKey-1]},toAstro:function(cMonth,cDay){var s="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯",arr=[20,19,21,21,21,22,23,23,23,23,22,22];return s.substr(2*cMonth-(cDay<arr[cMonth-1]?2:0),2)+"座"},toGanZhi:function(offset){return calendar.Gan[offset%10]+calendar.Zhi[offset%12]},getTerm:function(y,n){if(y<1900||y>2100)return-1;if(n<1||n>24)return-1;var _table=calendar.sTermInfo[y-1900],_info=[parseInt("0x"+_table.substr(0,5)).toString(),parseInt("0x"+_table.substr(5,5)).toString(),parseInt("0x"+_table.substr(10,5)).toString(),parseInt("0x"+_table.substr(15,5)).toString(),parseInt("0x"+_table.substr(20,5)).toString(),parseInt("0x"+_table.substr(25,5)).toString()],_calday=[_info[0].substr(0,1),_info[0].substr(1,2),_info[0].substr(3,1),_info[0].substr(4,2),_info[1].substr(0,1),_info[1].substr(1,2),_info[1].substr(3,1),_info[1].substr(4,2),_info[2].substr(0,1),_info[2].substr(1,2),_info[2].substr(3,1),_info[2].substr(4,2),_info[3].substr(0,1),_info[3].substr(1,2),_info[3].substr(3,1),_info[3].substr(4,2),_info[4].substr(0,1),_info[4].substr(1,2),_info[4].substr(3,1),_info[4].substr(4,2),_info[5].substr(0,1),_info[5].substr(1,2),_info[5].substr(3,1),_info[5].substr(4,2)];return parseInt(_calday[n-1])},toChinaMonth:function(m){if(m>12||m<1)return-1;var s=calendar.nStr3[m-1];return s+="月"},toChinaDay:function(d){var s;switch(d){case 10:s="初十";break;case 20:s="二十";break;case 30:s="三十";break;default:s=calendar.nStr2[Math.floor(d/10)],s+=calendar.nStr1[d%10]}return s},getAnimal:function(y){return calendar.Animals[(y-4)%12]},solar2lunar:function(y,m,d){if(y<1900||y>2100)return-1;if(1900==y&&1==m&&d<31)return-1;if(y)var objDate=new Date(y,parseInt(m)-1,d);else var objDate=new Date;var i,leap=0,temp=0,y=objDate.getFullYear(),m=objDate.getMonth()+1,d=objDate.getDate(),offset=(Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate())-Date.UTC(1900,0,31))/864e5;for(i=1900;i<2101&&offset>0;i++)temp=calendar.lYearDays(i),offset-=temp;offset<0&&(offset+=temp,i--);var isTodayObj=new Date,isToday=!1;isTodayObj.getFullYear()==y&&isTodayObj.getMonth()+1==m&&isTodayObj.getDate()==d&&(isToday=!0);var nWeek=objDate.getDay(),cWeek=calendar.nStr1[nWeek];0==nWeek&&(nWeek=7);var year=i,leap=calendar.leapMonth(i),isLeap=!1;for(i=1;i<13&&offset>0;i++)leap>0&&i==leap+1&&0==isLeap?(--i,isLeap=!0,temp=calendar.leapDays(year)):temp=calendar.monthDays(year,i),1==isLeap&&i==leap+1&&(isLeap=!1),offset-=temp;0==offset&&leap>0&&i==leap+1&&(isLeap?isLeap=!1:(isLeap=!0,--i)),offset<0&&(offset+=temp,--i);var month=i,day=offset+1,sm=m-1,gzY=calendar.toGanZhiYear(year),firstNode=calendar.getTerm(year,2*m-1),secondNode=calendar.getTerm(year,2*m),gzM=calendar.toGanZhi(12*(y-1900)+m+11);d>=firstNode&&(gzM=calendar.toGanZhi(12*(y-1900)+m+12));var isTerm=!1,Term=null;firstNode==d&&(isTerm=!0,Term=calendar.solarTerm[2*m-2]),secondNode==d&&(isTerm=!0,Term=calendar.solarTerm[2*m-1]);var dayCyclical=Date.UTC(y,sm,1,0,0,0,0)/864e5+25567+10,gzD=calendar.toGanZhi(dayCyclical+d-1),astro=calendar.toAstro(m,d);return{lYear:year,lMonth:month,lDay:day,Animal:calendar.getAnimal(year),IMonthCn:(isLeap?"闰":"")+calendar.toChinaMonth(month),IDayCn:calendar.toChinaDay(day),cYear:y,cMonth:m,cDay:d,gzYear:gzY,gzMonth:gzM,gzDay:gzD,isToday:isToday,isLeap:isLeap,nWeek:nWeek,ncWeek:"星期"+cWeek,isTerm:isTerm,Term:Term,astro:astro}},lunar2solar:function(y,m,d,isLeapMonth){var isLeapMonth=!!isLeapMonth,leapMonth=calendar.leapMonth(y);calendar.leapDays(y);if(isLeapMonth&&leapMonth!=m)return-1;if(2100==y&&12==m&&d>1||1900==y&&1==m&&d<31)return-1;var day=calendar.monthDays(y,m),_day=day;if(isLeapMonth&&(_day=calendar.leapDays(y,m)),y<1900||y>2100||d>_day)return-1;for(var offset=0,i=1900;i<y;i++)offset+=calendar.lYearDays(i);for(var leap=0,isAdd=!1,i=1;i<m;i++)leap=calendar.leapMonth(y),isAdd||leap<=i&&leap>0&&(offset+=calendar.leapDays(y),isAdd=!0),offset+=calendar.monthDays(y,i);isLeapMonth&&(offset+=day);var stmap=Date.UTC(1900,1,30,0,0,0),calObj=new Date(864e5*(offset+d-31)+stmap),cY=calObj.getUTCFullYear(),cM=calObj.getUTCMonth()+1,cD=calObj.getUTCDate();return calendar.solar2lunar(cY,cM,cD)}},
    todayLunar = calendar.solar2lunar(today.getFullYear(), today.getMonth() + 1, today.getDate());

let calendarEvent = [],
    initCalendar = function(){
        calendarDom.fullCalendar( 'destroy' );
        calendarDom.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            select: function(start, end, resource) {
                dialogs.prompt('Event Title:', (title) => {
                    var eventData;
                    if (title) {
                        eventData = {
                            title: title,
                            start: start,
                            end: end
                        };
                        calendarDom.fullCalendar('renderEvent', eventData, true); // stick? = true
                        calendarEvent.push(eventData);
                        storage.set('calendar', calendarEvent);
                        calendarEventObj.val(JSON.stringify(calendarEvent, null, 3));
                    }
                    calendarDom.fullCalendar('unselect');
                });
            },
            eventClick: function(calEvent, jsEvent, view){
                dialogs.alert(calEvent.title);
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            titleFormat: 'MMMM YYYY - ' +
                todayLunar.IMonthCn + ' ' +
                todayLunar.IDayCn + ' ' +
                todayLunar.Animal + '年 \r\n' +
                todayLunar.astro + ' ' +
                todayLunar.gzYear + '年 ' +
                todayLunar.gzMonth + '月 ' +
                todayLunar.gzDay + '日 ',
            events: calendarEvent,
            dayRender: function( date, cell ) {
                cell.html(calendar.solar2lunar(date.year(), date.month() + 1, date.date()).IDayCn+'<br>');
            }
        });
    };

$(document).ready(function() {
    storage.get('calendar', (error, data) => {
        calendarEvent = Object.keys(data).length == 0 ? [] : data;
        calendarEventObj.text(JSON.stringify(calendarEvent, null, 3));
        initCalendar();
    });
});
$('#calendar-event-save').click(function(){
    let _val = calendarEventObj.val();
    try{
        let json = JSON.parse(_val);
        storage.set('calendar', json, () => {
            calendarEvent = json;
            initCalendar();
        });
    }catch(e){
        console.log(e);
        dialogs.alert('json格式有误');
    }
});