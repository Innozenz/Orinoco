function getCameras() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                getOneCamera(data[i]);
            }
        })
        .catch(function (e) {
            alert(e);
        })
}

function getOneCamera(camera) {
    let cameras = document.querySelector(".cameras"),
        cameraItem = document.createElement("div"),
        cameraItemTop = document.createElement("div"),
        cameraItemBottom = document.createElement("div"),
        name = document.createElement("h3"),
        price = document.createElement("p"),
        description = document.createElement("p"),
        image = document.createElement("img"),
        productPageLink = document.createElement("a"),
        urlPage = "product.html?id=" + camera._id;

    name.appendChild(document.createTextNode(camera.name));
    image.src = camera.imageUrl;
    price.appendChild(document.createTextNode((camera.price / 100).toLocaleString("en") + " €"));
    description.appendChild(document.createTextNode(camera.description));
    productPageLink.appendChild(document.createTextNode("Voir la page du produit"));
    productPageLink.setAttribute('href', urlPage);

    cameraItem.classList.add("w-full", "max-w-sm", "mx-auto", "rounded-md", "shadow-md", "overflow-hidden");
    cameraItemTop.classList.add("flex", "items-end", "justify-end", "h-56", "w-full", "bg-cover");
    cameraItemBottom.classList.add("px-5", "py-3");
    image.classList.add("h-56", "w-full", "bg-cover");
    name.classList.add("text-gray-700", "uppercase");
    productPageLink.classList.add("block", "my-6", "px-6", "text-center", "py-2", "transition", "ease-in", "duration-200", "uppercase", "rounded-full", "hover:bg-gray-800", "hover:text-white", "border-2", "border-gray-900", "focus:outline-none", "add-cart");
    price.classList.add("text-gray-500", "mt-2");

    cameraItemBottom.appendChild(name);
    cameraItemBottom.appendChild(price);
    cameraItem.appendChild(image);
    cameraItem.appendChild(cameraItemBottom);
    cameraItemBottom.appendChild(productPageLink);

    // Placement de la camera dans le ul
    cameras.appendChild(cameraItem);
}

getCameras();