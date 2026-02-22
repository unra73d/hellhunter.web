const books = [
  {
    title: 'Book One: The Beginning',
    status: 'published',
    desc: 'The first book in the series — an introduction to the world and characters.',
    apple: 'https://books.apple.com',
    amazon: 'https://www.amazon.com'
  },
  {
    title: 'Book Two: In Progress',
    status: 'writing',
    desc: 'Currently being written. Expect darker twists and deeper lore.',
    apple: '',
    amazon: ''
  },
  {title: 'Book Three', status: 'placeholder', desc: 'Coming soon.', apple: '', amazon: ''},
  {title: 'Book Four', status: 'placeholder', desc: 'Coming soon.', apple: '', amazon: ''},
  {title: 'Book Five', status: 'placeholder', desc: 'Coming soon.', apple: '', amazon: ''},
  {title: 'Book Six', status: 'placeholder', desc: 'Coming soon.', apple: '', amazon: ''}
];

const coversEl = document.getElementById('covers');
const detail = document.getElementById('detail');
const detailCover = document.getElementById('detail-cover');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailLinks = document.getElementById('detail-links');

function makeCoverEl(book, index){
  const el = document.createElement('button');
  el.className = 'cover ' + (book.status === 'published' ? 'published' : book.status === 'writing' ? 'writing' : 'placeholder');
  el.setAttribute('aria-pressed','false');
  el.setAttribute('data-index',index);
  el.innerHTML = `<span class="title">${book.title}</span>`;
  el.addEventListener('click',()=> showDetail(index));
  return el;
}

function showDetail(index){
  const book = books[index];
  // cover visual
  detailCover.style.background = book.status === 'published' ? 'linear-gradient(180deg,#0b5fff,#003bb8)' : book.status === 'writing' ? 'linear-gradient(180deg,#ff8a00,#ff5500)' : '#d2d2d2';
  detailTitle.textContent = book.title + (book.status==='published' ? ' — Published' : book.status==='writing' ? ' — In progress' : '');
  detailDesc.textContent = book.desc;
  // links
  detailLinks.innerHTML = '';
  if(book.apple){
    const a = document.createElement('a'); a.href = book.apple; a.target='_blank'; a.rel='noopener'; a.textContent='Apple Books'; detailLinks.appendChild(a);
  }
  if(book.amazon){
    const b = document.createElement('a'); b.href = book.amazon; b.target='_blank'; b.rel='noopener'; b.textContent='Amazon'; b.className='secondary'; detailLinks.appendChild(b);
  }
  if(!book.apple && !book.amazon){
    const span = document.createElement('span'); span.textContent='No purchase links available.'; detailLinks.appendChild(span);
  }
  detail.classList.remove('hidden');
  // scroll into view on small screens
  detail.scrollIntoView({behavior:'smooth',block:'start'});
}

// render covers
books.forEach((b,i)=> coversEl.appendChild(makeCoverEl(b,i)));

// click outside to close detail
document.addEventListener('click',(e)=>{
  if(!detail.contains(e.target) && !coversEl.contains(e.target)){
    detail.classList.add('hidden');
  }
});

// keyboard: close on Esc
document.addEventListener('keydown',e=>{ if(e.key==='Escape') detail.classList.add('hidden'); });
