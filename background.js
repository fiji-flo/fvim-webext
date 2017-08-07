"use strict";
const tabs = browser.tabs;

const newTabUrl = 'about:newtab';

const handleEvent = ev => {
  switch (ev.cmd) {
  case 'newTab':
    tabs.create({});
    break;
  case 'focusUrlBar':
    // how can we do this?
    break;
  }
};

browser.runtime.onMessage.addListener(handleEvent);
