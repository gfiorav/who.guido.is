import CONTENT from './content.js';

// Config
const TERM_HEIGHT = 24;
const TYPE_DELAY_MIN = 30;
const TYPE_DELAY_MAX = 100;
const BLINK_INTERVAL = 800;
const BTN_ANIM_INTERVAL = 70;
const LOADING_INTERVAL = 200;
const INITIAL_WAIT = 1000;
const ENTER_WAIT = 300;
const NBSP = '&nbsp;';
const CURSOR_HTML = `<b style="color:#7f7f7f">${String.fromCharCode(9608)}</b>`;
const PROMPT_TEXT = 'who.guido.is:~ guest$ ';
const TAB = '&nbsp;&nbsp;&nbsp;&nbsp;';
const LOADING_SYMBOLS = ['|', '/', '&mdash;', '|', '/', '&mdash;', '\\'];
const CHARS_PER_LINE = 43;
const BODY_INDENT = 8;
const WRAP_INDENT = 4;
const FIRST_LINE_WIDTH = CHARS_PER_LINE - BODY_INDENT;
const WRAP_LINE_WIDTH = CHARS_PER_LINE - WRAP_INDENT;

// Text Wrapping

function wrapText(text, firstWidth, wrapWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  let currentMax = firstWidth;

  for (const word of words) {
    if (!word) continue;
    const wordLen = word.length;
    const currentLen = current.length;
    const wouldBe = currentLen === 0 ? wordLen : currentLen + 1 + wordLen;

    if (wouldBe > currentMax && currentLen > 0) {
      lines.push(current);
      current = word;
      currentMax = wrapWidth;
    } else {
      current += (currentLen === 0 ? '' : ' ') + word;
    }
  }
  if (current.length > 0) {
    lines.push(current);
  }
  return lines;
}

function extractLinks(text) {
  const links = [];
  const linkRegex = /<a[^>]*href="[^"]*"[^>]*>([^<]*)<\/a>/g;
  let match;
  let index = 0;
  let plain = text;

  while ((match = linkRegex.exec(text)) !== null) {
    const visibleText = match[1];
    const placeholder = `\x00${visibleText}\x01`;
    links.push({
      placeholder,
      fullTag: match[0],
      text: visibleText
    });
    index++;
  }

  for (const link of links) {
    plain = plain.replace(link.fullTag, link.placeholder);
  }

  return { plain, links };
}

function reinsertLinks(text, links) {
  let result = text;
  for (const link of links) {
    result = result.replace(link.placeholder, link.fullTag);
  }
  return result;
}

// State
let cursorPID = 0;
let linesOutput = 0;
let loadingRotation = 0;
let isIdle = false;
let cursorOn = false;
let txtLine = null;

const $ = (id) => document.getElementById(id);

window.onload = () => {
  registerEventListeners();
  printLine(`Last login: ${formatDate(new Date())} on ttys000`);
  prompt();
  isIdle = false;
  setTimeout(() => appendText('welcome --lang=en', welcomeProgram), INITIAL_WAIT);
};

function registerEventListeners() {
  const commands = [
    ['btnCurrentPosition', 'cv --info "jobs"', experienceProgram],
    ['btnContact', 'cv --info "contact"', contactProgram],
    ['btnProjects', 'projects --format TXT --links=yes', projectsProgram],
    ['btnClear', 'clear', clearScreenProgram]
  ];

  for (const [id, cmd, program] of commands) {
    $(id).onclick = (e) => {
      if (isIdle) {
        isIdle = false;
        appendText(cmd, program);
      }
      animateButton(e.target);
    };
  }
}

function animateButton(button) {
  const t = BTN_ANIM_INTERVAL;
  setTimeout(() => activeButton(button), t);
  setTimeout(() => inactiveButton(button), t * 2);
  setTimeout(() => activeButton(button), t * 3);
  setTimeout(() => inactiveButton(button), t * 4);
}

function activeButton(button) {
  button.style.backgroundColor = '#4c4c4c';
  button.style.color = 'white';
  button.style.borderColor = 'white';
}

function inactiveButton(button) {
  button.style.backgroundColor = 'white';
  button.style.color = 'black';
  button.style.borderColor = '#4c4c4c';
}

// Cursor

function startCursor() {
  stopCursor();
  cursorPID = setInterval(blinkCursor, BLINK_INTERVAL);
}

