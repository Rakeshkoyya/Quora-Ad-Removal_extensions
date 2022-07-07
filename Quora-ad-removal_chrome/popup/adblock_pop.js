const removeBtn = document.getElementById("remove");
removeBtn.addEventListener("click", removeBtnFunc);

function removeBtnFunc() {
  chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
    var activetab = tabs[0];
    chrome.tabs.sendMessage(activetab.id, {dispCommand:"none"});
  })
}


const undoBtn = document.getElementById("undo");
undoBtn.addEventListener("click", undoBtnFunc);

function undoBtnFunc() {
  chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
    var activetab = tabs[0];
    chrome.tabs.sendMessage(activetab.id, {dispCommand:"block"});
  })
}


async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });
  return tabs[0];
}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  console.log(activeTab.url)

  if (!activeTab.url.includes("quora.com")) {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = '<div class="title"><h6>This is not a quora page.</h6></div>';
  }

});