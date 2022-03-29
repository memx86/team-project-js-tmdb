/**
 * Задать кнопке открытия модального окна аттрибут data-modal-open="[name]"
 * * Задать второй кнопке открытия модального окна data-modal-open="[name]-second"
 * * Задать backdrop модального окна аттрибуты data-modal="[name]", class="is-hidden"
 * * Задать кнопке закрытия модального окна аттрибут data-modal-close="[name]"
 * * Модальное окно закрывается по клику на кнопку закрытия, по клику в бэкдроп,
 * по нажатию клавиши "Esc"
 */
class Modal {
  constructor(name) {
    this.refs = {
      modal: document.querySelector(`[data-modal="${name}"]`),
      openBtn: document.querySelector(`[data-modal-open="${name}"]`),
      openBtnSecond: document.querySelector(`[data-modal-open="${name}-second"]`),
      closeBtn: document.querySelector(`[data-modal-close="${name}"]`),
    };
    this.refs.openBtn.addEventListener('click', this.onModalOpenBtnClick);
    this.refs.openBtnSecond?.addEventListener('click', this.onModalOpenBtnClick);
  }
  onModalOpenBtnClick = () => {
    this.openModal();
    this.refs.closeBtn.addEventListener('click', this.closeModal);
    this.refs.modal.addEventListener('click', this.onBackdropClick);
    document.addEventListener('keydown', this.onEscDown);
  };
  openModal = () => {
    this.refs.modal.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
  };
  closeModal = () => {
    this.refs.modal.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    this.refs.closeBtn.removeEventListener('click', this.closeModal);
    this.refs.modal.removeEventListener('click', this.onBackdropClick);
    document.removeEventListener('keydown', this.onEscDown);
  };
  onBackdropClick = e => {
    if (e.target !== this.refs.modal) return;
    this.closeModal();
  };
  onEscDown = e => {
    if (e.code !== 'Escape') return;
    this.closeModal();
  };
}
export { Modal };