function blinkCursor() {
  if (!cursorOn) {
    txtLine.innerHTML += CURSOR_HTML;
  } else {
    txtLine.innerHTML = txtLine.innerHTML.slice(0, -CURSOR_HTML.length);
  }
  cursorOn = !cursorOn;
}

function stopCursor() {
  clearInterval(cursorPID);
  if (cursorOn) {
    txtLine.innerHTML = txtLine.innerHTML.slice(0, -CURSOR_HTML.length);
    cursorOn = false;
  }
}

// Output

function format(line) {
  const pieces = line.split('\t');
  if (pieces.length === 1) return line;

  let result = '';
  let accLength = 0;

  for (let p = 0; p < pieces.length; p++) {
    result += pieces[p];
    accLength += pieces[p].length;

    if (p !== pieces.length - 1) {
      const nearestTab = 4 * Math.round((accLength + 4) / 4);
      const tabsNeeded = nearestTab - accLength;
      result += NBSP.repeat(tabsNeeded);
      accLength += tabsNeeded;
    }
  }

  return result;
}

function printLine(line) {
  const formatted = format(line);
  const termText = $('txtTermText');

  txtLine = document.createElement('li');
  txtLine.className = 'terminal-line';
  txtLine.id = linesOutput;
  txtLine.innerHTML = formatted;

  termText.appendChild(txtLine);
  termText.scrollTop = termText.scrollHeight;
  linesOutput++;
}

function appendText(line, callback) {
  stopCursor();
  $('txtTermText').scrollTop = $('txtTermText').scrollHeight;

  const formatted = format(line);
  let delay = 0;

  for (let c = 0; c < formatted.length - 1; c++) {
    printChar(formatted.charAt(c), delay, false, null);
    delay += Math.floor(Math.random() * TYPE_DELAY_MAX + TYPE_DELAY_MIN);
  }
  printChar(formatted.charAt(formatted.length - 1), delay, true, callback);
}

function printChar(c, delay, isLast, callback) {
  setTimeout(() => {
    txtLine.innerHTML += c;
    if (isLast) {
      setTimeout(callback, ENTER_WAIT);
      startCursor();
    }
  }, delay);
}

function clearScreen(callback) {
  const termText = $('txtTermText');
  while (termText.firstChild) {
    termText.removeChild(termText.firstChild);
  }
  setTimeout(callback, ENTER_WAIT);
}

// Helpers

function printBodyLines(lines) {
  const paragraph = lines.join(' ');
  const { plain, links } = extractLinks(paragraph);
  const wrapped = wrapText(plain, FIRST_LINE_WIDTH, WRAP_LINE_WIDTH);
  
  for (let i = 0; i < wrapped.length; i++) {
    const line = reinsertLinks(wrapped[i], links);
    const prefix = i === 0 ? '\t\t' : '\t';
    printLine(`${prefix}${line}`);
  }
}

function makeLink(linkKey, text) {
  return `<a href="${CONTENT.links[linkKey]}" target="_blank">${text}</a>`;
}

// Programs

function prompt() {
  printLine(PROMPT_TEXT);
  isIdle = true;
}

function welcomeProgram() {
  printLine(NBSP);
  printLine(`\t${CONTENT.welcome.greeting}`);
  printLine(NBSP);
  for (const line of CONTENT.welcome.body) {
    if (line === '') {
      printLine(NBSP);
    } else {
      printBodyLines([line]);
    }
  }
  printLine(NBSP);
  prompt();
}

function experienceProgram() {
  printLine(NBSP);
  for (const role of CONTENT.experience) {
    printLine(`\t${role.header}`);
    printLine(`\t${role.subheader}`);
    printLine(NBSP);
    printBodyLines(role.body);
    printLine(NBSP);
  }
  prompt();
}

function contactProgram() {
  printLine(NBSP);
  for (const item of CONTENT.contact.items) {
    printLine(`\t${makeLink(item.linkKey, item.text)}`);
  }
  printLine(NBSP);
  prompt();
}

function projectsProgram() {
  printLine(NBSP);
  for (const proj of CONTENT.projects) {
    const name = proj.linkKey ? makeLink(proj.linkKey, proj.name) : proj.name;
    printLine(`\t+\t${name}`);
    printBodyLines(proj.body);
    printLine(NBSP);
  }
  prompt();
}

function clearScreenProgram() {
  clearScreen(prompt);
}

// Date formatting

function formatDate(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const pad = (n) => n < 10 ? `0${n}` : n;

  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
