/**
 * 電卓アプリケーション
 * 基本的な四則演算、プラスマイナス切り替え、削除機能を提供
 */

/**
 * ディスプレイに結果を表示する関数
 * @param {string|number} result - 表示する値
 * @param {boolean} calc - 計算結果かどうか（trueの場合は既存の内容をクリア）
 */
const display = (result, calc = false) => {
  const display = document.querySelector("#display td");
  let text = display.textContent;

  // 空の値の場合は何もしない
  if (result === "0" || result === "" || result === null) {
    return;
  }

  // すでに小数点が含まれている場合は何もしない
  if (result.includes(".")) {
    if (text.includes(".")) {
      return;
    }
  }

  // 計算結果の場合は既存の内容をクリアして新しい値を設定
  if (calc) {
    display.textContent = "";
    display.textContent = result;
    return;
  }

  // 通常の入力処理
  if (text === "") {
    // ディスプレイが空の場合はそのまま設定
    display.textContent = result;
  } else if (text !== "" && (result === "+" || result === "-" || result === "*" || result === "/")) {
    // 演算子の場合はスペースで囲んで追加
    display.textContent += " " + result + " ";
  } else {
    // 数字の場合はそのまま追加
    if (text === "0" && result !== ".") {
      // ディスプレイが0の場合は新しい値で上書き
      display.textContent = result;
    } else {
      display.textContent += result;
    }
  }
};

/**
 * 計算を実行する関数
 * @param {string} expression - 計算式（例: "10 + 5"）
 */
const calculate = (expression) => {
  try {
    // eval()を使用して計算式を評価
    const result = eval(expression);

    // 小数点以下の桁数を制限（15桁まで表示）
    let formattedResult;
    if (Number.isInteger(result)) {
      // 整数の場合はそのまま文字列に変換
      formattedResult = result.toString();
    } else {
      // 小数の場合は15桁に制限し、末尾の0を削除
      formattedResult = parseFloat(result.toFixed(15)).toString();
    }

    // 計算結果をディスプレイに表示
    display(formattedResult, true);
  } catch (error) {
    // エラーが発生した場合は"Error"を表示
    display("Error", true);
  }
};

/**
 * ボタンクリック時のイベントハンドラー
 * @param {Event} e - クリックイベント
 */
const onClickButton = (e) => {
  const button = e.target;
  const value = button.textContent;

  // ボタンの種類に応じて処理を分岐
  switch (value) {
    case "AC":
      // All Clear: ディスプレイをクリア
      document.querySelector("#display td").textContent = "0";
      return;

    case "=":
      // 等号: 計算を実行
      const expression = document.querySelector("#display td").textContent;
      calculate(expression);
      return;

    case "del":
      // Delete: 最後の文字または演算子を削除
      const displayCell = document.querySelector("#display td");
      let current = displayCell.textContent.trimEnd();

      // 演算子（スペース付き）で終わっている場合は3文字削除（" + "など）
      if (current.endsWith(" +") || current.endsWith(" -") || current.endsWith(" *") || current.endsWith(" /")) {
        displayCell.textContent = current.slice(0, -2).trimEnd();
      } else {
        // 通常の文字の場合は1文字削除
        displayCell.textContent = current.slice(0, -1);
      }
      return;

    case "()":
      // 括弧の自動切り替え: (と)のバランスを見て適切な方を入力
      const currentText = document.querySelector("#display td").textContent;

      // 開き括弧と閉じ括弧の数をカウント
      const openCount = (currentText.match(/\(/g) || []).length;
      const closeCount = (currentText.match(/\)/g) || []).length;

      // 開き括弧の方が多い、または同数の場合は閉じ括弧を入力
      // そうでなければ開き括弧を入力
      if (openCount > closeCount) {
        display(")");
      } else {
        display("(");
      }
      return;

    case "+/-":
      // プラスマイナス切り替え
      const currentValue = document.querySelector("#display td").textContent;

      // 四則演算記号で分割して最後の部分を取得
      // 正規表現で演算子とその前後のスペースをキャプチャ
      const parts = currentValue.split(/(\s[\+\-\*\/]\s)/);

      if (parts.length > 1) {
        // 四則演算がある場合、最後の数字のプラスマイナスを切り替え
        const lastNumber = parts[parts.length - 1].trim();
        let newLastNumber;

        if (lastNumber.startsWith("-")) {
          // マイナスの場合はプラスに変更（マイナス記号を削除）
          newLastNumber = lastNumber.slice(1);
        } else if (lastNumber !== "") {
          // プラスの場合はマイナスに変更（マイナス記号を追加）
          newLastNumber = "-" + lastNumber;
        } else {
          // 空の場合はそのまま
          newLastNumber = lastNumber;
        }

        // 分割した配列の最後の部分を更新して結合
        parts[parts.length - 1] = newLastNumber;
        display(parts.join(""), true);
      } else {
        // 四則演算がない場合、全体のプラスマイナスを切り替え
        if (currentValue.startsWith("-")) {
          // マイナスの場合はプラスに変更
          display(currentValue.slice(1), true);
        } else {
          // プラスの場合はマイナスに変更
          display("-" + currentValue, true);
        }
      }
      return;
  }

  // 上記以外のボタン（数字や演算子）の場合は通常の入力処理
  display(value);
};

/**
 * 初期化処理
 * 全ての電卓ボタンにクリックイベントリスナーを設定
 */
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", onClickButton);
});
