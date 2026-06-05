/* ==========================================================================
   Скрипты для лендинга проекта «Дела амурные»
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобильное меню (бургер)
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            
            // Анимация иконки бургера
            const spans = burgerMenu.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Закрытие при клике по ссылке в мобильном меню
        mobileLinks.forEach(link => {
            mobileLinks && link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const spans = burgerMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 2. Аккордеон "Какие папки будем открывать"
    const accordions = document.querySelectorAll('.folder-accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        const content = acc.querySelector('.accordion-content');

        if (header && content) {
            header.addEventListener('click', () => {
                const isActive = acc.classList.contains('active');

                // Закрываем все другие аккордеоны (опционально, но делает интерфейс чище)
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc) {
                        otherAcc.classList.remove('active');
                        const otherContent = otherAcc.querySelector('.accordion-content');
                        if (otherContent) otherContent.style.maxHeight = '0';
                    }
                });

                // Переключаем текущий
                if (isActive) {
                    acc.classList.remove('active');
                    content.style.maxHeight = '0';
                } else {
                    acc.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // Открываем первый аккордеон по умолчанию для наглядности
    if (accordions.length > 0) {
        const firstAcc = accordions[0];
        firstAcc.classList.add('active');
        const firstContent = firstAcc.querySelector('.accordion-content');
        if (firstContent) {
            // Небольшая задержка, чтобы стили успели примениться
            setTimeout(() => {
                firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            }, 100);
        }
    }

    // 3. Форма записи на встречу
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Извлечение полей
            const name = document.getElementById('bookingName').value.trim();
            const phone = document.getElementById('bookingPhone').value.trim();
            const seats = document.getElementById('bookingSeats').value;
            const comment = document.getElementById('bookingComment').value.trim();

            if (!name || !phone) {
                alert('Пожалуйста, заполните обязательные поля: Имя и Телефон.');
                return;
            }

            // Имитация отправки
            console.log('Отправка заявки на участие:', { name, phone, seats, comment });

            // Скрываем форму и показываем сообщение об успехе
            const formElements = bookingForm.querySelector('.form-element-container');
            const successMsg = bookingForm.querySelector('.success-message');
            
            if (formElements && successMsg) {
                formElements.classList.add('hidden');
                successMsg.classList.add('active');
                
                // Прокрутка к началу формы, чтобы увидеть сообщение
                bookingForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // 4. Форма анонимного вопроса
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Извлечение полей
            const questionText = document.getElementById('questionText').value.trim();
            const questionName = document.getElementById('questionName').value.trim();
            const questionContact = document.getElementById('questionContact').value.trim();

            if (!questionText) {
                alert('Пожалуйста, напишите ваш вопрос.');
                return;
            }

            // Имитация отправки
            console.log('Отправка анонимного вопроса:', { questionText, questionName, questionContact });

            // Скрываем форму и показываем сообщение об успехе
            const formElements = questionForm.querySelector('.form-element-container');
            const successMsg = questionForm.querySelector('.success-message');

            if (formElements && successMsg) {
                formElements.classList.add('hidden');
                successMsg.classList.add('active');
                
                // Прокрутка к началу формы
                questionForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // 5. Обработка клика по кнопкам, ведущим на формы с автоматическим выбором кол-ва мест или фокусом
    const actionButtons = document.querySelectorAll('[data-scroll-to]');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-scroll-to');
            const targetEl = document.getElementById(targetId);
            
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });

                // Если кнопка передает определенный тип билета
                const ticketType = btn.getAttribute('data-ticket-type');
                const seatsSelect = document.getElementById('bookingSeats');
                
                if (ticketType && seatsSelect) {
                    if (ticketType === '1') {
                        seatsSelect.value = '1';
                    } else if (ticketType === '2') {
                        seatsSelect.value = '2';
                    } else if (ticketType === '4') {
                        seatsSelect.value = 'абонемент';
                    }
                }
            }
        });
    });

    // 6. Анимация появления элементов при прокрутке (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Фоллбек для старых браузеров
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }
});
