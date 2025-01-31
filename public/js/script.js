// Реєстрація користувача
async function register(username, password) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
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
            console.log('Вхід успішний! Збереження токена:', data.token);
            localStorage.setItem('token', data.token);
            console.log('Перенаправлення на profile.html');
            window.location.href = '/profile';
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка входу:', error);
    }
}

// Обробник форми

document.getElementById('form-reg').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Визначаємо, яку кнопку натиснули
    const action = event.submitter?.id; // `event.submitter` працює тільки для кнопок всередині <form>

    if (action === 'register-btn') {
        register(username, password);
    } else if (action === 'login-btn') {
        login(username, password);
    }
});