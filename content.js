// This can be used to add right-click context menu integration
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "correctSelection") {
        const selectedText = window.getSelection().toString();
        // You can add logic here to process selected text on the page
        sendResponse({text: selectedText});
    }
});