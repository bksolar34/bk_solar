/**
 * js/i18n-engine.js
 * ---------------------------------------------------------------------
 * 다국어 번역 서비스 (요청: "번역서비스가 크롬의 번역서비스와 똑같이
 * 할 것 / 국가 항목이 너무 적어").
 *
 * 크롬 내장 번역과 동일한 엔진(Google 번역)을 쓰도록, 브라우저에서
 * API 키 없이 바로 호출 가능한 Google 번역 비공식 무료 엔드포인트
 * (translate.googleapis.com/translate_a/single, client=gtx)를 1순위로
 * 쓴다 -- 다수의 오픈소스 프로젝트(googletrans 등)가 쓰는 것과 동일한
 * 방식이며, 크롬이 페이지 번역에 쓰는 것과 같은 Google 번역 엔진이라
 * 품질/언어 지원 폭이 크롬 번역과 사실상 동일하다. 이 엔드포인트가
 * 막히는 환경(사내망 등)을 대비해 MyMemory 무료 API를 2차 폴백으로
 * 남겨둔다. 두 API 모두 실패하면 원문을 그대로 보여준다(화면이
 * 깨지지 않도록).
 *
 * 언어 목록은 국내 태양광 현장에서 자주 필요한 외국인 근로자 출신국
 * 언어 + 주요 국제어를 크롬 번역 언어 목록 수준으로 폭넓게 채웠다.
 * ---------------------------------------------------------------------
 */
window.I18N_LANGS = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "zh-CN", label: "中文(简体)" },
  { code: "zh-TW", label: "中文(繁體)" },
  { code: "ja", label: "日本語" },
  { code: "th", label: "ภาษาไทย" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "tl", label: "Filipino" },
  { code: "km", label: "ភាសាខ្មែរ" },
  { code: "my", label: "မြန်မာဘာသာ" },
  { code: "ne", label: "नेपाली" },
  { code: "si", label: "සිංහල" },
  { code: "mn", label: "Монгол" },
  { code: "uz", label: "Oʻzbekcha" },
  { code: "ky", label: "Кыргызча" },
  { code: "bn", label: "বাংলা" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
  { code: "ru", label: "Русский" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" },
  { code: "tr", label: "Türkçe" },
  { code: "pl", label: "Polski" },
];

(function () {
  const CACHE_KEY = "ems_i18n_cache_v2";
  const LANG_KEY = "ems_i18n_lang";

  let cache = {};
  try { cache = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "{}"); } catch (e) { cache = {}; }

  let currentLang = "ko";
  try { currentLang = window.localStorage.getItem(LANG_KEY) || "ko"; } catch (e) { /* private mode 등 */ }

  const listeners = new Set();

  function persistCache() {
    try { window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) { /* quota 초과 등은 무시 */ }
  }

  function cacheKey(text, lang) { return lang + "::" + text; }

  // Google 번역 언어 코드는 zh-CN/zh-TW처럼 사용하지만, MyMemory는
  // zh만 지원하는 등 API별로 코드 체계가 조금 다르다. MyMemory 폴백
  // 호출 시에만 이렇게 단순화한다.
  function toMyMemoryLang(lang) {
    if (lang.startsWith("zh")) return "zh";
    return lang;
  }

  // 1순위: Google 번역 비공식 무료 엔드포인트 (크롬 내장 번역과 동일한 엔진).
  async function translateViaGoogle(text, lang) {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=" +
      encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google 번역 요청 실패: " + res.status);
    const data = await res.json();
    // 응답 형태: [[["번역문","원문",null,null,3], ...], null, "ko"]
    const segments = data && data[0];
    if (!Array.isArray(segments)) throw new Error("Google 번역 응답 형식 이상");
    const translated = segments.map((seg) => seg[0]).join("");
    if (!translated) throw new Error("Google 번역 빈 응답");
    return translated;
  }

  // 2차 폴백: MyMemory 무료 번역 API.
  async function translateViaMyMemory(text, lang) {
    const url =
      "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) +
      "&langpair=ko|" + encodeURIComponent(toMyMemoryLang(lang));
    const res = await fetch(url);
    if (!res.ok) throw new Error("MyMemory 요청 실패: " + res.status);
    const data = await res.json();
    const translated = data && data.responseData && data.responseData.translatedText;
    if (!translated || typeof translated !== "string") throw new Error("MyMemory 빈 응답");
    return translated;
  }

  window.I18N = {
    getLang: () => currentLang,
    setLang(lang) {
      currentLang = lang;
      try { window.localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      listeners.forEach((cb) => cb(lang));
    },
    onChange(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getCached(text, lang) {
      return cache[cacheKey(text, lang)] ?? null;
    },
    async translate(text, lang) {
      if (!text || lang === "ko") return text;
      const key = cacheKey(text, lang);
      if (cache[key]) return cache[key];
      try {
        const translated = await translateViaGoogle(text, lang);
        cache[key] = translated;
        persistCache();
        return translated;
      } catch (e1) {
        console.warn("Google 번역 실패, MyMemory로 재시도:", text, e1.message);
        try {
          const translated = await translateViaMyMemory(text, lang);
          cache[key] = translated;
          persistCache();
          return translated;
        } catch (e2) {
          console.warn("번역 실패, 원문 유지: \"" + text + "\" ->", e2.message);
          return text;
        }
      }
    },
  };
})();
