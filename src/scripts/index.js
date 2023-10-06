const linedTextElement = document.querySelector('.lined-text'),
    stickMan = document.querySelector('.stick-man'),
    sections = gsap.utils.toArray(".section"),
    themeToggle = document.getElementById('theme-toggle-checkbox');

let tops = sections.map(section => ScrollTrigger.create({trigger: section, start: "top top"})),
    currentLanguage = 'de',
    languages = {};

document.addEventListener('DOMContentLoaded', function () {

    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

document.getElementById('en-language').addEventListener('click', () => {
    currentLanguage = 'en';
    loadLanguage(currentLanguage);
});

document.getElementById('de-language').addEventListener('click', () => {
    currentLanguage = 'de';
    loadLanguage(currentLanguage);
});

function addLineThrough() {
    linedTextElement.style.textDecoration = 'line-through';
}

function hideLineThrough() {
    linedTextElement.style.textDecoration = 'none';
}

function apearStickMan() {
    stickMan.style.display = 'block';
}

function hideStickMan() {
    stickMan.style.display = 'none';
}

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
}

gsap.registerPlugin(ScrollTrigger);

sections.forEach((section, i) => {
    const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: () => section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false,
    });
});

ScrollTrigger.create({
    snap: {
        snapTo: (progress, self) => {
            let sectionStarts = tops.map(st => st.start),
                snapScroll = gsap.utils.snap(sectionStarts, self.scroll());
            return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
        },
        duration: 0.5,
    }
});

ScrollTrigger.create({
    trigger: "#section-2",
    start: "top center",
    onToggle: self => {
        if (self.isActive) {
            setTimeout(apearStickMan, 2000);
        } else {
            hideStickMan();
        }
    },
});

ScrollTrigger.create({
    trigger: "#section-0",
    start: "top center",
    onToggle: self => {
        if (self.isActive) {
            setTimeout(addLineThrough, 2000);
        } else {
            hideLineThrough();
        }
    },
});

$("#footer").load("footer.html");

loadLanguage(currentLanguage);
