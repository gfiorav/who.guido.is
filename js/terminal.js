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
__LinkedInLink 		= 'https://www.linkedin.com/in/guido-fioravantti-425b1966'
__SaferLayerLink 	= 'https://saferlayer.com'
__CartoLink 		= 'https://carto.com'
__ASCIISpaceBar 	= '&nbsp;'
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
			appendText('cv --info "jobs"', experienceProgram)
		}

		animateButton(e.target)
	}

	document.getElementById('btnAbilities').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('whoami --focus', whatIDoProgram)
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

	document.getElementById('btnProjects').onclick = function (e) {
		if(isIdle) {
			isIdle = false
			appendText('projects --format TXT --links=yes', projectsProgram)
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
	printLine('\t\tI\'m Guido Fioravantti.')
	printLine('\t\tI started building things in Madrid, kept going at a')
	printLine('\t\tstartup that grew from 20 to 120 people, then moved to')
	printLine('\t\tNew York and built teams and products from scratch at')
	printLine('\t\tBloomberg. Somewhere along the way, a side project went')
	printLine('\t\tviral in Spain. Use the commands below to dig in.')
	printLine(__ASCIISpaceBar)

	prompt()
}

function experienceProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tBloomberg, Trading Systems (Jan 2026 &mdash; Present)')
	printLine('\t\tFour domains: money markets (we run the leading')
	printLine('\t\torigination platform in the space), mortgages and')
	printLine('\t\tMBS workflows, commodities (highest volume of the')
	printLine('\t\tthree), and sell side middle office for allocation')
	printLine('\t\tand settlement. The mission across all of them:')
	printLine('\t\tmodernize the tech stack and turn the teams around.')
	printLine(__ASCIISpaceBar)

	printLine('\tBloomberg, Geo Compute (Jun 2022 &mdash; Feb 2026)')
	printLine('\t\tFounded this team from scratch and built a new business')
	printLine('\t\tline within Bloomberg from zero. The company had MAP,')
	printLine('\t\tbut it expected clients to come to the map and do their')
	printLine('\t\tanalysis there. I flipped that: an API-first product')
	printLine('\t\tthat finds the geographical footprint of any financial')
	printLine('\t\tentity. A company, a muni bond, a supply chain.')
	printLine('\t\tOnce you have the footprint, you overlay alternative')
	printLine('\t\tdata. Is this storm going to hit Exxon\'s refineries?')
	printLine('\t\tHow does Aldi\'s demographic reach compare to Target\'s?')
	printLine('\t\tHas biodiversity shifted near these factories? You can')
	printLine('\t\tgo back historically and construct scores over time,')
	printLine('\t\tsomething a point-in-time map can\'t do.')
	printLine(__ASCIISpaceBar)

	printLine('\tBloomberg, Maps (Jul 2019 &mdash; Jun 2022)')
	printLine('\t\tReplaced Bloomberg\'s legacy GIS stack with the open-')
	printLine('\t\tsource tooling I knew from CARTO. Built all the infra')
	printLine('\t\tfrom scratch: databases, services, our own k8s system')
	printLine('\t\tbefore the company-wide one existed. Always kept one')
	printLine('\t\tfoot in the product side, spotting where geo data could')
	printLine('\t\tsolve real client problems.')
	printLine(__ASCIISpaceBar)

	printLine('\tCARTO (Jul 2015 &mdash; Feb 2018)')
	printLine('\t\tJoined when the company was about 20 people, left when')
	printLine('\t\tit was over 120. Became one of the top contributors to')
	printLine('\t\tthe platform, mostly backend but across the full stack.')
	printLine(__ASCIISpaceBar)

	prompt()
}

function whatIDoProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\t\tMost of my energy goes into people. I take teams that')
	printLine('\t\tare stuck or just getting started and turn them into')
	printLine('\t\tgroups that ship well and enjoy the work. I\'ve done')
	printLine('\t\tit from the inside at Bloomberg more than once.')
	printLine(__ASCIISpaceBar)
	printLine('\t\tI pair that with a product instinct: I\'m good at')
	printLine('\t\tspotting gaps in a market and figuring out what to')
	printLine('\t\tbuild to fill them. Geo Compute started that way.')
	printLine('\t\tSo did SaferLayer.')
	printLine(__ASCIISpaceBar)
	printLine('\t\tOn the technical side, I stay hands-on. Distributed')
	printLine('\t\tsystems, backend engineering, infrastructure, and')
	printLine('\t\tmore recently applied AI and computer vision. I like')
	printLine('\t\tknowing how things work all the way down.')
	printLine(__ASCIISpaceBar)

	prompt()
}

function educationProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tDegree')
	printLine('\t\tTitle\t\tIngenier&iacute;a Telem&aacute;tica')
	printLine('\t\tWhere\t\tUniversidad Carlos III de Madrid')
	printLine('\t\tTime\t\t2010 &mdash; 2015')
	printLine(__ASCIISpaceBar)

	prompt()
}

function contactProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\tFind me on:')
	printLine('\t\t+\tLinkedIn\t<a href=' + __LinkedInLink + __TargetBlank + '>Guido Fioravantti</a>')
	printLine(__ASCIISpaceBar)

	prompt()
}

function projectsProgram () {
	printLine(__ASCIISpaceBar)
	printLine('\t+\t<a href=' + __SaferLayerLink + __TargetBlank + '>SaferLayer</a>')
	printLine('\t\tCo-founded with a long-time partner I met in New York.')
	printLine('\t\tWhen someone asks for your ID, you use SaferLayer\'s')
	printLine('\t\tfree offline tool to embed their name into the document')
	printLine('\t\twith AI-resistant watermarks. The copy is forever tied')
	printLine('\t\tto whoever requested it, so if it leaks, you know')
	printLine('\t\texactly where it came from. The product went viral in')
	printLine('\t\tSpain, and we\'re now building a B2B API so businesses')
	printLine('\t\tcan integrate the service directly.')
	printLine(__ASCIISpaceBar)
	printLine('\t+\tBloomberg Geo Compute')
	printLine('\t\tAPI-first geospatial intelligence for financial data.')
	printLine('\t\tFind the geographical footprint of any entity, overlay')
	printLine('\t\talternative data (weather, demographics, biodiversity),')
	printLine('\t\tand run exposure analysis with historical lookback.')
	printLine(__ASCIISpaceBar)
	printLine('\t+\tBloomberg Trading Systems')
	printLine('\t\tExecution and allocation systems for money markets,')
	printLine('\t\tmortgages, and commodities.')
	printLine(__ASCIISpaceBar)
	printLine('\t+\t<a href=' + __CartoLink + __TargetBlank + '>CARTO</a>')
	printLine('\t\tLocation intelligence platform. Was one of the top')
	printLine('\t\tcontributors during the company\'s high-growth phase.')
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

