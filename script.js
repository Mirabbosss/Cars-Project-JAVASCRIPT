// Variables
const addNewCar = document.getElementById('add-car');
const viewCars = document.getElementById('view-cars');
const deleteCar = document.getElementById('delete-car');
const searchCar = document.getElementById('search-car');
const sortCars = document.getElementById('sort-cars');
const formAddCar = document.getElementById('add-car-form');
const formDeleteCar = document.getElementById('delete-car-form');
const formSearchCar = document.getElementById('search-car-form');
const divAnswer = document.getElementById('div-for-answer');
const wrapperList = document.getElementById('wrapper-view-cars-btn');
const divForViewList = document.getElementById('div-for-list');
const carModelInput = document.getElementById('car-model');
const carNameInput = document.getElementById('car-name');
const carYearInput = document.getElementById('car-year');
const carColorInput = document.getElementById('car-color');
const carStockInput = document.getElementById('car-stock');
const carPriceInput = document.getElementById('car-price');
const carIdInput = document.getElementById('car-ID');
const carSearchNameInput = document.getElementById('car-search-name');



// All cars in massive
const ALL_CARS = JSON.parse(localStorage.getItem("cars")) || [];



// Function for to avoid rewriting
function setCars() {
    localStorage.setItem("cars", JSON.stringify(ALL_CARS))
}

// Call the add function
addNewCar.addEventListener('click', function() {
    formAddCar.classList.toggle("hide-form")
});

// Call the view car function
viewCars.addEventListener('click', () => {
    wrapperList.classList.toggle("hide-form")
    viewList()
});

// Call the delete function
deleteCar.addEventListener('click', () => {
    wrapperList.classList.toggle("hide-form");
    formDeleteCar.classList.toggle("hide-form");
});

// Call the search function
searchCar.addEventListener('click', () => {
    wrapperList.classList.toggle("hide-form");
    formSearchCar.classList.toggle("hide-form");
})

// Call the sort function
sortCars.addEventListener('click', () => {
    sortCar();
})



// Constructor new car function
function AddNewCar(newCarModel, newCarName, newCarYear, newCarColor, newCarStock, newCarPrice) {
    this.model = newCarModel
    this.name = newCarName
    this.year = newCarYear
    this.color = newCarColor
    this.stock = newCarStock
    this.price = newCarPrice
    this.id = (Math.floor(Math.random() * 100000) + 1).toString().padStart(6, "0")
}

// Add car submit and function
formAddCar.onsubmit = (e) => {
    e.preventDefault();

    let newCarModel = carModelInput.value;
    let newCarName = carNameInput.value;
    let newCarYear = carYearInput.value;
    let newCarColor = carYearInput.value;
    let newCarStock = carStockInput.value;
    let newCarPrice = carPriceInput.value;

    let newCar = new AddNewCar(newCarModel, newCarName, newCarYear, newCarColor, newCarStock, newCarPrice);

    ALL_CARS.push(newCar);
    setCars()
    divAnswer.innerHTML = "<h3>Added successfully. To see in the list, go to the section view all cars</h3>"

    viewList()
    formAddCar.reset();
}

// View function
function viewList() {
    divForViewList.innerHTML = "";
    ALL_CARS.forEach(car => {
        divForViewList.innerHTML += `<div class="car-info"><h4>Model: <span class="red-word">${car.model}</span></h4><h4>Name: <span class="red-word">${car.name}</span></h4><h4>Year: <span class="red-word">${car.color}</span></h4><h4>Stock: <span class="red-word">${car.stock}</span></h4><h4>Price: <span class="red-word">$${car.price}</span></h4><h4>Car ID: <span class="red-word">${car.id}</span></h4></div>`
    })
}

// Delete submit and function
formDeleteCar.onsubmit = (e) => {       
    e.preventDefault();

    let delIdCar = carIdInput.value;
    
    let deletedCar = ALL_CARS.findIndex(car => car.id == delIdCar)
    ALL_CARS.splice(deletedCar, 1)
    setCars()
    divAnswer.innerHTML = "<h3>Deleted successfully. To see in the list, go to the section view all cars</h3>"

    viewList()
    formDeleteCar.reset();
}

// Search submit and function
formSearchCar.onsubmit = (e) => {
    e.preventDefault();

    let srchNameCar = carSearchNameInput.value.toLowerCase();

    let newAllCars = ALL_CARS.filter(car => car.name.toLowerCase().includes(srchNameCar))

        divForViewList.innerHTML = "";
    newAllCars.forEach(car => {
        divForViewList.innerHTML += `<div class="car-info"><h4>Model: <span class="red-word">${car.model}</span></h4><h4>Name: <span class="red-word">${car.name}</span></h4><h4>Year: <span class="red-word">${car.color}</span></h4><h4>Stock: <span class="red-word">${car.stock}</span></h4><h4>Price: <span class="red-word">$${car.price}</span></h4><h4>Car ID: <span class="red-word">${car.id}</span></h4></div>`
    })
        divAnswer.innerHTML = "<h3>Search successfully. To see in the list, go to the section view all cars</h3>"
     
    formDeleteCar.reset();
}

// Sort function
let sorted = false;
function sortCar() {
    if(sorted === false) {
        sorted = true;

        ALL_CARS.sort((a, b) => {
            if(a.price > b.price) {
                return -1;
            } else {
                return 1;
            }
        })
    } else {
        sorted = false;

        ALL_CARS.sort((a, b) => {
            if(a.price > b.price) {
                return 1;
            } else {
                return -1;
            }
        })
    }

    viewList()
}