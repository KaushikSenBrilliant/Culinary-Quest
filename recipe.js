const searchForm = document.querySelector('form'); //grabbing the form with the tag
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "21142a84";
const APP_key = "7eed8be07821ff281af806824ecb3bf6";
// console.log(container)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  //calling a function which will fetch the API
  fetchAPI();
})

//Adding an event listener to the ion-icon element 
document.querySelector('ion-icon[name="search"]').addEventListener('click', searchIconClicked);

//making an API call
async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL); //fetching and storing the response in response variable
  const data = await response.json(); //converting our response result into json and stroing it in data
  generateHTML(data.hits) //passing the hits from the data part
  console.log(data);
}

//this function is called whenever we click the icon to search
function searchIconClicked() {
  searchQuery = searchForm.querySelector('input').value;
  fetchAPI();
}

function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML= '';
  results.map(result => { //we create an HTML item everytime we loop through this item and add it to our generatedHTML
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img"> 
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1> 
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a> 
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p> 
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p> 
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `
  })
//the steps are as follows
//creating a dynamic image url, inside result we have recipe, inside this we choose image
//updating the name(label) of the recipe
//linking the original website of the recipe
//updating calories and upto 2 decimal places
//showing the diet labels when available

  //appending these 20 items in our search-result div element
  searchResultDiv.innerHTML = generatedHTML; //generatedHTML is assigned to innerHTML
}