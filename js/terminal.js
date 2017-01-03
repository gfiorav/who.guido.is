__TermHeight		= 24
__TypeDelayMin 		= 30
__TypeDelayMax 		= 100
__BlinkInterval 	= 800
__BtnAnimInterval 	= 70
__LoadingInterval 	= 200
__LoadingCycles 	= 2
__LoadingOffset 	= 4000
__InitialWait 		= 1000
__EnterWait 		= 300
__Now				= 0
__TargetBlank 		= ' target="_blank"'
__TwitterLink 		= 'http://twitter.com/gfioravantti'
__LikedinLink 		= 'https://www.linkedin.com/profile/public-profile-settings?trk=prof-edit-edit-public_profile'
__MailToLink 		= 'mailto:guido.fioravantti@gmail.com'
__OnSamLink 		= 'http://www.onlinesampler.com'
__WGILink 			= 'http://who.guido.is'
__PTATLink 			= 'http://github.com/gfiorav/ptat'
__CVLink 			= 'rsrc/cvs/guido_fioravantti_cv.pdf'
__ASCIISpaceBar 	= String.fromCharCode(127)
__Cursor 			= '<b style="color:#7f7f7f">' +String.fromCharCode(9608)+ '</b>'
__Prompt 			= 'who.guido.is:~ guest$ '
__Tab 				= '&nbsp;&nbsp;&nbsp;&nbsp;'
__LoadingSymbol 	= [ '|', '/', '&mdash;', '|', '/', '&mdash;', '\\']

_CursorPID 			= 0
_LinesOutputed 		= 0
_LSRotation 		= 0

isIdle 				= false
isOn 				= false

window.onload = function () {
	registerEventListeners();

	printLine('Last login: ' + getLastLogin(new Date()) + ' on ttys000')
	prompt()
	isIdle = false

	setTimeout(function () {
		appendText('welcome --lang=en', welcomeProgram)	
	}, __InitialWait)
	
}

function animateButton (button) {
	setTimeout(function () {activeButton(button)}, __BtnAnimInterval)
	setTimeout(function () {inactiveButton(button)}, __BtnAnimInterval*2)
	setTimeout(function () {activeButton(button)}, __BtnAnimInterval*3)
	setTimeout(function () {inactiveButton(button)}, __BtnAnimInterval*4)
}

function registerEventListeners () {

	document.getElementById('btnCurrentPosition').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('cv --info "jobs"', currenPositionProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnLanguagesSpoken').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('langs -c 3', languagesSpokenProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnAbilities').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('capabilities --verbose', abilitiesProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnEducation').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('cv --info "education"', educationProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnContact').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('cv --info "contact"', contactProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnPortfolio').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('portfo --format TXT --links=yes', portfolioProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnClear').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('clear', clearScreenProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnPDFVersion').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			window.open(__CVLink, '_blank')
			isIdle = true
		}
	}
}

function startCursor () {
	stopCursor()

	_CursorPID = setInterval(blinkCursor, __BlinkInterval)	
	
}

function blinkCursor () {
	var text = txtLine.innerHTML
	if(!isOn) {
		txtLine.innerHTML += __Cursor
	}
	else {
		txtLine.innerHTML = text.substr(0, text.length -__Cursor.length)
	}

	isOn = !isOn
}

function stopCursor () {
	clearInterval(_CursorPID)

	var text = txtLine.innerHTML
	if(isOn) {
		txtLine.innerHTML = text.substr(0, text.length -__Cursor.length)

		isOn = false
	}
}

function format (line) {
	pieces = line.split('\t');

	if(pieces.length == 1) return line

		var toReturn = ''
	var accLenth = 0;
	for(var p = 0; p < pieces.length; p++) {
		toReturn += pieces[p]

		accLenth += pieces[p].length

		if(p != pieces.length -1) {
			var nearestTab = 4*(Math.round((accLenth + 4)/4))

			var tabsNeeded = nearestTab - accLenth;

			for(var t = 0; t < tabsNeeded; t++) {
				toReturn += '&nbsp;'
			}

			accLenth += tabsNeeded;
		}
	}

	return toReturn;
}

function printLine (line) {
	line = format(line)

	var txtTermText = document.getElementById('txtTermText')

	txtLine = document.createElement('li')
	txtLine.style.className = 'terminal-line'
	txtLine.id = _LinesOutputed

	txtLine.innerHTML = line

	txtTermText.appendChild(txtLine)

	txtTermText.scrollTop = txtTermText.scrollHeight;

	_LinesOutputed++
}

