const searchForm= document.querySelector('form');
const searchResultDiv= document.querySelector('.search-result');
//const container= document.querySelector('.container');
let searchQuery='';
const APP_ID= 'bf33565c';
const APP_key= '0d3e1618a9b96f212b6e7bad0c3f5ef2';


searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery= e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
    const response= await fetch(baseURL);
    const data= await response.json();
    console.log(data);
    generateHTML(data.hits);

}
function generateHTML(results){
    let generatedHTML='';
    results.map(result =>{
        generatedHTML+=`
            <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class= "view-btn" href="${result.recipe.url}" target="_blank">View recipe</a>
                </div>
                <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet label:${result.recipe.dietLabels.length>0 ?result.recipe.dietLabels.length : "N/A "}</p>
                <p class="item-data">Health label:${result.recipe.healthLabels}</p>
            </div>
        `
    })
    searchResultDiv.innerHTML= generatedHTML
}