async function loadUserProfile() {
    const token = localStorage.getItem('token');
    try {
        if (!token) {
            alert('Ви не авторизовані!');
            window.location.replace('/'); // Перенаправляємо на головну сторінку
            return;
        }

        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('main').textContent = data.username;
        } else {
            const errorData = await response.json();
            alert(`Помилка: ${errorData.message}`);
            window.location.replace('/');
        }
    } catch (error) {
        console.error('Помилка завантаження профілю:', error);
    }
}
// Викликаємо функцію при завантаженні сторінки
window.onload = loadUserProfile;