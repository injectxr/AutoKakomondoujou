document.addEventListener("DOMContentLoaded", function() {
    let slider1 = document.getElementById("switch__checkbox1");
    let slider2 = document.getElementById("switch__checkbox2");

    function saveSwitchState(switchNumber, state) {
      const key = switchNumber === 1 ? 'switchState1' : 'switchState2';
      chrome.storage.local.set({ [key]: state }, function() {
        console.log('スイッチの状態が保存されました:', state);
      });
    }
    
    // 保存されたデータを取得して初期値としてセットする
    chrome.storage.local.get(['switchState1', 'switchState2'], function(result) {
    if (result.switchState1 !== undefined) {
      slider1.checked = result.switchState1;
    }
    if (result.switchState2 !== undefined) {
      slider2.checked = result.switchState2;
    }

    //console.log("document.addEventListener真ん中",slider1.checked,slider2.checked)

    // スライダーの状態変更後の処理
    slider1.addEventListener("change", function() {
      const value1 = slider1.checked;
      saveSwitchState(1, value1);
      sendMessageToContentScript({ slider1Value: value1 });
    });

    slider2.addEventListener("change", function() {
      const value2 = slider2.checked;
      saveSwitchState(2, value2);
      sendMessageToContentScript({ slider2Value: value2 });
    });
  });
});

// content.jsにメッセージを送る関数
function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}