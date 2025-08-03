// samarra-footer.js

let hasRun = false;
function init() {
  if (hasRun) return;
  hasRun = true;

  console.log("[Samarra] JS Init");

  // Remove mm:ss from titles
  document.querySelectorAll('.lesson-title, .summary-title').forEach(el => {
    el.textContent = el.textContent.replace(/\d{1,2}:\d{2}/g, '').trim();
  });

  // Add duration pill
  document.querySelectorAll('.summary-item').forEach(item => {
    const title = item.querySelector('.summary-title');
    const text = title?.textContent;
    const match = text?.match(/(\d{1,2}:\d{2})/);
    if (match && !item.querySelector('.duration-pill')) {
      const pill = document.createElement('div');
      pill.className = 'duration-pill';
      pill.textContent = match[1];
      item.querySelector('.summary-content')?.prepend(pill);
    }
  });
}

function observe() {
  const mo = new MutationObserver(() => init());
  mo.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    observe();
  });
} else {
  init();
  observe();
}
