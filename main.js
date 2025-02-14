const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const addProductBtn = document.querySelector("button");

addProductBtn.addEventListener("click", () => {
    addProduct()
})

// Empty Array
const productArray = JSON.parse(localStorage.getItem("products")) || [];

// Product object generator
class Product {
    constructor(product, price){
        this.product = product;
        this.price = price
    }
}

// Enabling "Enter" keyboard
productPrice.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        addProduct()
    }
})

// Function to add product to the localStorage
function addProduct(){
    let addedProduct = new Product(productName.value, productPrice.value);
    const generatedProduct = `
        <p>${addedProduct.product} = KShs. ${addedProduct.price}<button class = "delete-product">Delete</button></p>
    `;
    productArray.push(addedProduct);
    localStorage.setItem("products", JSON.stringify(productArray));

    document.querySelector(".product-container").innerHTML += generatedProduct
    
    // Empty the inputs after adding the product
    productName.value = "";
    productPrice.value = ""
}

// Function to delete an item from the localStorage
function deleteProduct(index){
    productArray.splice(index,1)
    localStorage.setItem("products", JSON.stringify(productArray));
    renderProducts()
}

// function to render products from the localStorage to the DOM
function renderProducts(){
    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = "";

    productArray.forEach((product,index) => {
        let storedProduct = `
            <p>${product.product} = KShs. ${product.price} 
                <button class = "delete-product" data-index = "${index}">Delete</button>
            </p>
        `;

        productContainer.innerHTML += storedProduct
    });

    document.querySelectorAll(".delete-product").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.dataset.index
            deleteProduct(index)
        })
    })
}
renderProducts()