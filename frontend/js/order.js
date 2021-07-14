function confirmation() {
    let total = localStorage.getItem("prixTotal");
    let prixTotal = document.querySelector("#total");
    prixTotal.appendChild(document.createTextNode((total / 100).toLocaleString("en") + " €"));

    let orderId = localStorage.getItem("orderId");
    document.querySelector("strong").appendChild(document.createTextNode(orderId));
}

confirmation();

