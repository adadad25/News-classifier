async function saveFeedback(title, label) {
  const data = await chrome.storage.local.get("trainingData");
  const trainingData = data.trainingData || [];

  trainingData.push({ title, label });

  await chrome.storage.local.set({ trainingData });
}

async function loadFeedback() {
  const data = await chrome.storage.local.get("trainingData");
  return data.trainingData || [];
}
