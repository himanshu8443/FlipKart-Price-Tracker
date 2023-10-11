// content.js

// Function to create and append the tracking button to the Flipkart product page.
const productPage = document.querySelector(".aMaAEs"); // Modify this selector according to Flipkart's structure.

if (productPage) {
  const trackingButton = document.createElement("button");
  trackingButton.innerText = "Press 'Alt + X' to track this product";
  trackingButton.setAttribute(
    "style",
    "margin-top: 10px; padding: 3px; border-radius: 3px; border: 1px solid #2874f0; background-color: #2874f0; color: white; font-size: 14px; font-weight: 500; cursor: pointer; width: 100%; height: 40"
  );
  trackingButton.classList.add("tracking-button");
  // trackingButton.addEventListener("click", () => {
  //   chrome.runtime.sendMessage({ openMainPage: true });
  // });

  productPage.appendChild(trackingButton);
}
