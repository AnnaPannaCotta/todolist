// async function loadUserProfile() {
//     const token = localStorage.getItem('token');
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert('Ви не авторизовані!');
//             window.location.href = '/'; // Перенаправляємо на головну сторінку
//             return;
//         }

//         const response = await fetch('http://localhost:5000/api/auth/profile', {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         const data = await response.json();
//         if (response.ok) {
//             // localStorage.setItem('token', data.token);  // Зберігаємо токен
//             // window.location.href = '/profile';
//             document.getElementById('main').textContent = data.username;
//             // Додати інші дані про користувача, якщо потрібно
//         } else {
//             alert(`Помилка: ${data.message}`);
//             window.location.href = '/'; // Перенаправляємо на головну сторінку
//         }
//     } catch (error) {
//         console.error('Помилка завантаження профілю:', error);
//     }
// }

// // Викликаємо функцію при завантаженні сторінки
// window.onload = loadUserProfile;
async function loadUserProfile() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Ви не авторизовані!');
            window.location.href = '/'; // Перенаправляємо на головну сторінку
            return;
        }

        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('main').textContent = data.username;
            // Додати інші дані про користувача, якщо потрібно
        } else {
            const errorData = await response.json();
            alert(`Помилка: ${errorData.message}`);
            window.location.href = '/'; // Перенаправляємо на головну сторінку
        }
    } catch (error) {
        console.error('Помилка завантаження профілю:', error);
    }
}

// Викликаємо функцію при завантаженні сторінки профілю
window.onload = loadUserProfile;