(function() {
  // XPath expressions for the two possible target elements
  const xpath1 = "//*[starts-with(@id, 'bubble-')]/div/div/div/div/div[2]/div[3]/div/ul/li/span[4]/span";
  const xpath2 = "/html/body/div[4]/div/div/div[2]/div[3]/div[2]/div[5]/div[2]/div[1]/div/div/div/div/div[2]/div[3]/div/ul/li/span[4]/span";

  // Function to evaluate XPath and return the element
  function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  // Function to apply text-wrap styles
  function applyTextWrapFix(targetElement) {
    console.log("xpath: ", targetElement);
    if (targetElement) {
      targetElement.style.whiteSpace = "normal";
      targetElement.style.wordBreak = "break-word";
      targetElement.style.overflowWrap = "break-word";
      console.log("Text wrap styles applied.");
    }
  }

  // Callback function for the MutationObserver
  function handleMutations(mutations) {
    mutations.forEach(mutation => {
      // Check if the mutation is relevant (e.g., nodes added or character data changed)
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        // Try to find the target element using both XPaths
        let targetElement = getElementByXPath(xpath1);
        console.log("xpath1: ", targetElement);
        if (!targetElement) {
          targetElement = getElementByXPath(xpath2);
          console.log("xpath2: ", targetElement);
        }

        // Apply the fix if the element is found
        applyTextWrapFix(targetElement);
      }
    });
  }

  // Create a MutationObserver instance
  const observer = new MutationObserver(handleMutations);

  // Configuration for the observer
  const observerConfig = {
    childList: true, // Observe additions/removals of child nodes
    subtree: true,   // Observe changes in descendants as well
    characterData: true // Observe changes to text content
  };

  // Find the element to observe (e.g., the speaker notes container)
  // You might need to adjust the selector based on the Google Slides structure
  const container = document.body; // Start observing from the body

  // Start observing
  if (container) {
    observer.observe(container, observerConfig);
    console.log("MutationObserver started.");
  } else {
    console.log("Container element for MutationObserver not found.");
  }
})();