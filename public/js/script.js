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
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка входу:', error);
    }
}

document.getElementById('form-reg').addEventListener('submit', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    register(username, password);
});
