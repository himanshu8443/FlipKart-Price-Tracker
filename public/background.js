// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.openMainPage) {
    chrome.browserAction.openPopup();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "openExtension") {
    chrome.browserAction.openPopup();
  }
});
