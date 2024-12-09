(function() {
    // XPath expressions for the two possible target elements
    const xpath1 = "//*[@id='bubble-297']/div/div/div/div/div[2]/div[3]/div/ul/li/span[4]/span";
    const xpath2 = "/html/body/div[4]/div/div/div[2]/div[3]/div[2]/div[5]/div[2]/div[1]/div/div/div/div/div[2]/div[3]/div/ul/li/span[4]/span";
  
    // Function to evaluate XPath and return the element
    function getElementByXPath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
  
    // Try to find the first element
    let targetElement = getElementByXPath(xpath1);
  
    // If the first element is not found, try the second one
    if (!targetElement) {
      targetElement = getElementByXPath(xpath2);
    }
  
    // If neither element is found, exit
    if (!targetElement) {
      console.log("Target element not found.");
      return;
    }
  
    // Set text-wrap to auto if the element exists
    targetElement.style.textWrap = "auto";
    targetElement.style.whiteSpace = "normal";
    targetElement.style.wordBreak = "break-word";
    targetElement.style.overflowWrap = "break-word";
  
    console.log("Text wrap set to auto.");
  })();