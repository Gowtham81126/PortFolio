const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const projectModal = document.querySelector('#project-modal');
const imageModal = document.querySelector('#image-modal');
const expandedImage = document.querySelector('#expanded-image');
const projectCard = document.querySelector('[data-project-card]');
let lastTrigger = null;

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}
function openModal(modal, trigger) {
  lastTrigger = trigger || document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('button').focus();
}
function closeModal(modal) {
  modal.hidden = true;
  if (projectModal.hidden && imageModal.hidden) document.body.classList.remove('modal-open');
  lastTrigger?.focus();
}

menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
projectCard.addEventListener('click', (event) => { if (!event.target.closest('a')) openModal(projectModal, projectCard); });
projectCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(projectModal, projectCard); }
});
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => closeModal(projectModal)));
document.querySelectorAll('[data-close-image]').forEach((button) => button.addEventListener('click', () => closeModal(imageModal)));
projectModal.addEventListener('click', (event) => { if (event.target === projectModal) closeModal(projectModal); });
imageModal.addEventListener('click', (event) => { if (event.target === imageModal) closeModal(imageModal); });
document.querySelectorAll('.gallery-image').forEach((button) => button.addEventListener('click', () => {
  expandedImage.src = button.dataset.imageSrc;
  expandedImage.alt = button.dataset.imageAlt;
  openModal(imageModal, button);
}));
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!imageModal.hidden) closeModal(imageModal);
  else if (!projectModal.hidden) closeModal(projectModal);
  else if (!mobileMenu.hidden) setMenu(false);
});
document.querySelector('#current-year').textContent = new Date().getFullYear();
