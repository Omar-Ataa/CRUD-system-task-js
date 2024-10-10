

var productName = document.getElementById('nameInput');
var productType = document.getElementById('typeInput');
var productPrice = document.getElementById('priceInput');
var productDescription = document.getElementById('descriptionInput');
var tbody = document.getElementById('tbody');
var productSearch = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');

if( localStorage.getItem('productData') == null ){
    var productList = [] ;
}
else{
    var productList = JSON.parse(localStorage.getItem('productData'));

    showData()
}

// clear-------------------------
function clearForm(){
    
    productName.value="";
    productType.value='';
    productPrice.value='';
    productDescription.value='';
    
    addBtn.innerHTML = 'add product';
}
// add--------------------------
function addProduct(){

    if(addBtn.innerHTML.includes('add') ){
    var product = { 
        namee : productName.value ,
        type : productType.value ,
        price : productPrice.value ,
        description : productDescription.value ,
    };

  
    productList.push(product);
    
    var stringData = JSON.stringify(productList);
    localStorage.setItem('productData' , stringData);


}   else{
    updateProduct();
}
    showData();
}


// show data---------------------
function showData(){

    var trs = '' ;
    for ( var i = 0 ; i < productList.length ; i++ ){

     trs += ` <tr>
                    <td scope="row">${i}</td>
                    <td>${productList[i].namee}</td>
                    <td>${productList[i].type}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].description}</td>

                    <td>
                    <button onclick="deleteProduct(${i})" 
                    class=" btn btn-outline-danger ">
                     <i  class="fa-solid fa-trash-can text-danger "></i> 
                     </button> 
                     </td>

                    <td>
                     <button onclick="showDataOnForm(${i})"
                     class=" btn btn-outline-warning ">
                     <i class="fa-regular fa-pen-to-square text-warning "></i> 
                     </button>
                      </td>
             </tr> `

    
    }

    tbody.innerHTML= trs ;
}


// Delete-------------------
function deleteProduct(index){
    
    productList.splice(index,1);

    localStorage.setItem('productData' , JSON.stringify(productList) ) ;
    showData();
}

// search-------------
function searchFun(){

            console.log(productSearch.value);
            var trs = '' ;
              for ( var i = 0 ; i < productList.length ; i++){

                if(productList[i].namee.toLowerCase().includes(productSearch.value.toLowerCase()) == true){
                    
                 trs += ` <tr>
                    <td scope="row">${i}</td>
                    <td>${productList[i].namee}</td>
                    <td>${productList[i].type}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].description}</td>

                    <td>
                    <button onclick="deleteProduct(${i})" 
                    class=" btn btn-outline-danger ">
                     <i  class="fa-solid fa-trash-can text-danger "></i> 
                     </button> 
                     </td>

                    <td>
                     <button 
                     class=" btn btn-outline-warning ">
                     <i class="fa-regular fa-pen-to-square text-warning "></i> 
                     </button>
                      </td>
                 </tr> `

                }
                  }

                    tbody.innerHTML= trs ;   
}

// show Data On Form--------------
var globalIndex = 0;
productName.value = null;
function showDataOnForm(index){
    globalIndex = index;
    productName.value = productList[index].namee;
    productType.value = productList[index].type;
    productPrice.value = productList[index].price;
    productDescription.value = productList[index].description;

    addBtn.innerHTML= 'update';
}

// Update----------------
function updateProduct(){

    productList[globalIndex].namee = productName.value;
    productList[globalIndex].type = productType.value;
    productList[globalIndex].price = productPrice.value;
    productList[globalIndex].description = productDescription.value ;

    var stringData = JSON.stringify(productList);
    localStorage.setItem('productData' , stringData);

   clearForm();

   addBtn.innerHTML='add product';
}