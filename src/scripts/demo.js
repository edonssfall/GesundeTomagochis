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


let scoreValue = document.getElementById('scoreValue'),
    scoreImage = document.getElementById('scoreImage'),
    mainImage = document.getElementById('mainImage'),
    demoBlock = document.getElementById('demoBlock'),
    enterBlock = document.getElementById('enterBlock'),
    tomagochiTitel = document.getElementById('tomagochiTitel'),
    tomagochiDescription = document.getElementById('tomagochiDescription'),
    urlParams = new URLSearchParams(window.location.search),
    urlImage = urlParams.get('demo'),
    imgPath = './src/img/';

let buttonsText = [],
    score = 0,
    tomagochiAlertTitel = [],
    tomagochisGeschichte = [],
    startImage = '',
    currentLanguage = getCookie("language") || 'en';

document.addEventListener('languageChanged', (event) => {
    currentLanguage = event.detail.language;
    if (urlImage === 'rauchen') {
        makeRauchenLanguage();
    } else {
        makeSpielLanguage();
    }
    nameButtons();
});

document.getElementById('minus10Button').addEventListener(
    'click', () => {
        score -= 10;
        updateScore();
        checkImage();
    });

document.getElementById('plus10Button').addEventListener(
    'click', () => {
        score += 10;
        updateScore();
        checkImage();
    });

document.getElementById('plus5Button').addEventListener(
    'click', () => {
        score += 5;
        updateScore();
        checkImage();
    });

document.getElementById('resetButton').addEventListener(
    'click', () => {
        score = 0;
        updateScore();
        checkImage();
    });

document.getElementById('closeModal').addEventListener(
    'click', () => {
        score = 0;
        updateScore();
        checkImage();
        $('#alertModal').modal('hide');
    }
)

function updateScore() {
    scoreValue.textContent = score;
}

function createImage() {
    if (urlImage) {
        if (urlImage === 'rauchen') {
            scoreImage.src = imgPath + 'rauchen/image0.jpg';
            scoreImage.classList.add('rauchen_img');
            mainImage.src = imgPath + 'smartWatch_upscaled.png';
            mainImage.style.width = "50%";
            makeRauchenLanguage();
        } else if (urlImage === 'spielen') {
            scoreImage.src = imgPath + 'spielen/image0.jpg';
            scoreImage.classList.add('spielen_img');
            mainImage.src = imgPath + 'bildschirm_upscaled.png';
            mainImage.style.width = "89%";
            makeSpielLanguage();
        } else {
            demoBlock.style.display = 'none';
            return;
        }
        nameButtons();
        enterBlock.style.display = 'none';
    } else {
        demoBlock.style.display = 'none';
    }
}

function makeSpielLanguage() {
    if (currentLanguage === 'de') {
        buttonsText = ['Lernen(+10)', 'Anschauen(+5)', 'Spielen(-10)'];
        tomagochiAlertTitel = ['Tomagochi ist gestorben', 'Tomagochi gratuliert Ihnen!!!'];
        tomagochisGeschichte = ['Ihr Tomagotchi ist in seinem unermüdlichen Streben nach stundenlangem Spielen am PC an seine Grenzen gestoßen. Die exzessive Bildschirmzeit und Vernachlässigung seiner Bedürfnisse haben zu seinem tragischen Ende geführt. Dies sollte uns daran erinnern, wie wichtig es ist, eine ausgewogene Balance zwischen virtuellem Vergnügen und der realen Welt zu finden. R.I.P., kleiner Freund.',
            "Herzlichen Glückwunsch! Du hast es geschafft, dich von exzessivem Spielen am PC zu befreien. Dies ist eine beeindruckende Leistung, die zeigt, dass du die Kontrolle über dein Leben zurückgewonnen hast. Deine Entschlossenheit und Willenskraft verdienen Anerkennung. Jetzt kannst du stolz auf dich sein und dein Leben in vollen Zügen genießen, ohne von dieser Sucht eingeschränkt zu werden. Mach weiter so und bleibe stark!"
        ];
    } else {
        buttonsText = ['Learn(+10)', 'Watch(+5)', 'Play(-10)'];
        tomagochiAlertTitel = ['Tomagotchi has died', 'Tomagotchi congratulates you!!!'];
        tomagochisGeschichte = ["Your Tomagotchi has reached its limits in its relentless pursuit of hours of PC gaming. Excessive screen time and neglect of its needs have led to its tragic demise. This should remind us of the importance of finding a balanced equilibrium between virtual enjoyment and the real world. R.I.P., little friend.",
            "Congratulations! You've managed to free yourself from excessive PC gaming. This is an impressive achievement that shows you've regained control of your life. Your determination and willpower deserve recognition. Now you can be proud of yourself and enjoy your life to the fullest without being restricted by this addiction. Keep it up and stay strong!"
        ];
    }
}

