let basketItems = JSON.parse(localStorage.getItem("basket"));
let productsID = [];

function basket() {
    for (let i = 0; i < basketItems.length; i++) {
        getOneCamera(i);
    }
    totalPrice();
}

function totalPrice() {
    let total = 0;
    for (let j = 0; j < basketItems.length; j++) {
        total = total + (basketItems[j].price * basketItems[j].selectedQuantity);
    }
    document.querySelector("#total").appendChild(document.createTextNode((total / 100).toLocaleString("en") + " €"));
}

function getOneCamera(i) {
    productsID.push(basketItems[i]._id);

    let basket = document.querySelector("#basket"),
        basketItem = document.createElement("div"),
        basketItemBody = document.createElement("div"),
        nameAndQuantity = document.createElement("h3"),
        price = document.createElement("h4"),
        image = document.createElement("img"),
        selectedLense = document.createElement("h4");

    nameAndQuantity.appendChild(document.createTextNode("[" + basketItems[i].name + "]" + " x" + basketItems[i].selectedQuantity));
    image.src = basketItems[i].imageUrl;
    selectedLense.appendChild(document.createTextNode(basketItems[i].selectedLense));
    price.appendChild(document.createTextNode((basketItems[i].price * basketItems[i].selectedQuantity / 100).toLocaleString("en") + " €"));

    basketItem.classList.add("w-full", "max-w-sm", "mx-auto", "rounded-md", "shadow-md", "overflow-hidden");
    basketItem.setAttribute("data-id", basketItems[i]._id);
    basketItem.setAttribute("data-lense", basketItems[i].selectedLense);
    image.classList.add("h-56", "w-full", "bg-cover");
    basketItemBody.classList.add("px-5", "py-3", "flex", "flex-col");
    nameAndQuantity.classList.add("px-5", "py-3", "text-center");
    price.classList.add("text-gray-500", "mt-2", "text-center");
    selectedLense.classList.add("text-center");

    basketItemBody.appendChild(price);
    basketItem.appendChild(nameAndQuantity);
    basketItem.appendChild(selectedLense);
    basketItem.appendChild(image);
    basketItem.appendChild(basketItemBody);

    // Placement de la camera dans le ul
    basket.appendChild(basketItem);

}

basket();

let orderId = localStorage.getItem("orderId");
document.querySelector("strong").appendChild(document.createTextNode(orderId));