// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.openMainPage) {
    // Use Chrome's extension API to open the popup page.
    chrome.windows.create(
      {
        focused: true,
        width: 400,
        height: 600,
        type: "popup",
        url: "index.html",
        top: 50,
        left: 800,
      },
      () => {}
    );
  }
});
