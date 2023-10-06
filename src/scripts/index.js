$("#footer").load("footer.html");

const linedTextElement = document.querySelector('.lined-text'),
    stickMan = document.querySelector('.stick-man'),
    sections = gsap.utils.toArray(".section");

let tops = sections.map(section => ScrollTrigger.create({trigger: section, start: "top top"}))

document.addEventListener('DOMContentLoaded', function () {
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
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
