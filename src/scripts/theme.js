function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const themeToggle = document.getElementById('theme-toggle-checkbox'),
    body = document.body;

let currentTheme = getCookie("theme") || 'dark';

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        currentTheme = 'light';
    } else {
        currentTheme = 'dark';
    }
    checkTheme();
});

function checkTheme() {
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.checked = true;
    } else {
        currentTheme = 'light';
        currentTheme = 'dark';
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }
    setCookie("theme", currentTheme, 30);
}

checkTheme();
