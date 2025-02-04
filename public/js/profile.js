async function loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Ви не авторизовані! Перенаправлення...');
        window.location.href = '/';
        return;
    }

    const response = await fetch('/api/user/profile', { 
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        alert('Помилка авторизації! Перезайдіть в систему.');
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
    }

    const userData = await response.json();
    document.getElementById('username').textContent = userData.username;
}

window.onload = loadProfile;