async function loadUserProfile() {
    try {
        const token = localStorage.getItem('token');
        console.log('Токен із localStorage:', token); 
        if (!token) {
            alert('Ви не авторизовані!');
            window.location.href = '/';
            return;
        }

        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json(); // ✅ читаємо `json()` один раз

        if (!response.ok) {
            throw new Error(data.message || 'Помилка завантаження профілю');
        }

        document.getElementById('main').textContent = `Привіт, ${data.username}!`;
    } catch (error) {
        console.error('Помилка завантаження профілю:', error);
        alert('Недійсний токен, увійдіть ще раз.');
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}
// Викликаємо функцію при завантаженні сторінки
window.onload = loadUserProfile;