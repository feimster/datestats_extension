//return date in format YYYY-MM-DD
Date.prototype.getShortDateYMD = function () {
  var yrCurr = this.getFullYear();
  var moCurr = this.getMonth() + 1;
  var dyCurr = this.getDate();
  return yrCurr.toString() + '-' + moCurr.toString().padStart(2,"0") + '-' + dyCurr.toString().padStart(2,"0");
}

//return days since date passed or begin of year
Date.prototype.getDaysSinceStart = function (pDate) {
  if (pDate === undefined) {
	var dateBeg = new Date(this.getFullYear(), 0, 1);
  }
  else {
	var dateBeg = pDate;
  }
  return Math.ceil(( this - dateBeg ) / 86400000);
}

//return days remaining until date passed or end of year
Date.prototype.getDaysUntilEnd = function (pDate) {
  if (pDate === undefined) {
    var dateEnd = new Date(this.getFullYear(), 11, 31);
  }
  else {
    var dateEnd = pDate;
  }
  return Math.ceil(( dateEnd - this ) / 86400000);
}

//return hours since date passed or begin of year
Date.prototype.getHoursSinceDate = function (pDate) {
  if (pDate === undefined) {
	var dateBeg = new Date(this.getFullYear(), 0, 1);
  }
  else {
	var dateBeg = pDate;
  }
  dateBeg.setHours(0, 0, 0, 0);
  return Math.ceil(( this - dateBeg ) / 3600000);
}

//return hours remaining until date passed or end of year
Date.prototype.getHoursUntilEnd = function (pDate) {
  if (pDate === undefined) {
    var dateEnd = new Date(this.getFullYear(), 11, 31);
  }
  else {
    var dateEnd = pDate;
  }
  dateEnd.setHours(23, 59, 59, 999);
  return Math.ceil(( dateEnd - this ) / 3600000);
}

//return the ISO week of the date
Date.prototype.getISOWeek = function() {
  var dateWeekP = new Date(this.getTime());
  dateWeekP.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year
  dateWeekP.setDate(dateWeekP.getDate() + 3 - (dateWeekP.getDay() + 6) % 7);
  // January 4 is always in week 1
  var dateWeek1 = new Date(dateWeekP.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1
  return 1 + Math.round(((dateWeekP.getTime() - dateWeek1.getTime()) / 86400000 - 3 + (dateWeek1.getDay() + 6) % 7) / 7);
}

Date.prototype.getQuarter = function() {
  return Math.floor( ( this.getMonth() + 3 ) / 3 );
}

Date.prototype.getQtrSinceStart = function() {
  var qtrNbr = this.getQuarter();
  var qtrStartMon = ( qtrNbr * 3 ) - 2;
  var qtrStartDat = new Date(this.getFullYear(), (qtrStartMon - 1), 1);
  return this.getDaysSinceStart(qtrStartDat);
}

Date.prototype.getQtrUntilEnd = function() {
  var qtrNbr = this.getQuarter();
  var qtrEndMon = ( qtrNbr * 3 );
  var qtrEndDat = new Date(this.getFullYear(), qtrEndMon, 0);
  return this.getDaysUntilEnd(qtrEndDat);
}

//show current Date in short form
let dateCurrent = new Date();
document.getElementById('currentDate').innerHTML = dateCurrent.getShortDateYMD();

//show month & day in local language
let getLanguage = () => navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ];
document.getElementById('monOfTheYear').innerHTML = dateCurrent.toLocaleDateString(getLanguage, { month: 'long' });
document.getElementById('monNumber').innerHTML = dateCurrent.getMonth() + 1;
document.getElementById('dayOfTheWeek').innerHTML = dateCurrent.toLocaleDateString(getLanguage, { weekday: 'long' });
document.getElementById('dayNumber').innerHTML = ( (dateCurrent.getDay() + 6) % 7 ) + 1;

//show days since begin/to end of year
document.getElementById('daysFromStart').innerHTML = dateCurrent.getDaysSinceStart();
document.getElementById('daysUntilEnd').innerHTML = dateCurrent.getDaysUntilEnd();

//show week info for year
let dateLastWeek = new Date(dateCurrent.getFullYear(), 11, 28 );
document.getElementById('currentWeek').innerHTML = dateCurrent.getISOWeek();
document.getElementById('wksUntilEnd').innerHTML = dateLastWeek.getISOWeek() - dateCurrent.getISOWeek();

//show quarter info
document.getElementById('qtrNumber').innerHTML = dateCurrent.getQuarter();
document.getElementById('daysFromQtrStart').innerHTML = dateCurrent.getQtrSinceStart();
document.getElementById('daysUntilQtrEnd').innerHTML = dateCurrent.getQtrUntilEnd();

//show time info
document.getElementById('hoursFromStart').innerHTML = dateCurrent.getHoursSinceDate();
document.getElementById('hoursUntilEnd').innerHTML = dateCurrent.getHoursUntilEnd();
