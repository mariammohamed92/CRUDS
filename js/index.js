var productName=document.getElementById('productName');
var productprice=document.getElementById('productprice');
var productcate=document.getElementById('productcate');
var productDesc=document.getElementById('productDesc');
var productlist =[];
var mainBtn =document.getElementById('mainBtn');
var updateBtn =document.getElementById('updateBtn');
var url = document.getElementById('url');; 


if(localStorage.getItem("list")!=null){
    productlist=JSON.parse( localStorage.getItem("list"));
    displayproduct( productlist);
}
else{
    productlist=[];
}

function addProduct(){
    if (validateProductName() == true  ) {

      var product = {
        name:productName.value,
        price:productprice.value,
        cate:productcate.value,
        Desc:productDesc.value,
        url:url.value,


    }
    clearform();
    productlist.push(product)
    settolocalstorage();
    displayproduct(productlist);
}
}

function displayproduct(list){
    var cartoona=``;
    for( var i=0 ;i< list.length ; i++)
    {
        console.log( list[i])
        cartoona += `<tr>
        <td>${i+1}</td>
        <td>${list[i].newName?list[i].newName:list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].cate}</td>
        <td>${list[i].Desc}</td>
        <td>
<button class="visit" ><a class="visit" href="${list[i].url}" target="_blank" >Visit</a></button>
                </td>
        <td><button class=" btn btn-warning" onclick="retriveProductDate(${i})">Update</button></td>
        <td><button class=" btn btn-danger" onclick="deletproduct(${i})">Delete</button></td>
       </tr>
        `
    }
      document.getElementById("tableDate").innerHTML=cartoona;
}
function clearform(flag){
    productName.value=flag?flag.name:``;
   productprice.value=flag?flag.price:``;
   productcate.value=flag?flag.cate:``;
   productDesc.value=flag?flag.Desc:``;
   url.value=flag?flag.url:``;


}
function deletproduct(index){
    productlist.splice(index,1)
    displayproduct(productlist);
    settolocalstorage();
}
function settolocalstorage(){
    localStorage.setItem("list", JSON.stringify(productlist));
}

let updatedIndex = 0;//3
function Update() {
      productlist[updatedIndex].name = productName.value;
      productlist[updatedIndex].price=  productprice.value;
      productlist[updatedIndex].cate= productcate.value;
      productlist[updatedIndex].Desc = productDesc.value;
      productlist[updatedIndex].url =  url.value;
      mainBtn.classList.replace("d-none" , "d-block");
      updateBtn.classList.replace("d-block" , "d-none");
      displayproduct(productlist);
      localStorage.setItem("list", JSON.stringify(productlist));
      clearform();


}
function retriveProductDate(index){
    updatedIndex = index;
    clearform( productlist[index]) ;
    mainBtn.classList.replace("d-none" , "d-block");
    updateBtn.classList.replace("d-block" , "d-none");
   /* productName.value= productlist[index].name;
   productprice.value=productlist[index].price;
   productcate.value=productlist[index].cate;
   productDesc.value=productlist[index].Desc;*/
    mainBtn.classList.add("d-none");
    document.getElementById("updateBtn").classList.replace("d-none" , "d-block");
}
function search(){
    var searchlist=[];
    var searchkey=document.getElementById("inputsearch").value
    for(var i=0; i< productlist.length;i++){
        if(productlist[i].name.toLowerCase().includes(searchkey.toLowerCase())){
            productlist[i].newName=productlist[i].name.replace(searchkey,`<span class=" text-danger fw-bolder">${searchkey}</span>`)
            searchlist.push(productlist[i]);
   }
    }
  displayproduct(searchlist);

}
function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(productName.value) == true) {
                document.getElementById("name-validation").classList.replace("d-block", "d-none");

    return true
    } else {
        document.getElementById("name-validation").classList.replace("d-none","d-block")
     return false
    }
}
function validateurl() {
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    if(regex.test(url.value)==true){
        document.getElementById("url-validation").classList.replace("d-block", "d-none");
        return true;
    }
     else {
        document.getElementById("url-validation").classList.replace("d-none","d-block")
     return false ;
    }
    }
        
    
    
    

