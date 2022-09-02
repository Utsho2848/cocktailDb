const getCocktailApi = async (search, dataLimit) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  displayData(data.drinks, dataLimit);

}
const displayData = (data, dataLimit) => {
  console.log(data)
  if (dataLimit && data.length > 15) {
    data = data.slice(0, 15);
    document.getElementById('show-all-btn').classList.remove('d-none')
  }
  else {
    document.getElementById('show-all-btn').classList.add('d-none');
  }

  const displayArea = document.getElementById('cocktail-area');
  displayArea.innerHTML = ''
  for (const drink of data) {
    const div = document.createElement('div');
    div.classList = 'col';
    div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4>${drink.strDrink}</h4>
                    <h5 class="card-text">Category: ${drink.strCategory}</h5>
                    <p class="card-text">${drink.strAlcoholic}</p>
                    <button onclick="detailInfo('${drink.idDrink}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
                </div>
            </div>
        `
    displayArea.appendChild(div);
  }

  toggleSpinner(false)
}
const processSearch = (dataLimit) => {
  toggleSpinner(true)
  const inputFieldText = document.getElementById('input-field').value;
  document.getElementById('input-field').value = '';
  getCocktailApi(inputFieldText, dataLimit);
}
const searchField = (search) => {
  processSearch(15)
}
const detailInfo = async id => {
  // console.log(id)
  const detailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const res = await fetch(detailUrl);
  const data = await res.json();
  displayDetails(data.drinks[0]);
}
const displayDetails = data => {
  console.log(data)
  const detailField = document.getElementById('detail-id');
  detailField.innerHTML = ''
  const div = document.createElement('div');
  div.innerHTML = `
            <div class="card mb-3 bg-dark text-white">
            <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.strDrink}</h5>
              <h6>Ingredients:</h6>
              <p class="card-text">${data.strIngredient1 ? data.strIngredient1 : ''}</p>
              <p class="card-text">${data.strIngredient2 ? data.strIngredient2 : ''}</p>
              <p class="card-text">${data.strIngredient3 ? data.strIngredient3 : ''}</p>
              <p class="card-text">${data.strIngredient4 ? data.strIngredient4 : ''}</p>
              <p class="card-text">${data.strIngredient5 ? data.strIngredient5 : ''}</p>
              <p class="card-text">${data.strIngredient6 ? data.strIngredient6 : ''}</p>
              <p class="card-text">${data.strIngredient7 ? data.strIngredient7 : ''}</p>
              <p class="card-text">${data.strIngredient8 ? data.strIngredient8 : ''}</p>
              <p class="card-text">${data.strIngredient9 ? data.strIngredient9 : ''}</p>
              <p class="card-text">${data.strIngredient10 ? data.strIngredient10 : ''}</p>
              <b>Instructions:</b><p> ${data.strInstructions ? data.strInstructions : ''}</p> 
              <p> ${data.strInstructionsIT ? data.strInstructionsIT : ''}</p> 
              <p> ${data.strInstructionsDE ? data.strInstructionsDE : ''}</p> 
              <p> ${data.strInstructionsES ? data.strInstructionsES : ''}</p> 
              <p> ${data.strInstructionsFR ? data.strInstructionsFR : ''}</p> 
              <b>Measurement:</b><p>${data.strMeasure1 ? data.strMeasure1 : ''}</p>
              <p>${data.strMeasure2 ? data.strMeasure2 : ''}</p>
              <p>${data.strMeasure3 ? data.strMeasure3 : ''}</p>
            </div>
          </div>
  `
  detailField.appendChild(div)
}
const toggleSpinner = (isSpinner) => {
  const spinnerField = document.getElementById('spinner');
  if (isSpinner === true) {
    spinnerField.classList.remove("d-none");
  } else {
    spinnerField.classList.add("d-none");
  }
}

// see more button pree>> display all drinks
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch()
})