function appendText (line, callback) {
	stopCursor()
	txtTermText.scrollTop = txtTermText.scrollHeight;

	line = format(line)

	var delay = 0
	for (var c = 0; c < line.length -1; c++) {
		printChar(line.charAt(c), delay, txtLine, false, null)
		delay += Math.floor((Math.random() * __TypeDelayMax) + __TypeDelayMin) 
	}
	printChar(line.charAt(line.length -1), delay, txtLine, true, callback)

}

function printChar (c, delay, txtLine, isLast, callback) {
	setTimeout(
		function () {
			txtLine.innerHTML += c

			if(isLast){
				setTimeout(callback, __EnterWait)
				startCursor()	
			} 
		}
		, delay)
}

function appendLoading (cycles, callback) {
	stopCursor()
	txtTermText.scrollTop = txtTermText.scrollHeight;


	var delay = 0
	var boudary = cycles * __LoadingSymbol.length
	for (var s = 0; s < boudary -1; s++) {
		changeChar(s, delay, txtLine, false, null)
		delay += __LoadingInterval
	}

	changeChar(boudary, delay, txtLine, true, callback) 
}

function changeChar (index, delay, txtLine, isLast, callback) {
	setTimeout(
		function () {
			txtLine.innerHTML = txtLine.innerHTML.slice(0, txtLine.innerHTML.length -1)

			txtLine.innerHTML += __LoadingSymbol[_LSRotation]
			_LSRotation++
			_LSRotation %= __LoadingSymbol.length

			if(isLast){
				txtLine.innerHTML = txtLine.innerHTML.slice(0, txtLine.innerHTML.length -1)
				txtLine.innerHTML += '[ Complete ]'

				_LSRotation = 0

				setTimeout(callback, __EnterWait)	
			} 
		}
		, delay)
}

function clearScreen (callback) {
	var txtTermText = document.getElementById('txtTermText')
	while(txtTermText.firstChild) {
		txtTermText.removeChild(txtTermText.firstChild)
	}

	setTimeout(callback, __EnterWait)
}

/* Programs */
function prompt () {
	printLine(__Prompt)
	isIdle = true;
}

function welcomeProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tHello!')
	printLine(__ASCIISpaceBar)
	printLine('\t\tI\'m glad you could make it.')
	printLine('\t\tWelcome to my personal web!')
	printLine('\t\tClick the buttons in the section below to know more about me.')
	printLine(__ASCIISpaceBar)

	prompt()
}

function currenPositionProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tCurrent:')
	printLine('\t\tCompany\tCARTO')
	printLine('\t\tPosition\tBackend Developer (<a target="_blank" href="https://github.com/CartoDB/cartodb/graphs/contributors">contributions by @gfiorav</a>)')
	printLine('\t\tTime\t\tSince July 2015')
	printLine(__ASCIISpaceBar)

	printLine('\tPrevious:')
	printLine('\t\tCompany\tIMDEA Networks')
	printLine('\t\tPosition\tResearch intern')
	printLine('\t\tTime\t\tDec 2013 &mdash; June 2015')
	printLine(__ASCIISpaceBar)

	printLine('\t\tCompany\tHeartBeat Records Madrid')
	printLine('\t\tPosition\tSound engineer & producer')
	printLine('\t\tTime\t\tSep 2009 &mdash; Dec 2011')
	printLine(__ASCIISpaceBar)

	prompt()
}

function languagesSpokenProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tGuido Fioravantti can speak:')
	printLine('\t\t+\tSpanish\tNatively')
	printLine('\t\t+\tEnglish\tNatively')
	printLine('\t\t~\tFrench\tA bit (can understand when spoken)')
	printLine(__ASCIISpaceBar)

	prompt()
}

function abilitiesProgram () {
	printLine(__ASCIISpaceBar)
	printLine('Guido Fioravantti\'s abilities are:')
	printLine(__ASCIISpaceBar)
	printLine('\t# Programming')
	printLine('\t\t+\tRAILS\t\t\tExpert')
	printLine('\t\t+\tC\t\t\t\tAdvanced')
	printLine('\t\t+\tJava\t\t\tAdvanced')
	printLine('\t\t+\tAndroid\t\tGood')
	printLine('\t\t+\tHTML5/CSS3/JS\tGood')
	printLine('\t\t+\tPython\t\tGood')
	printLine(__ASCIISpaceBar)
	printLine('\t# Engineering')
	printLine('\t\t+\tNetworks\t\tAdvanced')
	printLine('\t\t+\tComputers\t\tAdvanced')
	printLine('\t\t+\tResearch\t\t1.5 year experience')
	printLine(__ASCIISpaceBar)
	printLine('\t# Music')
	printLine('\t\t+\tProducer\t\t4 years experience')
	printLine('\t\t+\tSound engi.\t2 years experience')
	printLine('\t\t+\tPR\t\t\t1 year experience')
	printLine(__ASCIISpaceBar)

	prompt()
}

function educationProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tDegree')
	printLine('\t\tTitle\t\tTelecommunications Engineering')
	printLine('\t\tWhere\t\tUniversidad Carlos III de Madrid')
	printLine('\t\tTime\t\tSince Sep 2010')
	printLine(__ASCIISpaceBar)

	printLine('\tFormation')
	printLine('\t\tTitle\t\tTelef&oacute;nica Talentum')
	printLine('\t\tWhere\t\tTelef&oacute;nica, Spain')
	printLine('\t\tTime\t\tDec 2013 &mdash; Dec 2014')
	printLine(__ASCIISpaceBar)	

	prompt()
}

function contactProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tContact me at:')
	printLine('\t\t+\tTwitter\t<a href=' + __TwitterLink + __TargetBlank + '>@GFioravantti</a>')
	printLine('\t\t+\tLinkedIn\t<a href=' + __LikedinLink + __TargetBlank + '>Guido Fioravantti</a>')
	printLine('\t\t+\tE-Mail\t<a href=' + __MailToLink + '>guido.fioravantti@gmail.com</a>')
	printLine(__ASCIISpaceBar)

	prompt()
}

function PDFVersionProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tGenerating PDF  ')
	appendLoading(__LoadingCycles, generatePDFSubRoutine)
}

function generatePDFSubRoutine () {
	printLine(__ASCIISpaceBar)
	startCursor();

	prompt()
}

function portfolioProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\t&bull; HTML5/CSS3/JS')
	printLine('\t\tBlack Friday 2016 Widget for ElPais (offline now)')
	printLine('\t\tOnlineSampler\t<a href=' + __OnSamLink + __TargetBlank + '>www.OnlineSampler.com</a>')
	printLine('\t\tWho Guido is\t<a href=' + __WGILink + __TargetBlank + '>who.Guido.is</a>')
	printLine(__ASCIISpaceBar)
	printLine('\t&bull; Android')
	printLine('\t\tPTAT\t\t\t<a href=' + __PTATLink + __TargetBlank + '>PTAT on Github</a>')
	printLine(__ASCIISpaceBar)

	prompt()
}

function clearScreenProgram () {
	clearScreen(prompt)	
}


function getLastLogin (date) {	
	var weekDay = date.getDay()
	switch (weekDay) {
		case 0 :
		weekDay = 'Sun'
		break

		case 1 :
		weekDay = 'Mon'
		break

		case 2 :
		weekDay = 'Tue'
		break

		case 3 :
		weekDay = 'Wed'
		break

		case 4 :
		weekDay = 'Thu'
		break

		case 5 :
		weekDay = 'Fri'
		break

		case 6 :
		weekDay = 'Sat'
		break

		default :
		weekDay = 'wut'
		break
	}

	var month = date.getMonth()
	switch (month) {
		case 0 :
		month = 'Jan'
		break

		case 1 :
		month = 'Feb'
		break

		case 2 :
		month = 'Mar'
		break

		case 3 :
		month = 'Apr'
		break

		case 4 :
		month = 'May'
		break

		case 5 :
		month = 'Jun'
		break

		case 6 :
		month = 'Jul'
		break

		case 7 :
		month = 'Agu'
		break

		case 8 :
		month = 'Sep'
		break

		case 9 :
		month = 'Oct'
		break

		case 10 :
		month = 'Nov'
		break

		case 11 :
		month = 'Dec'
		break

		default :
		month = 'Wut'
		break
	}

	var day 	= date.getDate()

	var hours 	= date.getHours()
	if(hours < 10) hours = '0' + hours;

	var minutes = date.getMinutes()
	if(minutes < 10) minutes = '0' + minutes;	
	
	var seconds = date.getSeconds()	
	if(seconds < 10) seconds = '0' + seconds;
	
	var formatted 
		= 
		weekDay + 
		' ' 	+
		month 	+
		' ' 	+
		day 	+
		' '		+ 
		hours 	+ 
		':' 	+ 
		minutes + 
		':' 	+ 
		seconds


	return formatted;
}

function activeButton (button) {
	button.style.backgroundColor 	= '#4c4c4c'
	button.style.color 				= 'white'
	button.style.borderColor 		= 'white'
}

function inactiveButton (button) {
	button.style.backgroundColor 	= 'white'
	button.style.color 				= 'black'
	button.style.borderColor 		= '#4c4c4c'
}

