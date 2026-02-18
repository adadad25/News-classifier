function extractNewsItems() {

  const candidates = [];
  const seen = new Set();

  // ---------- STRATEGY 1: HEADLINES ----------
  document.querySelectorAll("h1, h2, h3").forEach(el => {
    addCandidate(el.innerText);
  });

  // ---------- STRATEGY 2: ARTICLE LINKS ----------
  document.querySelectorAll("a").forEach(a => {
    const text = a.innerText.trim();

    if (text.length > 30 && text.length < 200) {
      addCandidate(text);
    }
  });

  // ---------- STRATEGY 3: ARTICLE TAGS ----------
  document.querySelectorAll("article").forEach(article => {
    const text = article.innerText.split("\n")[0];
    addCandidate(text);
  });

  // ---------- STRATEGY 4: COMMON NEWS CONTAINERS ----------
  document.querySelectorAll("div, span").forEach(el => {

    const text = el.innerText?.trim();

    if (!text) return;

    // only short headline-like text
    if (text.length > 30 && text.length < 160) {
      addCandidate(text);
    }

  });

  function addCandidate(text) {
    if (!text) return;

    const clean = text.replace(/\s+/g, " ").trim();

    if (
      clean.length < 25 ||
      clean.length > 200 ||
      seen.has(clean)
    ) return;

    seen.add(clean);

    candidates.push({
      title: clean,
      source: window.location.hostname
    });
  }

  // limit to prevent huge pages freezing
  return candidates.slice(0, 40);
}
