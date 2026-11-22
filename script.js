const filters = document.querySelectorAll('.filter');
const cards = [...document.querySelectorAll('.project-card')];
const search = document.getElementById('projectSearch');
const empty = document.getElementById('emptyState');
let activeFilter = 'all';

function updateProjects() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const searchMatch = card.dataset.search.includes(query) || card.innerText.toLowerCase().includes(query);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  empty.hidden = visible !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  updateProjects();
}));
search.addEventListener('input', updateProjects);

const copyButton = document.getElementById('copyCode');
copyButton.addEventListener('click', async () => {
  const code = `// INNOVATIVE ROASTER — Arduino starter
const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}`;
  try {
    await navigator.clipboard.writeText(code);
    showToast('Code copied to clipboard!');
  } catch {
    showToast('Copy is unavailable in this browser. Select the code to copy it.');
  }
});
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}
document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
