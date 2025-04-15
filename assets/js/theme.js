const rootStyles = getComputedStyle(document.documentElement);

const bgColorLight = rootStyles.getPropertyValue('--bg-color-light');
const bgContentLight = rootStyles.getPropertyValue('--bg-content-light');
const textColorLight = rootStyles.getPropertyValue('--text-color-light');

const bgColorDark = rootStyles.getPropertyValue('--bg-color-dark');
const bgContentDark = rootStyles.getPropertyValue('--bg-content-dark');
const textColorDark = rootStyles.getPropertyValue('--text-color-dark');

const accentColor = rootStyles.getPropertyValue('--accent-color');



export function checkPreferred(mediaQuery) {
    try {
        if (mediaQuery.matches) {
            setLocalStorageDark();
        } 
        else {
            setLocalStorageLight();
        }
    } catch (error) {
        console.error("Something went wrong while selecting color schemes", error);
    }
}

export function setColorScheme(theme) {

    switch (theme) {
        case "light":
            document.body.style.setProperty('--bg-color',bgColorLight);
            document.body.style.setProperty('--bg-content-color',bgContentLight);
            document.body.style.setProperty('--text-color',textColorLight);
            document.body.style.setProperty('--outline-color',accentColor);
            document.body.style.setProperty('--btn-bg-color',bgContentLight);
            setLocalStorageLight();
            break;
        case "dark":
            document.body.style.setProperty('--bg-color',bgColorDark);
            document.body.style.setProperty('--bg-content-color',bgContentDark);
            document.body.style.setProperty('--text-color',textColorDark);
            document.body.style.setProperty('--outline-color',accentColor);
            document.body.style.setProperty('--btn-bg-color',bgContentDark);
            setLocalStorageDark();
            break;
        default:
            throw new Error('Selected Color Scheme does not exist.');
    }
}


function setLocalStorageLight() {
    localStorage.setItem("theme", "light");
    localStorage.setItem("themeIcon", "moon");
}

function setLocalStorageDark() {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("themeIcon", "sun");
}