let basketItems = JSON.parse(localStorage.getItem("basket"));
let productsID = [];

function getBasketItem(i) {
    productsID.push(basketItems[i]._id);

    // Création des éléments
    let basket = document.querySelector("#basket"),
        basketItem = document.createElement("div"),
        basketItemBottom = document.createElement("div"),
        name = document.createElement("h3"),
        selectedLense = document.createElement("h4"),
        quantity = document.createElement("div"),
        selectedQuantity = document.createElement("input"),
        price = document.createElement("p"),
        description = document.createElement("p"),
        image = document.createElement("img"),
        productPageLink = document.createElement("a"),
        modifyQuantityButton = document.createElement("button"),
        deleteItemButton = document.createElement("button"),
        urlPage = "product.html?id=" + basketItems[i]._id;

    // Remplissage des éléments
    name.appendChild(document.createTextNode(basketItems[i].name));
    image.src = basketItems[i].imageUrl;
    productPageLink.appendChild(document.createTextNode("Voir la page du produit"));
    productPageLink.setAttribute('href', urlPage);
    selectedLense.appendChild(document.createTextNode(basketItems[i].selectedLense));
    modifyQuantityButton.appendChild(document.createTextNode("Modifier la quantité"));
    deleteItemButton.appendChild(document.createTextNode("Supprimer"));
    price.appendChild(document.createTextNode((basketItems[i].price * basketItems[i].selectedQuantity / 100).toLocaleString("en") + " €"));


    //Stylisation des éléments
    productPageLink.classList.add("btn", "btn-secondary");
    productPageLink.setAttribute("role", "button");
    basketItem.classList.add("w-full", "max-w-sm", "mx-auto", "rounded-md", "shadow-md", "overflow-hidden");
    basketItem.setAttribute("data-id", basketItems[i]._id);
    basketItem.setAttribute("data-lense", basketItems[i].selectedLense);
    image.classList.add("h-56", "w-full", "bg-cover");
    basketItemBottom.classList.add("px-5", "py-3", "flex", "flex-col");
    name.classList.add("text-gray-700", "uppercase", "text-center");
    productPageLink.classList.add("block", "my-6", "px-6", "text-center", "py-2", "transition", "ease-in", "duration-200", "uppercase", "rounded-full", "hover:bg-gray-800", "hover:text-white", "border-2", "border-gray-900", "focus:outline-none", "add-cart");
    quantity.classList.add("px-5", "py-3", "flex", "flex-col", "content-center", "justify-center", "items-center", "flex-wrap");
    selectedQuantity.classList.add("px-3", "py-1", "w-full", "font-semibold", "text-center", "text-gray-700", "bg-gray-200", "outline-none", "focus:outline-none", "hover:text-black", "focus:text-black");
    selectedQuantity.setAttribute("value", basketItems[i].selectedQuantity);
    modifyQuantityButton.classList.add("block", "my-6", "px-6", "text-center", "py-2", "transition", "ease-in", "duration-200", "uppercase", "rounded-full", "hover:bg-gray-300", "border-2", "border-gray-900", "focus:outline-none");
    selectedQuantity.setAttribute("type", "number");
    modifyQuantityButton.addEventListener("click", modifyQuantity);
    deleteItemButton.classList.add("bg-red-700", "px-5", "py-3", "text-sm", "shadow-sm", "font-medium", "tracking-wider", "border", "text-red-100", "rounded-full", "hover:shadow-lg", "hover:bg-red-800");
    deleteItemButton.addEventListener("click", deleteItem);
    price.classList.add("text-gray-500", "mt-2", "text-center");
    selectedLense.classList.add("text-center");

    // Placement des éléments de la camera
    basketItem.appendChild(image);
    basketItemBottom.appendChild(name);
    basketItemBottom.appendChild(selectedLense);
    basketItemBottom.appendChild(price);
    basketItemBottom.appendChild(quantity);
    quantity.appendChild(selectedQuantity);
    quantity.appendChild(modifyQuantityButton);
    basketItem.appendChild(basketItemBottom);
    basketItemBottom.appendChild(deleteItemButton);
    basketItemBottom.appendChild(productPageLink);

    basket.appendChild(basketItem);

}

function basket() {
    for (let i = 0; i < basketItems.length; i++) {
        getBasketItem(i);
    }
    totalPrice();
}

function totalPrice() {
    let total = 0;
    for (let j = 0; j < basketItems.length; j++) {
        total = total + (basketItems[j].price * basketItems[j].selectedQuantity);
    }
    document.querySelector("#total").appendChild(document.createTextNode((total / 100).toLocaleString("en") + " €"));
    localStorage.setItem("prixTotal", total);
}

