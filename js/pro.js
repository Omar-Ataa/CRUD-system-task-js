var productName = document.getElementById('nameInput');
var productType = document.getElementById('typeInput');
var productPrice = document.getElementById('priceInput');
var productDescription = document.getElementById('descriptionInput');
var tbody = document.getElementById('tbody');
var productSearch = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');

clearForm();

// Retrieve data from localStorage if available
var productList = JSON.parse(localStorage.getItem('productData')) || [];

// Display data if available
if (productList.length > 0) {
    showData();
}

// Clear form fields-------------------------
function clearForm() {
    productName.value = "";
    productType.value = "";
    productPrice.value = "";
    productDescription.value = "";

    addBtn.innerHTML = 'Add Product';
}

// Add Product--------------------------
function addProduct() {
    // Check if all fields are filled
    if (!productName.value.trim() || !productType.value.trim() || !productPrice.value.trim() || !productDescription.value.trim()) {
        alert("Please fill in all fields!");
        return; // Stop execution if any field is empty
    }

    if (addBtn.innerHTML.includes('Add')) {
        var product = {
            namee: productName.value,
            type: productType.value,
            price: productPrice.value,
            description: productDescription.value
        };

        productList.push(product);
        localStorage.setItem('productData', JSON.stringify(productList));
    } else {
        updateProduct();
    }

    showData();
}

// Show data---------------------
function showData() {
    var trs = '';
    for (var i = 0; i < productList.length; i++) {
        trs += `<tr>
                    <td scope="row">${i}</td>
                    <td>${productList[i].namee}</td>
                    <td>${productList[i].type}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].description}</td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">
                            <i class="fa-solid fa-trash-can text-danger"></i>
                        </button>
                    </td>
                    <td>
                        <button onclick="showDataOnForm(${i})" class="btn btn-outline-warning">
                            <i class="fa-regular fa-pen-to-square text-warning"></i>
                        </button>
                    </td>
                </tr>`;
    }
    tbody.innerHTML = trs;
}

// Delete Product-------------------
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('productData', JSON.stringify(productList));
    showData();
}

// Search-------------------
function searchFun() {
    if (!productSearch.value.trim()) {
        alert("Please enter a search term.");
        return;
    }

    var trs = '';
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].namee.toLowerCase().includes(productSearch.value.toLowerCase())) {
            trs += `<tr>
                        <td scope="row">${i}</td>
                        <td>${productList[i].namee}</td>
                        <td>${productList[i].type}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].description}</td>
                        <td>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">
                                <i class="fa-solid fa-trash-can text-danger"></i>
                            </button>
                        </td>
                        <td>
                            <button onclick="showDataOnForm(${i})" class="btn btn-outline-warning">
                                <i class="fa-regular fa-pen-to-square text-warning"></i>
                            </button>
                        </td>
                    </tr>`;
        }
    }
    tbody.innerHTML = trs;
}

// Show data on form----------------
var globalIndex = 0;

function showDataOnForm(index) {
    globalIndex = index;
    productName.value = productList[index].namee;
    productType.value = productList[index].type;
    productPrice.value = productList[index].price;
    productDescription.value = productList[index].description;

    addBtn.innerHTML = 'Update';
}

// Update Product----------------
function updateProduct() {
    productList[globalIndex].namee = productName.value;
    productList[globalIndex].type = productType.value;
    productList[globalIndex].price = productPrice.value;
    productList[globalIndex].description = productDescription.value;

    localStorage.setItem('productData', JSON.stringify(productList));

    clearForm();
    addBtn.innerHTML = 'Add Product';
}
