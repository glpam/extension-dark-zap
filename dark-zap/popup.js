function rotinaDarkZap(){
  chrome.tabs.getSelected(null, function(tab) {
    var titulo = tab.title;

    chrome.tabs.executeScript(null, {
      code: `document.all[0].getElementsByTagName('body')[0].className.indexOf('dark');`,
      allFrames: false, // this is the default
      runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
    }, function(results) {
        var result = results[0];
        if(titulo.indexOf("WhatsApp") > -1){
          if(result == -1){
            chrome.tabs.executeScript(null, {
              code: `document.all[0].getElementsByTagName('body')[0].className = "web dark";`,
              allFrames: false, // this is the default
              runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
            }, function(results) {
                document.getElementById('ativar').innerHTML = "Dark Zap está<br>ativado!";
                chrome.browserAction.setIcon({path:"icon.png"});
            });
          }
          else if(result  > 0){
            chrome.tabs.executeScript(null, {
              code: `document.all[0].getElementsByTagName('body')[0].className = "web";`,
              allFrames: false, // this is the default
              runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
            }, function(results) {
              document.getElementById('ativar').innerHTML = "Dark Zap está<br>desativado!";
              chrome.browserAction.setIcon({path:"icon-light.png"});
            });
          }
        }
        else{
          document.getElementById('ativar').innerHTML = "Você não está com uma aba do Whatsapp aberta!";
        }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  rotinaDarkZap();

  var ativar = document.getElementById('ativar');
  // ativar.addEventListener('click', function() {
  //   rotinaDarkZap();
  // }, false);


}, false);