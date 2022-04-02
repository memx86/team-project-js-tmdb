import sprite from '../images/sprite.svg';

const refs = {
  header: document.querySelector('.header'),
  footer: document.querySelector('.footer'),
};

const BTN = {
  UP: 'up',
  DOWN: 'down',
  CLASS: 'btn-up',
  HIDDEN: 'is-hidden',
};

const observer = new IntersectionObserver(handleObserve, { threshold: 0 });

function createBtn(direction) {
  const btn = document.createElement('button');
  const data = direction === BTN.UP ? BTN.UP : BTN.DOWN;
  btn.setAttribute('data-direction', data);
  btn.setAttribute('aria-label', `Scroll page ${direction}`);
  btn.classList.add(`${BTN.CLASS}__btn`, BTN.HIDDEN);
  btn.innerHTML = `
    <svg class="${BTN.CLASS}__svg" width="32" height="32">
      <use href="${sprite}#icon-circle-${direction}"></use>
    </svg>
  `;
  return btn;
}

function renderBtns() {
  refs.upBtn = createBtn(BTN.UP);
  refs.downBtn = createBtn(BTN.DOWN);
  const container = document.createElement('div');
  container.classList.add(BTN.CLASS);
  container.appendChild(refs.upBtn);
  container.appendChild(refs.downBtn);
  document.querySelector('main').appendChild(container);
  container.addEventListener('click', handleClick);
}

function handleClick(e) {
  const target = e.target.dataset.direction ? e.target : e.target.closest('BUTTON');
  const direction = target?.dataset.direction;
  switch (direction) {
    case BTN.UP:
      refs.header.scrollIntoView();
      return;
    case BTN.DOWN:
      refs.footer.scrollIntoView();
      return;
    default:
      return;
  }
}

function hideBtn(target) {
  if (target === refs.header) {
    refs.upBtn.classList.add(BTN.HIDDEN);
  } else {
    refs.downBtn.classList.add(BTN.HIDDEN);
  }
}
function showBtn(target) {
  if (target === refs.header) {
    refs.upBtn.classList.remove(BTN.HIDDEN);
  } else {
    refs.downBtn.classList.remove(BTN.HIDDEN);
  }
}

function handleObserve(entries) {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      hideBtn(target);
    } else {
      showBtn(target);
    }
  });
}

function addUpBtn() {
  renderBtns();
  observer.observe(refs.header);
  observer.observe(refs.footer);
}

export default addUpBtn;
