function renderPanel(data) {

  let panel = document.getElementById("news-panel");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "news-panel";
    document.body.appendChild(panel);
  }

  // ---- GROUP DATA ----
  const good = data.filter(d => d.label === "Good News");
  const bad = data.filter(d => d.label === "Bad News");
  const neutral = data.filter(d => d.label === "Neutral");

  panel.innerHTML = `
    <h3>News Intelligence</h3>

    ${buildSection("🟢 Good News", good)}
    ${buildSection("🔴 Bad News", bad)}
    ${buildSection("⚪ Neutral", neutral)}
  `;

  attachHandlers();
}

function buildSection(title, items) {

  if (!items.length) {
    return `<h4>${title} (0)</h4><p>No items found.</p>`;
  }

  return `
    <h4>${title} (${items.length})</h4>
    <table>
      <tr>
        <th>Headline</th>
        <th>Confidence</th>
        <th>Train</th>
      </tr>

      ${items.map(item => `
        <tr data-title="${item.title}">
          <td>${item.title}</td>
          <td>${item.confidence}</td>
          <td>
            <button data-label="Good News">👍</button>
            <button data-label="Bad News">👎</button>
            <button data-label="Neutral">😐</button>
          </td>
        </tr>
      `).join("")}
    </table>
  `;
}

function attachHandlers() {

  document.querySelectorAll("button[data-label]").forEach(btn => {

    btn.onclick = async e => {

      const row = e.target.closest("tr");
      const title = row.dataset.title;
      const label = btn.dataset.label;

      await saveFeedback(title, label);

      // visual confirmation
      btn.style.background = "#d4ffd4";
    };
  });

}
