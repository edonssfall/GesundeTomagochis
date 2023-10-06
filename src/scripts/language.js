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

let currentLanguage = getCookie("language") || 'en',
    languages = {};

const languageChangeEvent = new CustomEvent('languageChanged', {
    detail: { language: currentLanguage }
});

document.getElementById('en-language').addEventListener('click', () => {
    currentLanguage = 'en';
    loadLanguage(currentLanguage);
});

document.getElementById('de-language').addEventListener('click', () => {
    currentLanguage = 'de';
    loadLanguage(currentLanguage);
});

function updateText() {
    const elementsToUpdate = document.querySelectorAll('[data-translate]');
    elementsToUpdate.forEach((element) => {
        const key = element.getAttribute('data-translate');
        if (languages[currentLanguage] && languages[currentLanguage][key]) {
            element.textContent = languages[currentLanguage][key];
        }
    });
}

function loadLanguage(language) {
    fetch(`./src/language/${language}.json`)
        .then((response) => response.json())
        .then((data) => {
            languages[language] = data;
            updateText();

            const placeholders = languages[language];
            document.getElementById('name').setAttribute('placeholder', placeholders.name_placeholder);
            document.getElementById('email').setAttribute('placeholder', placeholders.email_placeholder);
            document.getElementById('question').setAttribute('placeholder', placeholders.question_placeholder);
        })
        .catch((error) => {
            console.error('Error loading language:', error);
        });
    setCookie("language", language, 30);
    languageChangeEvent.detail.language = currentLanguage;
    document.dispatchEvent(languageChangeEvent);
}

loadLanguage(currentLanguage);
