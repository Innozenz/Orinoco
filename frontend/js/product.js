function showCamera(data) {
    let name = document.querySelector("#name"),
        price = document.querySelector("#price"),
        image = document.querySelector("#image"),
        description = document.querySelector("#description"),
        selectLenses = document.querySelector("select");


    name.textContent = data.name;
    price.textContent = (data.price / 100).toLocaleString("en") + " €";
    image.src = data.imageUrl;
    description.textContent = data.description;
    for (let i = 0; i < data.lenses.length; i++) {
        let option = document.createElement("option");
        option.textContent = data.lenses[i];
        selectLenses.appendChild(option);
    }
}

function getCameras(id) {
    return fetch("http://localhost:3000/api/cameras/" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showCamera(data);
            let addItemToBasket = document.querySelector("#addToBasket");
            addItemToBasket.addEventListener("click", function () {addToBasket(data)}, false);
        })
        .catch(function (e) {
            alert(e);
        })
}

function addToBasket(data) {
    //Création du panier dans le localStorage s'il n'existe pas déjà
    if (typeof localStorage.getItem("basket") !== "string") {
        let basket = [];
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    //Récupérer les informations de la caméra
    data.selectedLense = document.querySelector("option:checked").innerText;
    data.selectedQuantity = document.querySelector("input").value;
    delete data.lenses;
    //création d'une variable pour manipuler le panier
    let basket = JSON.parse(localStorage.getItem("basket"));
    //Vérification que l'item n'existe pas déjà dans le panier
    let isThisItemExist = false;
    let existingItem;
    for (let i = 0; i < basket.length; i++) {
        if (data._id === basket[i]._id && data.price === basket[i].price && data.selectedLense === basket[i].selectedLense) {
            isThisItemExist = true;
            existingItem = basket[i];
        }
    }
    //Ajouter la caméra au panier
    if (isThisItemExist === false) {
        basket.push(data);
        localStorage.setItem("basket", JSON.stringify(basket));
    } else {
        existingItem.selectedQuantity = parseInt(existingItem.selectedQuantity, 10) + parseInt(data.selectedQuantity, 10);
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    alert("Produit ajouté au panier !");
}

let params = (new URL(document.location)).searchParams;
let id = params.get("id");
getCameras(id);