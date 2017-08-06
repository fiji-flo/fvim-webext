"use strict";
const tabs = browser.tabs;

const newTabUrl = 'about:newtab';

const handleEvent = ev => {
  switch (ev.cmd) {
  case 'newTab': tabs.create({});
    break;
  }
};

browser.runtime.onMessage.addListener(handleEvent);