function makeRauchenLanguage() {
    if (currentLanguage === 'de') {
        buttonsText = ['Laufen(+10)', 'Spazieren(+5)', 'Rauchen(-10)'];
        tomagochiAlertTitel = ['Tomagochi ist gestorben', 'Tomagochi gratuliert Ihnen!!!'];
        tomagochisGeschichte = ['Ihr Tomagotchi hat den Punkt erreicht, an dem es nicht mehr weitergehen konnte. Die Sucht nach dem Rauchen hat ihm schwer zugesetzt, und trotz Ihrer Bemühungen, es gesund zu halten, hat das Rauchen letztendlich gesiegt. Es ist eine wichtige Erinnerung daran, wie gefährlich und zerstörerisch Rauchen sein kann, nicht nur für Menschen, sondern auch für unsere virtuellen Freunde. Möge es in Frieden ruhen.',
            "Herzlichen Glückwunsch! Du hast es geschafft, deine Rauchgewohnheiten erfolgreich zu überwinden. Dies ist eine beeindruckende Leistung, die zeigt, dass du die Kontrolle über dein Leben zurückgewonnen hast. Deine Entschlossenheit und Willenskraft verdienen Anerkennung. Jetzt kannst du stolz auf dich sein und dein Leben in vollen Zügen genießen, ohne von dieser Sucht eingeschränkt zu werden. Mach weiter so und bleibe stark!"
        ];
    } else {
        buttonsText = ['Run(+10)', 'Walk(+5)', 'Smoke(-10)'];
        tomagochiAlertTitel = ['Tomagotchi has died', 'Tomagotchi congratulates you!!!'];
        tomagochisGeschichte = ["Your Tomagotchi reached a point where it couldn't go on any longer. The addiction to smoking took a toll on it, and despite your efforts to keep it healthy, smoking ultimately prevailed. It's an important reminder of how dangerous and destructive smoking can be, not only for humans but also for our virtual friends. May it rest in peace.",
            "Congratulations! You've successfully overcome your smoking habits. This is an impressive achievement that shows you've regained control of your life. Your determination and willpower deserve recognition. Now you can be proud of yourself and enjoy your life to the fullest without being restricted by this addiction. Keep it up and stay strong!"
        ];
    }
}

function nameButtons() {
    const buttons = [
        plus10Button,
        plus5Button,
        minus10Button
    ];
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = buttonsText[i];
    }
}


function checkImage() {
    if (urlImage === 'rauchen') {
        scoreImage.src = imgPath + 'rauchen/';
    } else {
        scoreImage.src = imgPath + 'spielen/';
    }
    if (score > -10 && score < 10) {
        scoreImage.src += 'image0.jpg';
    } else if (score >= 100) {
        scoreImage.src += 'image100.jpg';
        tomagochiTitel.textContent = tomagochiAlertTitel[1];
        tomagochiDescription.textContent = tomagochisGeschichte[1];
        $('#alertModal').modal('show');
    } else if (score >= 10) {
        scoreImage.src += 'image10.jpg';
    } else if (score <= -250) {
        scoreImage.src += 'image-250.jpg';
        tomagochiTitel.textContent = tomagochiAlertTitel[0];
        tomagochiDescription.textContent = tomagochisGeschichte[0];
        $('#alertModal').modal('show');
    } else if (score <= -100) {
        scoreImage.src += 'image-100.jpg';
    } else if (score <= -10) {
        scoreImage.src += 'image-10.jpg';
    } else {
        scoreImage.src = startImage;
    }
}

$("#footer").load("footer.html");

createImage();
updateScore();
createImage();
