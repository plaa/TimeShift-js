TimeShift.js
============

TimeShift.js allows mocking / overriding JavaScript's Date object so that you can set the current time and timezone.  It is meant for creating repeatable tests that utilize the current time or date.

Usage:

```javascript
new Date().toString();                    // Original Date => "Fri Aug 09 2013 23:37:42 GMT+0300 (EEST)"

Date = TimeShift.Date;                    // Overwrite Date
new Date().toString();                    //               => "Fri Aug 09 2013 23:37:43 GMT+0300"

TimeShift.setTimezoneOffset(-60);         // Set timezone to GMT+0100 (note the sign)
new Date().toString();                    //               => "Fri Aug 09 2013 21:37:44 GMT+0100"

TimeShift.setTime(1328230923000);         // Set the time to 2012-02-03 01:02:03 GMT (millisecond timestamp)
new Date().toString();                    //               => "Fri Feb 03 2012 02:02:03 GMT+0100"

TimeShift.setTimezoneOffset(0)            // Set timezone to GMT
new Date().toString();                    //               => "Fri Feb 03 2012 01:02:03 GMT"

TimeShift.setTime(undefined)              // Reset to current time
new Date().toString();                    //               => "Fri Aug 09 2013 20:37:45 GMT"

new Date().desc();                        // Helper method => "utc=Fri, 09 Aug 2013 20:37:46 GMT   local=Fri, 09 Aug 2013 20:37:46 GMT   offset=0"

new TimeShift.OriginalDate().toString()   // Original Date => "Fri Aug 09 2013 23:37:47 GMT+0300 (EEST)"
```

