(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function toggleAds(state,time) {
    setTimeout(function(){ 
      var id = document.getElementById('mainContent');
      var divs = id.getElementsByTagName('div');


      var adElements=[];
      for(var i = 0; i < divs.length; i++){
        if(divs[i].textContent.includes("Ad by") || divs[i].textContent.includes('Sponsored by') || divs[i].textContent.includes('Promoted by') ){
          var innerdivs = divs[i].getElementsByTagName('div');
          if (!innerdivs.length){
            adElements.push(divs[i]);
          }
        }
      }


      if(adElements.length){
        for(var i=0; i< adElements.length; i++){
          var pelement = adElements[i].parentElement.parentElement.parentElement;
          pelement.style.display = state;
        }     
        
      }
    }, time);

  }


  browser.runtime.onMessage.addListener((message) => {
    toggleAds(message.command,0)
  });

  // waits for 2 seconds to completely load and apply the document

  toggleAds('none',0);
  toggleAds('none',2000);
  toggleAds('none',5000);
  
})();
  