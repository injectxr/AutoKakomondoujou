var switch1On = false;
var switch2On = false;

function changeButtonStyle() {
  console.log("changeButtonStyle() :", switch1On, switch2On);
  const targetButton = document.querySelector('.selectBtn#t');

  if (targetButton) {
    // スライダーの初期値を考慮して条件分岐
    if (switch1On && switch1On !== 'false') {
      targetButton.style.color = "red";
    }

    if (switch2On && switch2On !== 'false') {
      targetButton.click();

      const nextButton = document.querySelector('.submit[data-text="NEXT"]');
      if (nextButton) {
        nextButton.click();
      }
    }
  } else {
    console.log('要素が見つかりませんでした');
  }
}

// スライダーの初期値を取得する
chrome.storage.local.get(['switchState1', 'switchState2'], function(result) {
    if (result.switchState1 !== undefined) {
      switch1On = result.switchState1;
      console.log('Switch 1 value from storage:', switch1On);
    }
    if (result.switchState2 !== undefined) {
      switch2On = result.switchState2;
      console.log('Switch 2 value from storage:', switch2On);
    }
    changeButtonStyle(); // 初期値を取得後にスタイルを変更する関数を呼び出す
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.slider1Value !== undefined) {
      switch1On = request.slider1Value;
      changeButtonStyle();
    }
  
    if (request.slider2Value !== undefined) {
      switch2On = request.slider2Value;
      changeButtonStyle();
    }
  });