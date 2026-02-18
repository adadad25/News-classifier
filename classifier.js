async function classifyNews(title) {

  const text = title.toLowerCase();
  let score = 0;

  GOOD_WORDS.forEach(word => {
    if (text.includes(word)) score += 2;
  });

  BAD_WORDS.forEach(word => {
    if (text.includes(word)) score -= 2;
  });

  const weights = await buildWordWeights();

  text.split(/\s+/).forEach(word => {
    if (weights[word]) score += weights[word];
  });

  if (score > 1)
    return { label: "Good News", confidence: score };

  if (score < -1)
    return { label: "Bad News", confidence: Math.abs(score) };

  return { label: "Neutral", confidence: 1 };
}
