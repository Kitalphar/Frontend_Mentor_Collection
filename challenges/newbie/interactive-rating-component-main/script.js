const card_rating = document.getElementById("card_rating");
const card_success = document.getElementById("card_success");
const card_formRating = document.getElementById("card_form_rating");
const card_successMessage = document.getElementById("card_success_rating");


function onPageLoad() {

    try {
        card_formRating.reset();
        card_formRating.addEventListener('submit', handleSubmit);
    } catch (error) {
        console.error(' _@/ˇ ', error);
        // It's a snail, don't question it.
    }
    
}

onPageLoad();

function handleSubmit(event) {

    try {

        event.preventDefault();

        const rb_rating = this.rb_rating.value;

        if(rb_rating) {

            card_successMessage.textContent = rb_rating;

            card_rating.classList.add("hidden");
            card_success.classList.remove("hidden");
            card_formRating.reset();
        }
        else {
            alert("Please select a number!");
        }
        
    } catch (error) {
        console.error(' _@/ˇ ', error);
    }

}