"use strict";
const MODES = {
  normal: Symbol('normal'),
  insert: Symbol('insert'),
  auto: Symbol('auto'),
};
let mode = MODES.auto;

const emit = browser.runtime.sendMessage;

const editable = x =>
      x.tagName === 'INPUT' ||
      x.tagName === 'TEXTAREA' ||
      x.getAttribute('g_editable') === 'true' || // most google apps
      x.getAttribute('contenteditable') === 'true' || // generic editable content
      (x.classList && x.classList.contains('input-box')); // google sheets

const CMDS = {
  scrollTop: () => window.scrollTo(0, 0),
  scrollBottom: () => window.scrollTo(0, window.scrollMaxY),
  scrollDown: () => window.scrollByLines(4),
  scrollUp: () => window.scrollByLines(-4),
  scrollLeft: () => window.scollBy(-40, 0),
  scrollRight: () => window.scollBy(40, 0),
  newTab: () => emit({ cmd: 'newTab' }),
  setInsertMode: () => mode = MODES.insert,
  focusUrlBar: () => emit({ cmd: 'focusUrlBar' }),
  reload: (force=false) => document.location.reload(force),
};

const MAPPING = {
  g: CMDS.scrollTop,
  G: CMDS.scrollBottom,
  j: CMDS.scrollDown,
  k: CMDS.scrollUp,
  h: CMDS.scrollLeft,
  l: CMDS.scrollRight,
  y: CMDS.yankUrl,
  t: CMDS.newTab,
  P: CMDS.openInNewTab,
  i: CMDS.setInsertMode,
  o: CMDS.focusUrlBar,
  p: CMDS.openInCurrentTab,
  r: CMDS.reload,
  R: () => CMDS.reload(true),
};
const fG = (ev) => {
  if (ev.key === "Escape") {
    switch (mode) {
    case MODES.insert: mode = MODES.normal;
      break;
    case MODES.auto: mode = MODES.normal;
      break;
    case MODES.normal: mode = MODES.auto;
      break;
    }
  }

  switch (mode) {
  case MODES.insert: return;
  case MODES.auto: if (editable(ev.target)) return;
  }
  if (ev.key in MAPPING && !ev.ctrlKey) {
    MAPPING[ev.key]();
    ev.preventDefault();
    ev.stopPropagation();
  }
  return;
};
addEventListener('keydown', fG, true);
