import './styles/style.scss'


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("leadModal");

    // Открытие: все внешние .btn--primary (которые НЕ внутри модалки)
    document.querySelectorAll('.btn--primary').forEach(btn => {
        if (!btn.closest('.modal')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        }
    });

    // Закрытие по overlay и крестику
    modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-modal-close], .modal__overlay')) {
            modal.classList.remove('active');
        }
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
});