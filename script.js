//Validation

function validateForm()
{
    var pid = document.getElementById('p_id').value;
    var name = document.getElementById('p_name').value;
   
    var price = document.getElementById('p_price').value;
    var description = document.getElementById('p_description').value;
    if(pid == '')
    {
        alert("Product Id is required");
        return false;
    }
    if(name == '')
    {
        alert("Product Name is required");
        return false;
    }
    
    if(price == '')
    {
        alert("Product price is required");
        return false;
    }
    else if(price < 1)
    {
        alert("Please enter positive number");
        return false
    }
    
    if(description == '')
    {
        alert("Product Description is required");
        return false;
    }
    return true;
}

//to show data from local stoage
function showData()
{


    var productlist;
    if(localStorage.getItem("productlist") == null)
    {
        productlist = [];

    }
    else{
        productlist = JSON.parse(localStorage.getItem("productlist"));
    }

    var html = "";
    productlist.forEach(function (element,index)
     {
        html += "<tr>"
        html += "<td>" + element.p_id + "</td>";
        html += "<td>" + element.p_name + "</td>";
        html += "<td><img style='height:80px; width:80px' src='" +element.p_image+ "'></td>";
        html += "<td>" + element.p_price + "</td>";
        html += "<td>" + element.p_description + "</td>";
        html += '<td><button onclick="updateData('+index+')" class="btn btn-warning">Edit</button><button  onclick="deleteData('+index+')" class="btn btn-danger">Delete</button';
        html += "</tr>";
       
    });
    document.querySelector("#crudtable tbody").innerHTML = html;
}
//load data 
document.onload = showData();

//Add data from local Storage
function AddData()
{
    document.getElementById("Submit").style.display ="block";
   document.getElementById("Update").style.display = "none";
    if(validateForm()==true)
    {
    var p_id = document.getElementById('p_id').value;
    var p_name = document.getElementById('p_name').value;
    var p_image = document.getElementById('p_image').files[0].name;
    var p_price = document.getElementById('p_price').value;
    var p_description = document.getElementById('p_description').value;
    console.log(p_id);

    var productlist;
    if(localStorage.getItem("productlist") == null)
    {
        productlist = [];

    }
    else{
        productlist = JSON.parse(localStorage.getItem("productlist"));
    }
    productlist.push({
    p_id : p_id,
    p_name  : p_name,
    p_image : p_image,
    p_price  :p_price,
    p_description : p_description,


})
localStorage.setItem("productlist",JSON.stringify(productlist));
showData();
document.getElementById('p_id').value = "";
document.getElementById('p_name').value = "";
document.getElementById('p_image').value = "";
document.getElementById('p_price').value = "";
document.getElementById('p_description').value = "";

    }
}
//delete data from local stoarage
function deleteData(index)
{
    let ans=confirm("Do you want to delete item") ;
    var productlist;
    if(localStorage.getItem("productlist") == null)
    {
        productlist = [];

    }
    else{
        productlist = JSON.parse(localStorage.getItem("productlist"));
    }
    if(ans==true){
    productlist.splice(index,1);
    localStorage.setItem("productlist",JSON.stringify(productlist));
    showData();
    }
}
//function to update/edit data
function updateData(index)
{
   
   document.getElementById("Submit").style.display ="none";
   document.getElementById("Update").style.display = "block";
   var productlist;
   if(localStorage.getItem("productlist") == null)
   {
       productlist = [];

   }
   else{
       productlist = JSON.parse(localStorage.getItem("productlist"));
   }
   document.getElementById('p_id').value = productlist[index].p_id;
   document.getElementById('p_name').value = productlist[index].p_name;
    //  document.getElementById('p_image').files[0].name = productlist[index].p_image;
   
   document.getElementById('p_price').value = productlist[index].p_price;
   document.getElementById('p_description').value = productlist[index].p_description;

   document.querySelector("#Update").onclick = function()
   {
    if(validateForm()==true)
    {   productlist[index].p_id = document.getElementById("p_id").value;
        productlist[index].p_name = document.getElementById("p_name").value;
      
      
        if(document.getElementById("p_image").files[0])
        {
            productlist[index].p_image = document.getElementById("p_image").files[0].name;
        }
        else
        {
             alert("Not Update Image")
        }
        productlist[index].p_price = document.getElementById("p_price").value;
        productlist[index].p_description = document.getElementById("p_description").value;

        localStorage.setItem("productlist",JSON.stringify(productlist));
        showData();
     
        document.getElementById("Submit").style.display ="block";
        document.getElementById("Update").style.display = "none";

    }
   }
}
//Filter the value 

function filtervalue()
{
    let filterval = document.getElementById('filterinput').value;
    let mytable =document.getElementById('crudtable');

    let tr = mytable.getElementsByTagName('tr');
    for (var i=1;i<tr.length;i++)
    {
        let td=tr[i].getElementsByTagName('td')[0];
        if(td)
        {
            let textvalue = td.textContent || td.innerHTML;
            if(textvalue.indexOf(filterval)>-1)
            {
                tr[i].style.display="";

            }
            else
            {
                tr[i].style.display="none";
            }
        }
        
    }
}
//Sort products acc to product id,product name,product price
function sortproducts()
{
        var optionvalue = document.getElementById('sortmyproduct').value;
        var productlist;
        console.log(optionvalue);
        if(localStorage.getItem("productlist") == null)
        {
            productlist = [];
     
        }
        else{
            productlist = JSON.parse(localStorage.getItem("productlist"));
        }
        switch(optionvalue)
        {
            case "spid":
                // console.log("hello");
                productlist.sort(function(a,b){return a.p_id - b.p_id});
                break;

            case "spname":
                productlist.sort(function(a, b){
                    let x = a.p_name.toLowerCase();
                    let y = b.p_name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                  });
                break;

            case "spprice":
                productlist.sort(function(a,b){return a.p_price-b.p_price});
                break;
        }
        localStorage.setItem("productlist",JSON.stringify(productlist));
        showData();
        
}
// var updatedImage=null;
// function changeimage()
// {
//     updatedImage=document.getElementById("p_image").files;
//     console.log(updatedImage);

// }