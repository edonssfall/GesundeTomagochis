$("#footer").load("footer.html");

const scoreValue = document.getElementById('scoreValue'),
    scoreImage = document.getElementById('scoreImage'),
    mainImage = document.getElementById('mainImage'),
    demoBlock = document.getElementById('demoBlock'),
    enterBlock = document.getElementById('enterBlock'),
    urlParams = new URLSearchParams(window.location.search),
    urlImage = urlParams.get('demo'),
    startImage = '';

let buttonsText = [],
    score = 0,
    imgPath = './src/img/';

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

function updateScore() {
    scoreValue.textContent = score;
}

function createImage() {
    if (urlImage) {
        if (urlImage === 'rauchen') {
            scoreImage.src = imgPath + 'rauchen/image0.jpg';
            scoreImage.classList.add('rauchen_img')
            mainImage.src = imgPath + 'smartWatch.jpg';
            mainImage.style.width = "50%"
            buttonsText = ['Laufen(+10)', 'Spazieren(+5)', 'Rauchen(-10)'];
        } else if (urlImage === 'spielen') {
            scoreImage.src = imgPath + 'spielen/image0.jpg';
            scoreImage.classList.add('spielen_img')
            mainImage.src = imgPath + 'bildschirm.jpg'
            mainImage.style.width = "89%"
            buttonsText = ['Lernen(+10)', 'Anschauen(+5)', 'Spielen(-10)']
        } else {
            demoBlock.style.display = 'none';
            return;
        }
        const buttons = [
            plus10Button,
            plus5Button,
            minus10Button
        ];
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = buttonsText[i];
        }
        enterBlock.style.display = 'none';
    } else {
        demoBlock.style.display = 'none';
    }
}

function checkImage() {
    if (urlImage === 'rauchen') {
        scoreImage.src = imgPath + 'rauchen/'
    } else {
        scoreImage.src = imgPath + 'spielen/'
    }
    if (score > -10 && score < 10) {
        scoreImage.src += 'image0.jpg'
    } else if (score >= 100) {
        scoreImage.src += 'image100.jpg';
    } else if (score >= 10) {
        scoreImage.src += 'image10.jpg';
    } else if (score <= -250) {
        scoreImage.src += 'image-250.jpg'
    } else if (score <= -100) {
        scoreImage.src += 'image-100.jpg'
    } else if (score <= -10) {
        scoreImage.src += 'image-10.jpg'
    } else {
        scoreImage.src = startImage;
    }
}

createImage();
updateScore();
createImage();
