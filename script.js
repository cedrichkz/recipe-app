const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchButton');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseButton = document.querySelector('.recipe-closeButton');
const recipeDetailsContent = document.querySelector('.recipe-details-content');


const fetchRecipes = async (query) => {
    // change recipecontainer text to fetching
    recipeContainer.innerHTML="fetching recipes..."
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // change recipecontainer text to empty
    recipeContainer.innerHTML=""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src=${meal.strMealThumb}>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        recipeButton = document.createElement('button');
        recipeButton.textContent = "View recipe";
        recipeDiv.appendChild(recipeButton);

        //add event listener to button
        recipeButton.addEventListener('click', (e) => {
            openRecipePopUp(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    })
    }
    catch (error){
        recipeContainer.innerHTML = "<h2> No recipes found<h2>"
    }
    };

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

recipeCloseButton.addEventListener('click', () => {
    recipeCloseButton.parentElement.style.display = "none";
})

const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML = `
    <p>${meal.strInstructions}</p>
    <p><a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>
    `;
    recipeDetailsContent.parentElement.style.display = "block";

}