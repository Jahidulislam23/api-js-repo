console.log("index is connected");

function loadCategories(){
    //1-fetch the data
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //2-convert promise to json
    .then((res)=>res.json())
    //2-send data to display
    .then((data)=>displayCategories(data.categories));

}
function displayCategories(categories){
    //get the container
    console.log(categories);
}

loadCategories()