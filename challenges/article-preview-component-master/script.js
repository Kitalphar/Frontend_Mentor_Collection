const viewportWidth = window.innerWidth;
const btnShare = document.getElementById("sharebutton");
const svgShare = document.getElementById("svgPath");
const originalFill = svgShare.getAttribute('fill');
const socialBubble = document.getElementById('socialbubble');
const diamond = document.getElementById('diamond');



btnShare.addEventListener('mouseenter', () => {

    let computedStyle = getComputedStyle(socialBubble);
    let currentDisplay = computedStyle.display;

    if (currentDisplay === "none") {
        svgShare.setAttribute('fill','var(--clr-bg-card)');
        btnShare.style.backgroundColor = "var(--clr-neutral-700)";
    }
    else {
        svgShare.setAttribute('fill',originalFill);
        btnShare.style.backgroundColor = "var(--clr-primary)";
    }
});

btnShare.addEventListener('mouseleave', () => {

    let computedStyle = getComputedStyle(socialBubble);
    let currentDisplay = computedStyle.display;

    if (currentDisplay === "none") {
        svgShare.setAttribute('fill', originalFill);
        btnShare.style.backgroundColor = "var(--clr-primary)" ;
    }
    else {
        svgShare.setAttribute('fill','var(--clr-bg-card)');
        btnShare.style.backgroundColor = "var(--clr-secondary)";
    }
    
});

btnShare.addEventListener('mousedown', () => {
    btnShare.style.transform = 'scale(0.97)';
});

btnShare.addEventListener('mouseup', () => {
    btnShare.style.transform = 'scale(1)';
});

btnShare.addEventListener('keydown', (e) => {

    e.preventDefault();
    e.stopPropagation();

    if (e.key === ' ' || e.key === 'Enter') {
        const clickEvent = new MouseEvent('click', {bubbles: true});
        btnShare.dispatchEvent(clickEvent);
    }
});

btnShare.addEventListener("click", Socials);

function Socials () {

    let computedStyle = getComputedStyle(socialBubble);
    let currentDisplay = computedStyle.display;

    /* It seems viewportWidth doesn't update in realtime which results in some
        weirdness if the page is not reloaded....not sure how to fix atm */
    if (viewportWidth < 900 ) {

        if (currentDisplay === "none") {
            socialBubble.style.display = "flex";
            socialBubble.style.visibility = "visible";
            
            svgShare.setAttribute('fill','var(--clr-bg-card)');
            btnShare.style.backgroundColor = ('var(--clr-secondary)');
            btnShare.style.top = "0.6rem";
        }
        else {
            socialBubble.style.display = "none";
            socialBubble.style.visibility = "hidden";
            
            svgShare.setAttribute('fill',originalFill);
            btnShare.style.backgroundColor = ('var(--clr-primary)');
            btnShare.style.top = 0;
        }
    }
    else {

        if (currentDisplay === "none") {
            socialBubble.style.display = "flex";
            socialBubble.style.visibility = "visible";
            diamond.style.display= "block";
            diamond.style.visibility = 'visible';
        }
        else {
            socialBubble.style.display = "none";
            socialBubble.style.visibility = "hidden";
            diamond.style.display= "none";
            diamond.style.visibility = 'hidden';
        }
    }
}