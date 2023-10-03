
document.addEventListener('DOMContentLoaded', function () {

    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

$("#footer").load("footer.html");
