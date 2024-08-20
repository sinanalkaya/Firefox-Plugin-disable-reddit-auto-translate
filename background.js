browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      try {
        let url = new URL(details.url);
  
        // check if tl parameter is set
        if (url.searchParams.has('tl')) {
          // remove tl parameter
          url.searchParams.delete('tl');
  
          // check if url is still good to prevent endless loops
          if (url.href !== details.url) {
            return { redirectUrl: url.href };
          }
        }
      } catch (e) {
        console.error("Error processing URL: ", e);
      }
    },
    {
      urls: ["*://www.reddit.com/*"],
      types: ["main_frame"]
    },
    ["blocking"]
  );