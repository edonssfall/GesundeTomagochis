const linedTextElement = document.querySelector('.lined-text');

function addLineThrough() {
    linedTextElement.style.textDecoration = 'line-through';
}

setTimeout(addLineThrough, 3000);

gsap.registerPlugin(ScrollTrigger);

let panels = gsap.utils.toArray(".section")

let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true,
        pinSpacing: false
    });
});

ScrollTrigger.create({
    snap: {
        snapTo: (progress, self) => {
            let panelStarts = tops.map(st => st.start), // an Array of all the starting scroll positions. We do this on each scroll to make sure it's totally responsive. Starting positions may change when the user resizes the viewport
                snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
            return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); // snapping requires a progress value, so convert the scroll position into a normalized progress value between 0 and 1
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
