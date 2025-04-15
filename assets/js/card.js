export function createCard(cardData) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.tabIndex = 0;
    card.role = "link";

    let image = document.createElement('img');
    image.src = cardData.challenge_thumbnail_link;

    let title = document.createElement('h3');
    title.innerHTML = cardData.challenge_name;

    card.appendChild(image);
    card.appendChild(title);

    card.addEventListener('click', () => {
        window.location.assign(cardData.challenge_link);
    })

    card.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            window.location.assign(cardData.challenge_link);
        }
    })

    return card;
}   