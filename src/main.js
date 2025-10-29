import './styles/style.scss'

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("leadModal");

    // ======== Логика открытия и закрытия модалки ========
    document.querySelectorAll('.btn--primary').forEach(btn => {
        if (!btn.closest('.modal')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-modal-close], .modal__overlay')) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });

    // ======== Formspree (AJAX-отправка без редиректа) ========
    const form = modal.querySelector('form'); // находим форму внутри модалки
    const status = document.createElement('p');
    status.className = 'modal__status';
    form.appendChild(status);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        status.textContent = "Отправляем...";

        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = "Спасибо! Заявка отправлена ✅";
                form.reset();

                // Закрыть модалку через 2 секунды
                setTimeout(() => {
                    modal.classList.remove('active');
                    status.textContent = ""; // очищаем текст
                }, 2000);
            } else {
                status.textContent = "Ошибка при отправке 😕";
            }
        } catch (error) {
            status.textContent = "Сеть недоступна 😬";
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".user-form__body");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // не даём странице перезагрузиться

            const formData = new FormData(form);
            const submitButton = form.querySelector(".user-form__button");

            submitButton.disabled = true;
            submitButton.textContent = "Отправка...";

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { Accept: "application/json" },
                });

                if (response.ok) {
                    // очищаем форму
                    form.reset();
                    submitButton.textContent = "Отправлено ✅";
                } else {
                    submitButton.textContent = "Ошибка 😕";
                    console.error("Ошибка отправки:", response.statusText);
                }
            } catch (error) {
                submitButton.textContent = "Ошибка 😕";
                console.error("Ошибка сети:", error);
            }

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Отправить";
            }, 3000);
        });
    }
});

