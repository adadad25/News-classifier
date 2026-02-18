async function buildWordWeights() {
  const feedback = await loadFeedback();
  const weights = {};

  feedback.forEach(item => {
    const words = item.title.toLowerCase().split(/\s+/);

    words.forEach(word => {
      if (!weights[word]) weights[word] = 0;

      if (item.label === "Good News") weights[word] += 1;
      if (item.label === "Bad News") weights[word] -= 1;
    });
  });

  return weights;
}
