const user = document.querySelector("#user");
const pass = document.querySelector("#pass");
const btn = document.querySelector("#btn");
console.log(user,pass,btn)


btn.addEventListener("click", ()=>{
    if(user.value==="Amine" && pass.value==="251008"){
    window.location.href="../store/store.html";}
    else{
    window.alert("Invalid information, please try again");
}
});
