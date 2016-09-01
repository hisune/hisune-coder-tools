/**
 * Created by Hisune on 2016/9/1.
 * User: hi@hisune.com
 */
'use strict';

const storage = require('electron-json-storage'),
    dialogs = new (require('dialogs')),
    calendar = $('#calendar'),
    calendarEventObj = $('#calendar-event')

let calendarEvent = [],
    initCalendar = function(){
        calendar.fullCalendar( 'destroy' );
        calendar.fullCalendar({
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
                        calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                        calendarEvent.push(eventData);
                        storage.set('calendar', calendarEvent);
                        calendarEventObj.text(JSON.stringify(calendarEvent, null, 3));
                    }
                    calendar.fullCalendar('unselect');
                });
            },
            eventClick: function(calEvent, jsEvent, view){
                dialogs.alert(calEvent.title);
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: calendarEvent
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