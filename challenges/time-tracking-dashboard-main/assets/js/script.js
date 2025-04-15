let jsonCache;
const CACHE_TIME = 300000;
let lastFetchTime = 0;
const rb_default = 'Daily';

async function fetchData() {
    try {
        const now = Date.now();
        if (jsonCache && (now - lastFetchTime) < CACHE_TIME) {
            return jsonCache;
        }

        const response = await fetch('./assets/data/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        jsonCache = jsonData;
        lastFetchTime = now;
        return jsonData;
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await fetchData();
    
    if (jsonData) {
        createDashboard(jsonData);
    }
});

function createDashboard(jsonData) {

    //Filling in user data from JS to simulate real life scenario
    const personalInfoContainer = document.getElementById('user-info');
    const imgContainer = document.getElementById('img-container');
    const selector = document.getElementById('filter');
    const rb_text = ['Daily', 'Weekly', 'Monthly'];

    try {
        const img = document.createElement('img');
        img.src = './images/image-jeremy.png';
        img.alt = "Profile picture of the user.";
        img.id = "user-avatar"

        let divider = document.createElement('div');
        
        let reportFor = document.createElement('p');
        reportFor.textContent = "Report for";
        reportFor.id ="report-for";

        let userName = document.createElement('h2');
        userName.textContent = "Jeremy Robson";
        userName.id = "user-name";
        
        const filter_list = document.createElement('ul');
        for (let i = 0; i < rb_text.length; i++) {
            let list_item = document.createElement('li');
            let rb = document.createElement('input');

            rb.type = "radio";
            rb.id = rb_text[i];
            rb.name = "Filter";
            rb.value = rb_text[i];
            rb.classList.add('filter_button');
            if (rb_text[i] == rb_default) { rb.checked = true}
            rb.addEventListener('click', function() {rb_onclick.call(this)});

            let lbl = document.createElement('label');
            lbl.htmlFor = rb_text[i];
            lbl.innerText = rb_text[i];

            list_item.append(rb, lbl);
            filter_list.appendChild(list_item);
        }
        
        imgContainer.appendChild(img);
        divider.append(reportFor, userName);
        personalInfoContainer.appendChild(divider);
        selector.appendChild(filter_list);
    }
    catch (error) {
        console.error('User Profile creation error:', error);
    }

    // FIlling in the Time tracking cards
    const gridContainer = document.getElementById('gridcontainer');

    try {
        jsonData.forEach(data => {

            let gridContent = document.createElement('div');
            gridContent.className = "card flex";

            let cardHeaderContainer = document.createElement('div');
            cardHeaderContainer.className = `card-header card-header-${data.title.replace(/\s+/g, '').toLowerCase()}`;

            /*switch (data.title){
                case "Work":
                    //cardHeaderContainer.style.background = 'var(--clr-Red) url(./images/icon-work.svg) no-repeat top -0.6875rem right 1rem';
                    cardHeaderContainer.style.setProperty('background-color', 'var(--clr-Red)');
                    cardHeaderContainer.style.setProperty('background-image', 'url(./images/icon-work.svg)');
                    cardHeaderContainer.style.setProperty('background-repeat', 'no-repeat');
                    cardHeaderContainer.style.setProperty('background-position', 'top -0.6875rem right 1rem');
                    break;
                case "Play":
                    cardHeaderContainer.style.background = 'var(--clr-Blue-100) url(./images/icon-play.svg) no-repeat top -0.5rem right 1rem';
                    break;
                case "Study":
                    cardHeaderContainer.style.background = 'var(--clr-Red-200) url(./images/icon-study.svg) no-repeat top -0.6875rem right 1rem';
                    break;
                case "Exercise":
                    cardHeaderContainer.style.background = 'var(--clr-Green-200) url(./images/icon-exercise.svg) no-repeat top -0.2rem right 1rem';
                    break;
                case "Social":
                    cardHeaderContainer.style.background = 'var(--clr-Violet) url(./images/icon-social.svg) no-repeat top -0.8rem right 1rem';
                    break;
                case "Self Care":
                    cardHeaderContainer.style.background = 'var(--clr-Orange-200) url(./images/icon-self-care.svg) no-repeat top -0.6875rem right 1rem';
                    break;
            }*/

            let cardDataContainer = document.createElement('div');
            cardDataContainer.classList.add('card-body');
            cardDataContainer.id = data.title.replace(/\s+/g, '').toLowerCase();

            let cardBodyHeaderContainer = document.createElement('div');
            cardBodyHeaderContainer.classList.add('card-body-header');

            let cardHeader = document.createElement('h3');
            cardHeader.textContent = data.title;
            cardHeader.classList.add('card-title');

            let cardHeaderButton = document.createElement('button');
            cardHeaderButton.textContent = "...";
            cardHeaderButton.classList.add('btn_more');

            let divider2 = document.createElement('div');
            divider2.classList.add('card-body-content')

            let currentTime = document.createElement('h4');
            currentTime.classList.add('card-current-time');
            currentTime.textContent = `${data.timeframes.daily.current}hrs`;
            setTimeout(() => {currentTime.classList.add('fade-in')}, 500);

            let previousTime = document.createElement('p');
            previousTime.classList.add('card-previous-time');
            previousTime.textContent = `Last Week - ${data.timeframes.daily.previous}hrs`;
            setTimeout(() => {previousTime.classList.add('fade-in')}, 500);

            cardBodyHeaderContainer.append(cardHeader, cardHeaderButton);
            divider2.append(currentTime, previousTime);
            cardDataContainer.append(cardBodyHeaderContainer, divider2);
            gridContent.append(cardHeaderContainer, cardDataContainer);
            gridContainer.appendChild(gridContent);
        });
    }
    catch (error) {
        console.error('Something went wrong:', error);
    }

}

let rb_previous_click = rb_default;

async function rb_onclick() {
    const rb_checked = document.querySelector('input[name="Filter"]:checked');

    if (rb_previous_click && rb_previous_click === this.value) {return;}
    else {rb_previous_click = this.value;}

    const filter = this.value.toLowerCase();
    const jsonData = await fetchData();

    jsonData.forEach (data => {
        let targetId = data.title.replace(/\s+/g, '').toLowerCase();
        let targetCard = document.getElementById(targetId);
        let selectedData = data.timeframes[filter];
        let cardCurrentTime = targetCard.getElementsByClassName('card-current-time');
        let cardPreviousTime = targetCard.getElementsByClassName('card-previous-time');
    
        fadeIn(cardCurrentTime[0], `${selectedData.current}hrs`);
        fadeIn(cardPreviousTime[0], `Last Week - ${selectedData.previous}hrs`);
    });
}

function fadeIn (element, newText) {
    element.classList.remove('fade-in');

    setTimeout(() => {
        element.textContent = newText;
        element.classList.add('fade-in');
    }, 500);
}