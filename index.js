import { createCard } from "./assets/js/card.js";
import { checkPreferred, setColorScheme } from "./assets/js/theme.js";

const btnThemeSelect = document.getElementById("theme_select_button");
const contentWrapper = document.getElementById("content-wrapper");
const NavLinkList = document.getElementById("navlinks");
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

let navLinks;
let savedTheme = localStorage.getItem("theme");
let contentFilter = "Newbie";
let NavbarSetup = true;

onPageLoad();

function onPageLoad() {

    themeSetup();
    changeButtonIcon(localStorage.getItem("themeIcon"));

    btnThemeSelect.addEventListener('click', themeToggle);

    fetchData();
}


/* -------------------------Initial Setup------------------------- */

function themeSetup() {
    if (savedTheme) {   
        setColorScheme(savedTheme);
    }
    else {  
        if (window.matchMedia) {
            checkPreferred(mediaQuery);
            savedTheme = localStorage.getItem("theme");
        }
        else { // in case the browser does not support matchMedia...
            //TODO: Create a legacy version.
        }
    }
}

function navbarSetup(data){

   Object.keys(data).forEach(categoryName => {
        createNavLink(categoryName);
   });

    navLinks = document.querySelectorAll("#navlinks li");

    navLinks.forEach(navLink => {
            navLink.addEventListener('click',() => {
            onFilterSelect(navLink.innerText);
        } );
        navLink.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                onFilterSelect(navLink.innerText);
            }
        })
    });
}

function createNavLink(categoryName) {

    let navLink = document.createElement('li');
    navLink.innerText = categoryName;
    navLink.tabIndex = 0;
    navLink.setAttribute('name', categoryName);

    if (categoryName === contentFilter) {
        navLink.classList.add("active");
    }

    NavLinkList.appendChild(navLink);
}

function changeButtonIcon(iconName){
    btnThemeSelect.style.backgroundImage = `url("./assets/images/svg/${iconName}.svg")`;
}

/* -------------------------Data Fetching------------------------- */


async function fetchData() {
    try {
        const response = await fetch('./assets/json/challenges.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {

            if (NavbarSetup) {
                navbarSetup(data);
                NavbarSetup = false;
            }
            
            fillContentWrapper(data);
        }
        else {
            throw new Error('No data available or data is empty');
        }

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function fillContentWrapper(data) {
    try {
        const category = contentFilter;
    
        if (data[category] ) {

            data[category].forEach(cardData => {
                let card = createCard(cardData);
                contentWrapper.appendChild(card);
            });
        }
        else {
            throw new Error('Category does not exist');
        }
        
    } catch (error) {
        console.error("Error filling ContentWrapper:", error);
    }
    
}

/* ----------------------------Events---------------------------- */

function onFilterSelect(filter) {

    if (contentFilter != filter)
    {
        try {
            contentFilter = filter;

            navLinks.forEach(navLink => {
                if (navLink.classList.contains("active")) {
                    navLink.classList.remove("active");
                }
            })

            let activeNavLink = document.getElementsByName(filter);
            activeNavLink[0].classList.add("active");

            clearContent();
            fetchData();
        } catch (error) {
            console.error("No data exists for this filter:", error);
        }
    }
}

function clearContent() {
    try {
        contentWrapper.replaceChildren();

        /* contingency for legacy support */
        while (contentWrapper.firstChild) {
            contentWrapper.removeChild(contentWrapper.firstChild);
        }
    } catch (error) {
        console.error('Something went wrong while clearing ContentWrapper');
    }
}

function themeToggle() {
    try {
        if (savedTheme) {
            localStorage.getItem("theme") == "dark" ? setColorScheme("light") : setColorScheme("dark");
        }
        else {
            console.log("bruh");
        }
        changeButtonIcon(localStorage.getItem("themeIcon"));
        console.log(localStorage.getItem("themeIcon"));
    } catch (error) {
        console.error('Something went wrong while attempting to change website theme');
    }
}





