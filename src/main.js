import './styles/style.scss'


const modal = document.getElementById("leadModal");
const openBtns = document.querySelectorAll(".btn--primary");
const closeBtn = modal.querySelector(".modal__close");
const overlay = modal.querySelector(".modal__overlay");

// открыть на любую кнопку с классом .btn--primary
openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.classList.add("active");
    });
});

// закрыть
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});
overlay.addEventListener("click", () => {
    modal.classList.remove("active");
});