const books = [
  {
    title: 'Hellhunter Chronicles: Wicks for Dead',
    status: 'published',
    cover: 'cover1.png',
    desc: `The city is sedating itself against the supernatural. "Sleep Candles"—a charitable miracle promising a dreamless night—have flooded the markets, masking the rot of the city with the scent of lavender and burnt iron. But while the righteous celebrate the peace and the wicked hide in the shadows, a cold, stagnant hunger is taking root in the cracks between them. It falls to a private investigator operating in the moral margins to notice the pattern. As the candle smoke thickens, the line between salvation and a cage begins to blur. To stop the coming harvest, Oakwood doesn't need a hero or a monster. It needs someone with enough grit to survive the middle path.`,
    apple: 'https://books.apple.com/us/book/hellhunter-chronicles-wicks-for-dead/id6759347674',
    amazon: 'https://us.amazon.com/gp/product/B0GPGZTYWG?ref_=dbs_m_mng_rwt_calw_tkin_0&storeType=ebooks&qid=1771795545&sr=1-5'
  },
  {
    title: 'Hellhunter Chronicles: Book Two',
    status: 'writing',
    cover: null,
    desc: 'Currently being written. Expect darker twists and deeper lore.',
    apple: '',
    amazon: ''
  },
  { title: 'Book Three', status: 'placeholder', cover: null, desc: 'Coming soon.', apple: '', amazon: '' },
  { title: 'Book Four',  status: 'placeholder', cover: null, desc: 'Coming soon.', apple: '', amazon: '' },
  { title: 'Book Five',  status: 'placeholder', cover: null, desc: 'Coming soon.', apple: '', amazon: '' },
  { title: 'Book Six',   status: 'placeholder', cover: null, desc: 'Coming soon.', apple: '', amazon: '' }
];

const coversEl     = document.getElementById('covers');
const detail       = document.getElementById('detail');
const detailCoverEl = document.getElementById('detail-cover');
const detailStatus  = document.getElementById('detail-status');
const detailTitle   = document.getElementById('detail-title');
const detailDesc    = document.getElementById('detail-desc');
const detailLinks   = document.getElementById('detail-links');

const statusLabel = { published: 'Published', writing: 'In progress', placeholder: 'Coming soon' };

function makeCoverEl(book, index) {
  const btn = document.createElement('button');
  btn.className = 'cover';
  btn.setAttribute('aria-label', book.title);
  btn.setAttribute('data-index', index);

  if (book.cover) {
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;
    img.className = 'cover-img';
    btn.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'cover-placeholder';
    ph.innerHTML = `<span class="num">${index + 1}</span><span class="label">${statusLabel[book.status]}</span>`;
    btn.appendChild(ph);
  }

  btn.addEventListener('click', () => showDetail(index));
  return btn;
}

function showDetail(index) {
  const book = books[index];

  detailCoverEl.innerHTML = '';
  if (book.cover) {
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;
    detailCoverEl.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'detail-cover-placeholder';
    detailCoverEl.appendChild(ph);
  }

  detailStatus.textContent = statusLabel[book.status];
  detailStatus.className   = `status-badge ${book.status}`;
  detailTitle.textContent  = book.title;
  detailDesc.textContent   = book.desc;

  detailLinks.innerHTML = '';
  if (book.apple) {
    const a = document.createElement('a');
    a.href = book.apple; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'btn-apple'; a.textContent = '📖  Apple Books';
    detailLinks.appendChild(a);
  }
  if (book.amazon) {
    const a = document.createElement('a');
    a.href = book.amazon; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'btn-amazon'; a.textContent = '🛒  Amazon';
    detailLinks.appendChild(a);
  }
  if (!book.apple && !book.amazon) {
    const s = document.createElement('span');
    s.className = 'no-links'; s.textContent = 'Not yet available for purchase.';
    detailLinks.appendChild(s);
  }

  detail.classList.add('hidden');
  requestAnimationFrame(() => {
    detail.classList.remove('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

books.forEach((b, i) => coversEl.appendChild(makeCoverEl(b, i)));

document.addEventListener('keydown', e => { if (e.key === 'Escape') detail.classList.add('hidden'); });
