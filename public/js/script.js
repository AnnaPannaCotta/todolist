// Реєстрація користувача
async function register(username, password) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert('Реєстрація успішна!');
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка реєстрації:', error);
    }
}

// Вхід користувача
async function login(username, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Вхід успішний!');
            localStorage.setItem('token', data.token); // Зберігаємо токен
            loadProfile();
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка входу:', error);
    }
}

// Завантаження профілю користувача
async function loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Ви не авторизовані. Увійдіть, будь ласка.');
        return;
    }

    try {
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const html = await response.text();
            document.body.innerHTML = html; // Відображення сторінки профілю
        } else {
            const errorData = await response.json();
            alert(`Помилка завантаження профілю: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Помилка завантаження профілю:', error);
    }
}

document.getElementById('form-reg').addEventListener('submit', (event) => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Визначаємо, яку кнопку було натиснуто
    const action = event.submitter.id; // Отримуємо `id` кнопки
    if (action === 'register-btn') {
        register(username, password);
    } else if (action === 'login-btn') {
        login(username, password);
    }
});



// // Реєстрація користувача
// async function register(username, password) {
//     try {
//         const response = await fetch('/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             alert('Реєстрація успішна!');
//         } else {
//             alert(`Помилка: ${data.message}`);
//         }
//     } catch (error) {
//         console.error('Помилка реєстрації:', error);
//     }
// }

// // Вхід користувача
// async function login(username, password) {
//     try {
//         const response = await fetch('/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await response.json();
//         if (response.ok) {
//             alert('Вхід успішний!');
//             localStorage.setItem('token', data.token); // Зберігаємо токен
//         } else {
//             alert(`Помилка: ${data.message}`);
//         }
//     } catch (error) {
//         console.error('Помилка входу:', error);
//     }
// }

// document.getElementById('form-reg').addEventListener('submit', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     register(username, password);
// });

// document.getElementById('form-ent').addEventListener('submit', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     login(username, password);
// });
