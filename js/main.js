"use strict";

/*---------- ハンバーガーメニュー ----------*/
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_nav");
const body = document.querySelector(".js_body");
let dwmkbn = 0;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  // body.classList.toggle("is-active");
  if (body.classList.contains("is-active")) {
    enableScroll();
  } else {
    disableScroll();
  }
  if (dwmkbn === 0) {
    dwmkbn = 1;
  } else {
    dwmkbn = 0;
  }
});

// PC幅でナビゲーションをクリックしても"is-active"がつかないようにします
navigation.addEventListener("click", () => {
  if (window.innerWidth < 1080) {
    hamburger.classList.toggle("is-active");
    navigation.classList.toggle("is-active");
    // body.classList.toggle("is-active");
    if (body.classList.contains("is-active")) {
      enableScroll();
    } else {
      disableScroll();
    }
  }
});

// スマホ（ハンバーガーメニューをクリック）→PC→スマホに画面幅が変更されたとき、強制的に"is-active"を外す
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1080) {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
  }
});

/*---------- スライドによるヘッダの表示 ----------*/
let lastScrollY = window.scrollY;
let threshold = 100; // 500px 上から以上スクロールしたら反応
let timeout;
let isFooterVisible = false;
const footer = document.querySelector(".l_footer");
const header = document.querySelector(".js_header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // フッターが見えていたらスクロール判定はしない
  if (isFooterVisible) return;

  clearTimeout(timeout); // 既存のタイマーをリセット

  if (currentScrollY > lastScrollY && currentScrollY > threshold) {
    header.classList.remove("is-active");
  } else {
    header.classList.remove("is-active");
  }

  lastScrollY = currentScrollY;

  // スクロールが止まったら 1 秒後にヘッダーを非表示
  timeout = setTimeout(() => {
    // スクロールされていない場合は表示
    if (lastScrollY === 0) return;
    // ドロワーメニューが開かれている場合は表示
    if (dwmkbn === 1) return;
    header.classList.add("is-active");
  }, 1000);
});

// フッターの可視状態を監視
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("フッターが見えた！ヘッダーを隠す");
        isFooterVisible = true;
        header.classList.add("is-active");
      } else {
        console.log("フッターが見えなくなった！スクロール判定を再開");
        isFooterVisible = false;
      }
    });
  },
  {
    root: null, // ビューポート（画面）基準
    threshold: 0.2, // 10% 見えたら発動
  },
);

observer.observe(footer);

let scrollY;

function disableScroll() {
  scrollY = window.scrollY;

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  body.style.paddingRight = `${scrollbarWidth}px`;
  body.style.top = `-${scrollY}px`;
  body.classList.add("is-active");
}

function enableScroll() {
  body.style.paddingRight = "";
  body.style.top = "";
  window.scrollTo(0, scrollY);
  body.classList.remove("is-active");
}

// safariかを判別
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Chromeかを判別
function isChrome() {
  return (
    /chrome/i.test(navigator.userAgent) &&
    !/edge|edg|opr|opera/i.test(navigator.userAgent)
  );
}

/*---------- 本編 ----------*/
// 状態変数
let currentPuzzle = 99;
let hintCount = 0;
let input = "";
const result = document.getElementById("result");

// 幕開け
function start(n) {
  document.querySelector(".start").classList.add("is-disable");
  document.querySelector(".js_body").classList.remove("is-active");
  // document.getElementById("don-sound").play();
  currentPuzzle = 0;

  // setTimeout(() => {
  document.getElementById("intro-overlay").style.display = "none";
  // document.getElementById("inPark").classList.add("is-active");
  // if (n === "o") {
  //   setTimeout(() => {
  //     document.getElementById("phoneCall").play();
  //     document.getElementById("phoneVibe").play();
  //   }, 3000);
  // }
  // if (n === "d") {
  //   document.getElementById("lock").play();
  // }

  // }, 2000); // 2秒後に切り替え
}

