const transcriptEl = document.getElementById('transcript');
const analyzeBtn = document.getElementById('analyzeBtn');
const sampleBtn = document.getElementById('sampleBtn');
const clearBtn = document.getElementById('clearBtn');
const results = document.getElementById('results');

const buckets = {
  idea: document.getElementById('ideaList'),
  feature: document.getElementById('featureList'),
  story: document.getElementById('storyList'),
  tech: document.getElementById('techList'),
};

const sampleTranscript = `User: Build me a habit tracking app with reminders and streaks.
Assistant: Great — should users sign in?
User: Yes, use Google auth.
Assistant: Do you want analytics?
User: Yes, weekly charts and completion rates.
User: It should work on mobile first.
Assistant: I'll use React + Firebase.`;

const rules = [
  { key: 'feature', test: /(feature|include|support|should have|need|must|reminder|dashboard|chart|payment|auth|login|signup|search)/i },
  { key: 'story', test: /(as a|user can|i want|allow me|so that)/i },
  { key: 'tech', test: /(react|next|vue|svelte|node|express|firebase|supabase|postgres|mongodb|api|oauth|typescript|tailwind)/i },
];

function classify(line) {
  for (const rule of rules) {
    if (rule.test.test(line)) return rule.key;
  }
  return 'idea';
}

function cleanLine(line) {
  return line
    .replace(/^(user|assistant)\s*:\s*/i, '')
    .replace(/^[-*]\s*/, '')
    .trim();
}

function renderList(el, items) {
  el.innerHTML = '';
  if (!items.length) {
    el.innerHTML = '<li>None detected yet.</li>';
    return;
  }
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

analyzeBtn.addEventListener('click', () => {
  const lines = transcriptEl.value
    .split('\n')
    .map(cleanLine)
    .filter(Boolean);

  const grouped = { idea: [], feature: [], story: [], tech: [] };
  lines.forEach((line) => grouped[classify(line)].push(line));

  renderList(buckets.idea, grouped.idea.slice(0, 8));
  renderList(buckets.feature, grouped.feature.slice(0, 12));
  renderList(buckets.story, grouped.story.slice(0, 10));
  renderList(buckets.tech, grouped.tech.slice(0, 10));

  results.classList.remove('hidden');
});

sampleBtn.addEventListener('click', () => {
  transcriptEl.value = sampleTranscript;
});

clearBtn.addEventListener('click', () => {
  transcriptEl.value = '';
  results.classList.add('hidden');
});
