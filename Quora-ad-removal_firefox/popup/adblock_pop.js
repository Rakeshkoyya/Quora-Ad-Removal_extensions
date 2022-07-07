
function listenForClicks() {
  document.addEventListener("click", (e) => {
    function adblock(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
      command: "none"
    });
    }

    function reset(tabs) {      
        browser.tabs.sendMessage(tabs[0].id, {
        command: "block",
      }); 
    }

    function reportError(error) {
    console.error(`Could not load: ${error}`);
    }

    if (e.target.classList.contains("remove")) {
      browser.tabs.query({active: true, currentWindow: true}).then(adblock).catch(reportError);
    }
    else if (e.target.classList.contains("undo")) {
      browser.tabs.query({active: true, currentWindow: true}).then(reset).catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
console.error(`Failed to execute adblock content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/adblock.js"}).then(listenForClicks).catch(reportExecuteScriptError);


async function getActiveTabURL() {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    active: true
  });

  return tabs[0];
}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (activeTab.url.includes("quora.com")) {
    console.log("can work on this page");
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = '<div class="title"><h6>This is not a quora page.</h6></div>';
  }
});