// 謎と答え
const puzzles = [
  {
    question:
      "<p class=\"m_question_p\">問題文0</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: "答え0",
  },
  {
    question:
      "<div class='l_img-box'><img src='img/TikTok_謎1.png' alt='' class='m_img' width='500' height='500'></div><p class=\"m_question_p\">①か②どっちか入力</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: ["マック", "マクド", "まっく", "まくど"],
  },
  {
    question:
      "<div class='l_img-box'><img src='img/TikTok_謎2.png' alt='謎1' class='m_img' width='500' height='500'></div><p class=\"m_question_p\">問題文2</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: "答え2",
  },
  {
    question:
      "<div class='l_img-box'><img src='img/TikTok_謎3.png' alt='謎1' class='m_img' width='500' height='500'></div><p class=\"m_question_p\">問題文3</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: "答え3",
  },
  {
    question:
      "<div class='l_img-box'><img src='img/TikTok_謎4.png' alt='謎1' class='m_img' width='500' height='500'></div><p class=\"m_question_p\">問題文4</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: "答え4",
  },
  {
    question:
      "<div class='l_img-box'><img src='img/TikTok_謎5.png' alt='謎1' class='m_img' width='500' height='500'></div><p class=\"m_question_p\">問題文4</p> <input type='text' id='answer' class='m_answer' placeholder='答えを入力' /> <button class='m_btn' id='solveBtn' onclick=\"submitAnswer()\"> 回答 </button> <p id='result'class class='m_question_p'></p>",
    answer: "答え5",
  },
];

function openQuestion() {
  document.getElementById("qP").innerHTML = puzzles[currentPuzzle].question;
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

// モーダル表示
const modalText = {
  nazo0: '<div id="qP"></div>',
  nazo1: '<div id="qP"></div>',
  nazo2: '<div id="qP"></div>',
  nazo3: '<div id="qP"></div>',
  nazo4: '<div id="qP"></div>',
  nazo5: '<div id="qP"></div>',
};

function openModal(modalId) {
  document.getElementById(modalId + "P").innerHTML = modalText[modalId];
  document.getElementById(modalId).classList.remove("is-disable");
}

document.querySelectorAll(".m_close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".l_modal").classList.add("is-disable");
  });
});

// 現在日付の取得
function getNowDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

// 回答
function submitAnswer() {
  if (input === "") {
    input = document.getElementById("answer").value.trim().toLowerCase();
  }
  const guess = input;
  const result = document.getElementById("result");
  const hints = document.querySelectorAll(".js_hint");
  const pipon = document.getElementById("pipon");
  if (puzzles[currentPuzzle].answer.includes(guess)) {
    // 謎進行処理
    if (currentPuzzle === 0) {
      pipon.play();
      document.getElementById("nazo0P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section0").classList.remove("is-active");
      document.getElementById("section1").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    } else if (currentPuzzle === 1) {
      pipon.play();
      document.getElementById("nazo1P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section1").classList.remove("is-active");
      document.getElementById("section2").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    } else if (currentPuzzle === 2) {
      pipon.play();
      document.getElementById("nazo2P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section2").classList.remove("is-active");
      document.getElementById("section3").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    } else if (currentPuzzle === 3) {
      pipon.play();
      document.getElementById("nazo3P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section3").classList.remove("is-active");
      document.getElementById("section4").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    } else if (currentPuzzle === 4) {
      pipon.play();
      document.getElementById("nazo4P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section4").classList.remove("is-active");
      document.getElementById("section5").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    } else if (currentPuzzle === 5) {
      pipon.play();
      document.getElementById("nazo5P").innerHTML = "";
      currentPuzzle++;
      input = "";
      // 次のセクションへ
      document.getElementById("section5").classList.remove("is-active");
      document.getElementById("goodEnd").classList.add("is-active");
      hints.forEach((hint) => {
        hint.classList.remove("is-active");
      });
      hintCount = 0;
    }
  } else {
    result.textContent = ".";
    setTimeout(() => {
      input = "";
      result.textContent = "違うみたい...";
    }, 50);
    setTimeout(() => {
      document.getElementById("bubuu").play();
    }, 400);
  }
}

