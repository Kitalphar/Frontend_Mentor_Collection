
const scoreTotal = document.getElementById("total_score");
const scoreDescOne = document.getElementById("score_desc1");
const scoreDescTwo = document.getElementById("score_desc2");
const arrScore = [];

function onPageLoad() {
   fetchData()
        .then((jsonResponse) => {
            insertData(jsonResponse);
            calculateTotal();
        })
        .catch((error) => {
            console.error("Fetch error", error);
        });
}

onPageLoad();

async function fetchData() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error ("Network response was not ok");
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    }
    catch (error) {
        console.error("Fetch error", error);
        throw error;
    }
}

function insertData(jsonData) {
    try {
        
        if (!jsonData) {
            console.error("JsonData is null or undefined");
            return;
        }

        for (let i = 0; i < jsonData.length; i++) {

            let sectionData = jsonData[i];
            let targetSection;
            

            switch (sectionData.category) {
                case "Reaction":
                    targetSection = document.getElementById("section_one");
                    break;
                case "Memory":
                    targetSection = document.getElementById("section_two");
                    break;
                case "Verbal":
                    targetSection = document.getElementById("section_three");
                    break;
                case "Visual":
                    targetSection = document.getElementById("section_four");
                    break;
            }

            let summaryTitle = targetSection.getElementsByClassName("summary-title");
            summaryTitle[0].textContent = sectionData.category;

            let imgElement = document.createElement("img");
            imgElement.src = sectionData.icon;
            imgElement.alt = `${sectionData.category} icon`;
            imgElement.role = "presentation";
            imgElement.ariaHidden = true;

            summaryTitle[0].prepend(imgElement);

            let summaryScore = targetSection.getElementsByClassName("summary-score");
            summaryScore[0].textContent = `${sectionData.score}`;

            arrScore.push(sectionData.score);
        }

    }
    catch (error) {
        console.error(error);
    }
}

function calculateTotal() {
    let tempScore = 0;

    for (let i = 0; i < arrScore.length; i++) {
        tempScore = tempScore + arrScore[i];
    }

    scoreTotal.textContent = `${Math.round(tempScore / arrScore.length)}`;

    // just pretending these come from some sort of dataset as well.
    scoreDescOne.textContent = "Great";
    scoreDescTwo.textContent = "You scored higher than 65% of the people who have taken these tests."
}