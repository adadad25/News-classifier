let debounceTimer = null;
let lastRun = 0;

async function runAnalysis() {

  const now = Date.now();

  // prevent too frequent execution
  if (now - lastRun < 1500) return;

  lastRun = now;

  const newsItems = extractNewsItems();
  const results = [];

  for (const item of newsItems) {
    const result = await classifyNews(item.title);

    results.push({
      ...item,
      ...result
    });
  }

  renderPanel(results);
}

/* -----------------------------
   LIVE AUTO-DETECT MODE
-------------------------------- */

function startLiveObserver() {

  const observer = new MutationObserver(() => {

    clearTimeout(debounceTimer);

    // debounce prevents page lag
    debounceTimer = setTimeout(() => {
      runAnalysis();
    }, 800);

  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log("Live auto-detect enabled");
}

/* -----------------------------
   START EXTENSION
-------------------------------- */

window.addEventListener("load", () => {

  // first scan
  setTimeout(runAnalysis, 1200);

  // start watching page
  startLiveObserver();

});