function modifyQuantity(e) {
    //Sélectionner le bouton puis la carte à laquelle il appartient
    let itemCard = e.currentTarget.parentNode.parentNode.parentNode;
    //Identifier l'item associé dans le local storage
    let itemId = itemCard.getAttribute("data-id");
    let itemLense = itemCard.getAttribute("data-lense");
    let basketItemIndex;
    for (let i = 0; i < basketItems.length; i++) {
        if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectedLense) {
            basketItemIndex = i;
        }
    }
    //Modifier la quantité dans le local storage
    basketItems[basketItemIndex].selectedQuantity = e.target.previousSibling.value;
    localStorage.setItem("basket", (JSON.stringify(basketItems)));
    alert("Quantité modifiée !");
    window.location.reload(true);
}

function deleteItem(e) {
    //Sélectionner le bouton puis la carte à laquelle il appartient
    let itemCard = e.currentTarget.parentNode.parentNode;
    //Identifier l'item associé dans le local storage
    let itemId = itemCard.getAttribute("data-id");
    let itemLense = itemCard.getAttribute("data-lense");
    let basketItemIndex;
    for (let i = 0; i < basketItems.length; i++) {
        if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectedLense) {
            basketItemIndex = i;
        }
    }

    //Supprimer l'item dans le local storage
    basketItems.splice(basketItemIndex, 1);
    localStorage.setItem("basket", (JSON.stringify(basketItems)));
    alert("Item supprimé !");
    window.location.reload(true);
}

function checkIfFieldIsValid(input, regExp) {
    return input.value.match(regExp);
}

function getForm() {
    //Récupérer les informations du formulaire
    let firstName = document.querySelector("#firstname"),
        lastName = document.querySelector("#lastname"),
        address = document.querySelector("#address"),
        city = document.querySelector("#city"),
        email = document.querySelector("#email"),
        zip = document.querySelector("#zip");

    //Définition des expressions régulières pour la vérification de la validité des champs
    let stringFirstName = /[a-zA-ZÀ-ÿ]{2,}/,
        stringLastName = /[a-zA-ZÀ-ÿ]{2,}/,
        stringCity = /[A-Za-z]{2,}/,
        stringZip = /[0-9]{5}/,
        stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/,
        emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    //Vérification de la validité des champs
    let isFirstNameValid = checkIfFieldIsValid(firstName, stringFirstName),
        isLastNameValid = checkIfFieldIsValid(lastName, stringLastName),
        isAddressValid = checkIfFieldIsValid(address, stringRegExp),
        isCityValid = checkIfFieldIsValid(city, stringCity),
        isEmailValid = checkIfFieldIsValid(email, emailRegExp),
        isZipValid = checkIfFieldIsValid(zip, stringZip);

    //Alerter l'utilisateur s'il a mal rempli le formulaire
    let fields = [firstName, lastName, address, city, email, zip],
        fieldsValidity = [isFirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid, isZipValid],
        isAFieldInvalid = false;

    for (let i = 0; i < fields.length; i++) {
        if (!fieldsValidity[i]) { //si un champ n'est pas valide
            isAFieldInvalid = true; //un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API

            //Création du message à envoyer à l'utilisateur
            let message;
            if (fields[i] === firstName) {
                message = "Le prénom est incorrect !";
            } else if (fields[i] === lastName) {
                message = "Le nom est incorrect !";
            } else if (fields[i] === address) {
                message = "L'adresse postale est incorrecte !";
            } else if (fields[i] === city) {
                message = "La ville est incorrecte !";
            } else if (fields[i] === zip) {
                message = "Le code postal est incorrect !";
            } else {
                message = "L'adresse mail est incorrecte !";
            }

            //Création et stylisation de l'alerte
            let alert = document.createElement("div");
            alert.appendChild(document.createTextNode(message));
            fields[i].classList.add("font-bold");
            alert.classList.add("text-red-700");
            fields[i].parentElement.appendChild(alert);
        }
    }
    //Si l'un des champs a été vidé ...
    if (isAFieldInvalid) return; //la fonction s'arrête
    //sinon on continue

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
        zip: zip.value
    };

    let contactItems = JSON.stringify({
        contact: contact,
        products: productsID
    })

    submitOrder(contactItems);
}

function submitOrder(contactItems) {
    if (productsID.length === 0) {
        alert("Votre panier est vide !");
    } else {
        //Récupérer l'orderId
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: contactItems
        })
            .then(response => response.json())
            .then(order => {
                localStorage.setItem("orderId", order.orderId);
                window.location.href = "order.html";
            })
            .catch(function (e) {
                alert(e);
            })
    }

}

basket();
document.querySelector("#sendOrder").addEventListener("click", getForm);
