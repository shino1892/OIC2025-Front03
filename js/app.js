// --- 1. HTML要素の取得 ---
// まずは操作したいHTML要素をすべて取得して、変数に入れておく
const switches = document.querySelectorAll('.switch');
const calculations = document.querySelectorAll('.calculation');
const resets = document.querySelectorAll('.reset');
const results = document.querySelectorAll('.result');

// --- 2. イベントリスナーの設定 ---
// forEachを使って、取得したボタンのリストそれぞれにクリックイベントを設定していく

// 数字ボタンの処理
switches.forEach(function (button) {
    button.addEventListener('click', function (e) {
        console.log('数字ボタン:', e.target.textContent);
    });
});
// 演算子ボタンの処理
calculations.forEach(function (button) {
    button.addEventListener('click', function (e) {
        console.log('演算子ボタン:', e.target.textContent);
    });
});

// ACボタンの処理
resets.forEach(function (button) {
    button.addEventListener('click', function () {
        console.log('ACボタンが押されました');
    });
});

// =ボタンの処理
results.forEach(function (button) {
    button.addEventListener('click', function () {
        console.log('=ボタンが押されました');
    });
});
