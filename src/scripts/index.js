const linedTextElement = document.querySelector('.lined-text');

function addLineThrough() {
    linedTextElement.style.textDecoration = 'line-through';
}

setTimeout(addLineThrough, 3000);

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".section")

let tops = sections.map(section => ScrollTrigger.create({trigger: section, start: "top top"}));

sections.forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: () => section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false
    });
});

ScrollTrigger.create({
    snap: {
        snapTo: (progress, self) => {
            let sectionStarts = tops.map(st => st.start),
                snapScroll = gsap.utils.snap(sectionStarts, self.scroll());
            return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
        },
        duration: 0.5
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

$("#footer").load("footer.html");
