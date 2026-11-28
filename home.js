// kibosil.com 첫 페이지 — 한국어 / 영어 고르기(2026-11-28). 고른 언어 칸만 보인다.
// 스크립트가 안 돌면 두 언어가 다 보인다(data-lang이 없으면 감추지 않는다).
(function () {
  var root = document.documentElement;
  var TITLES = { ko: "기보실 — 바둑 AI 분석·훈련", en: "Kibosil — Go (Baduk) AI study app" };

  function pick(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang;
    document.title = TITLES[lang];
    var btns = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-set-lang") === lang ? "true" : "false");
    }
  }

  function wanted() {
    if (location.hash === "#en") return "en";
    if (location.hash === "#ko") return "ko";
    var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "ko").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : "en";
  }

  pick(wanted());
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-set-lang]") : null;
    if (!b) return;
    e.preventDefault();
    var lang = b.getAttribute("data-set-lang");
    pick(lang);
    try { history.replaceState(null, "", "#" + lang); } catch (_) { /* 주소만 못 바꿀 뿐 */ }
  });
})();
