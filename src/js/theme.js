import { themeStorage } from './services';
const refs = {
  root: document.querySelector(':root'),
  button: document.querySelector('.theme'),
  light: document.querySelector('[data-theme="light"]'),
  dark: document.querySelector('[data-theme="dark"]'),
};
const THEME = {
  SCHEME: 'color-scheme',
  LIGHT: 'light',
  DARK: 'dark',
};

function loadTheme(theme) {
  if (theme === THEME.LIGHT) {
    refs.light.classList.add('active');
    refs.dark.classList.remove('active');
  } else {
    refs.dark.classList.add('active');
    refs.light.classList.remove('active');
  }
  refs.root.setAttribute(THEME.SCHEME, theme);
}

function getCurrentTheme() {
  const systemTheme = window.matchMedia(`(prefers-${THEME.SCHEME}: ${THEME.LIGHT})`).matches
    ? THEME.LIGHT
    : THEME.DARK;
  const savedTheme = themeStorage.get();
  return savedTheme ? savedTheme : systemTheme;
}

function handleClick() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
  themeStorage.save(newTheme);
  loadTheme(newTheme);
}

function getInitialTheme() {
  const theme = getCurrentTheme();
  loadTheme(theme);
}

export default function handleTheme() {
  refs.button.addEventListener('click', handleClick);
  window.addEventListener('load', getInitialTheme);
}
