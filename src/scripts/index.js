let linedTextElement = document.querySelector('.lined-text');
let stickMan = document.querySelector('.stick-man');

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

let sections = gsap.utils.toArray(".section");

let tops = sections.map(section => ScrollTrigger.create({trigger: section, start: "top top"}));

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
    onEnter: self => {
        setTimeout(apearStickMan, 2000);
    },
    onEnterBack: self => {
        setTimeout(apearStickMan, 2000);
    },
    onLeave: self => {
        hideStickMan();
    },
    onLeaveBack: self => {
        hideStickMan();
    },
});

ScrollTrigger.create({
    trigger: "#section-0",
    start: "top center",
    onEnter: self => {
        setTimeout(addLineThrough, 2000);
    },
    onEnterBack: self => {
        setTimeout(addLineThrough, 2000);
    },
    onLeave: self => {
        hideLineThrough();
    },
    onLeaveBack: self => {
        hideLineThrough();
    },
});

document.addEventListener('DOMContentLoaded', function () {

    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

$("#footer").load("footer.html");