// ヒント
function openhint() {
  if (currentPuzzle === 99) {
    const hint1 = document.getElementById("hintExample1");
    const hint2 = document.getElementById("hintExample2");
    const hint3 = document.getElementById("hintExample3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 0) {
    const hint1 = document.getElementById("nazo0h1");
    const hint2 = document.getElementById("nazo0h2");
    const hint3 = document.getElementById("nazo0h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 1) {
    const hint1 = document.getElementById("nazo1h1");
    const hint2 = document.getElementById("nazo1h2");
    const hint3 = document.getElementById("nazo1h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 2) {
    const hint1 = document.getElementById("nazo2h1");
    const hint2 = document.getElementById("nazo2h2");
    const hint3 = document.getElementById("nazo2h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 3) {
    const hint1 = document.getElementById("nazo3h1");
    const hint2 = document.getElementById("nazo3h2");
    const hint3 = document.getElementById("nazo3h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 4) {
    const hint1 = document.getElementById("nazo4h1");
    const hint2 = document.getElementById("nazo4h2");
    const hint3 = document.getElementById("nazo4h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  } else if (currentPuzzle === 5) {
    const hint1 = document.getElementById("nazo5h1");
    const hint2 = document.getElementById("nazo5h2");
    const hint3 = document.getElementById("nazo5h3");
    if (hintCount === 0) {
      hint1.classList.toggle("is-active");
      hintCount = 1;
    } else if (hintCount === 1) {
      hint2.classList.toggle("is-active");
      hintCount = 2;
    } else if (hintCount === 2) {
      hint3.classList.toggle("is-active");
      hintCount = 3;
    } else if (hintCount === 3) {
      hint1.classList.toggle("is-active");
      hint2.classList.toggle("is-active");
      hint3.classList.toggle("is-active");
      hintCount = 0;
    }
  }
}

// 謎をとばすボタン処理
function passQuestion() {
  input = puzzles[currentPuzzle].answer[0];
  submitAnswer();
}

// 前の謎に戻るボタン処理
function buckQuestion() {
  const hints = document.querySelectorAll(".js_hint");
  if (currentPuzzle === 1) {
    document.getElementById("nazo0").classList.add("is-disable");
    document.getElementById("nazo1P").innerHTML = "";
    currentPuzzle--;
    input = "";
    // 前のセクションへ
    document.getElementById("section1").classList.remove("is-active");
    document.getElementById("section0").classList.add("is-active");
    hints.forEach((hint) => {
      hint.classList.remove("is-active");
    });
    hintCount = 0;
  } else if (currentPuzzle === 2) {
    document.getElementById("nazo1").classList.add("is-disable");
    document.getElementById("nazo2P").innerHTML = "";
    currentPuzzle--;
    input = "";
    /// 前のセクションへ
    document.getElementById("section2").classList.remove("is-active");
    document.getElementById("section1").classList.add("is-active");
    hints.forEach((hint) => {
      hint.classList.remove("is-active");
    });
    hintCount = 0;
  } else if (currentPuzzle === 3) {
    document.getElementById("nazo2").classList.add("is-disable");
    document.getElementById("nazo3P").innerHTML = "";
    currentPuzzle--;
    input = "";
    // 前のセクションへ
    document.getElementById("section3").classList.remove("is-active");
    document.getElementById("section2").classList.add("is-active");
    hints.forEach((hint) => {
      hint.classList.remove("is-active");
    });
    hintCount = 0;
  } else if (currentPuzzle === 4) {
    document.getElementById("nazo3").classList.add("is-disable");
    document.getElementById("nazo4P").innerHTML = "";
    currentPuzzle--;
    input = "";
    // 前のセクションへ
    document.getElementById("section4").classList.remove("is-active");
    document.getElementById("section3").classList.add("is-active");
    hints.forEach((hint) => {
      hint.classList.remove("is-active");
    });
    hintCount = 0;
  } else if (currentPuzzle === 5) {
    document.getElementById("nazo4").classList.add("is-disable");
    document.getElementById("nazo5P").innerHTML = "";
    currentPuzzle--;
    input = "";
    // 前のセクションへ
    document.getElementById("section5").classList.remove("is-active");
    document.getElementById("section4").classList.add("is-active");
    hints.forEach((hint) => {
      hint.classList.remove("is-active");
    });
    hintCount = 0;
  }
}
