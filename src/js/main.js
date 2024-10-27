///<reference types = "../@types/jquery"/>
let rowData = document.getElementById('rowData')
let searchContainer = document.getElementById('searchContainer')
let submitBtn;
$(document).ready(()=>{
    searchByName("").then(()=>{
        $('.loadingScreen').fadeOut()
        $('body').css('overflow','visible')
    })
    
})

function openNav(){
    $('.navBtn').addClass('fa-close');
    $('.sideBar').animate({left:'0px'});
    for(let  i = 0; i < 5; i++){
        $('.links li').eq(i).animate({top:'0px'},(i+5)*100)
    }

}
function closeNav(){
    let boxWidth = $('.navTabs').outerWidth()
    $('.navBtn').removeClass('fa-close');
    $('.sideBar').animate({left:-boxWidth});
    for(let  i = 0; i < 5; i++){
        $('.links li').eq(i).animate({top:'300px'},(i+5)*100)
    }

}
closeNav()
$(".navBtn").on('click',() => {
    if ($(".sideBar").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
function  displayMaeals(arr){
    displayData=''
    for(let i = 0; i < arr.length; i++){
        displayData += `
        <div class="w-full md:w-1/4 p-2 ">
        <div class="meal relative overflow-hidden rounded-lg cursor-pointer group" id="${arr[i].idMeal}">
        <img src="${arr[i].strMealThumb}" class="w-full" alt="">
        <div class="mealLayer absolute flex justify-start items-center bg-slate-50 opacity-70 transition-all duration-500 text-black p-2 w-full h-full top-full group-hover:top-0 ">
        <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>
    `
}
rowData.innerHTML=displayData
$('.meal').on('click',function(){
    let term = this.id
    getMealDetails(term)
    
    searchContainer.innerHTML = ''
})
}
// search

$('.search').on('click',()=>{
    $('.loadingScreen').fadeIn(300)
    closeNav()
    showSearchInputs()
    $('.loadingScreen').fadeOut(300) 
})
function showSearchInputs(){
    searchContainer.innerHTML=`
    <div class="flex py-4 gap-1">
        <div class="w-full md:w-1/2 px-2">
        <input  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" id="searchByName" type="text" placeholder="Search By Name">
        </div>
        <div class="w-full md:w-1/2 px-2">
        <input  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" id="searchByFirstLetter" maxlength="1" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML=''
    $('#searchByName').on('keyup',function(){
        $('.innerloading').fadeIn(300)
        let term =  $(this).val()
        searchByName(term)
        $('.innerloading').fadeOut(300)
    })
    $('#searchByFirstLetter').on('keyup',function(){
        $('.innerloading').fadeIn(300)
        let term =  $(this).val()
        searchByFirstLetter(term)
        $('.innerloading').fadeOut(300)
    })

}

async function searchByName(term){
    closeNav()
    rowData.innerHTML = ''
    $('.innerLoading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await response.json()
    data.meals ? displayMaeals(data.meals) : displayMaeals([])
    $('.innerLoading').fadeOut(300)
    
}
async function searchByFirstLetter(term){
    closeNav()
    rowData.innerHTML = ''
    $('.innerLoading').fadeIn(300)
    term == " " ? term = "a" : ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data = await response.json()
    data.meals ? displayMaeals(data.meals) : displayMaeals([])
    $('.innerLoading').fadeOut(300)
}
// end of serach
// start of categories

$('.categories').on('click',()=>{
    $('.loadingScreen').fadeIn(300)
    closeNav()
    getCategories()
    $('.loadingScreen').fadeOut(300)
})

async function getCategories(){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await response.json()
    data.categories ? displayCategories(data.categories) : displayCategories([])
    closeNav()
}
function  displayCategories(arr){
    let displayData = ''
    for(let i = 0; i < arr.length; i++){
        displayData += `
        <div class="w-full md:w-1/4 p-2">
        <div  class="meal relative overflow-hidden  rounded-lg cursor-pointer group">
        <img src="${arr[i].strCategoryThumb}" class="w-full" alt="">
        <div class="mealLayer absolute flex justify-center items-center flex-col group-hover:top-0 w-full h-full top-full bg-slate-50 opacity-70 transition-all duration-500 text-black p-2">
            <h3>${arr[i].strCategory}</h3>
            <p class="text-sm text-center">${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </div>
        </div>
    `
    
}
rowData.innerHTML= displayData
$('.meal').on('click',function(){
    let term =  $(this).find('.mealLayer h3').text()
    getCategorieMeals(term)
})
}
async function getCategorieMeals(term){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    $('.innerLoading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
    let data = await response.json()
    data.meals ? displayMaeals(data.meals.slice(0,20)) : displayMaeals([])
    closeNav()
    $('.innerLoading').fadeOut(300)
}
// // end of  categories
// // start of area

$('.area').on('click',()=>{
    $('.loadingScreen').fadeIn(300)
    closeNav()
    getArea()
    $('.loadingScreen').fadeOut(300)
})
async function getArea(){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let data = await response.json()
    data.meals ? displayArea(data.meals) : displayArea([])
    closeNav()
}
function displayArea(arr){
    rowData.innerHTML = ''
    let displayData=''
    for(let i = 0; i < arr.length; i++){
        displayData += `
        <div class="w-full md:w-1/4 p-2">
            <div class="rounded-lg text-center cursor-pointer city text-red-900">
            <i class="fa-solid fa-house-laptop fa-3x "></i>
            <h3 class="text-2xl">${arr[i].strArea}</h3>
            </div>
        </div>
        `
}
rowData.innerHTML = displayData
$('.city').on('click',function(){
    let term =  $(this).find('h3').text()
    getAreaeMeals(term)
})
}
async function getAreaeMeals(term){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    $('.innerLoading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
    let data = await response.json()
    data.meals ? displayMaeals(data.meals.slice(0,20)) : displayMaeals([])
    $('.innerLoading').fadeOut(300)
    closeNav()
}
//  // end of area
//  // start of Ingredients

$('.ingredients').on('click',()=>{
    $('.loadingScreen').fadeIn(300)
    closeNav()
    getIngredients()
    $('.loadingScreen').fadeOut(300)
})
async function getIngredients(){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let data = await response.json()
    data.meals ? displayIngredients(data.meals.slice(0,20)) : displayIngredients([])
    closeNav()
    
}
function displayIngredients(arr){
    rowData.innerHTML = ''
    let displayData=''
    for(let i = 0; i < arr.length; i++){
        
        displayData+=`
        <div class="w-full md:w-1/4 p-2">
            <div class="rounded-lg text-center cursor-pointer Ingredients">
            <i class="fa-solid fa-drumstick-bite fa-3x  text-yellow-500"></i>
            <h3 class="text-2xl">${arr[i].strIngredient}</h3>
            <p class="text-sm">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
        `
}
rowData.innerHTML = displayData
$('.Ingredients').on('click',function(){
    let term =  $(this).find('h3').text()
    getIngredientsMeals(term)
})
}
async function getIngredientsMeals(term){
    rowData.innerHTML = ''
    searchContainer.innerHTML=''
    $('.innerLoading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
    let data = await response.json()
    data.meals ? displayMaeals(data.meals.slice(0.20)) : displayMaeals([])
    $('.innerLoading').fadeOut(300)
    closeNav()
}
// // end of ind
// // start of details

async function getMealDetails(term) {
    rowData.innerHTML = ''
    $('.innerLoading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${term}`)
    let data =  await response.json()
    data.meals  ? displayMealDetails(data.meals[0]) : displayMealDetails([])
    $('.innerLoading').fadeOut(300)
    
    
    closeNav
}
function  displayMealDetails(arr){
    rowData.innerHTML = ''
    let Ingredient = ''
    
    for (let i = 1; i <= 20; i++) {
            if (arr[`strIngredient${i}`]) {
                Ingredient += `<li class="alert-blue btn my-2 p-2">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
            }
    }
    let tags = arr.strTags?.split(',')  
    if (!tags) tags =[]
    let tagsStr =''
    for (let i=0;i<tags.length;i++){
        tagsStr+=`
          <li class="alert-red btn my-6 p-2">${tags[i]}</li>  
        `
    }
    let displayData = `<div class="w-full md:w-4/12 p-2">
                            <img class="w-full rounded-xl" src="${arr.strMealThumb}" alt="">
                            <h2>${arr.strMeal}</h2>
                        </div>
                        <div class="w-full md:w-8/12 p-2">
                            <h2>Instructions</h2>
                            <p class="text-lg font-normal">${arr.strInstructions}</p>
                            <h3><span class="font-bold">Area : </span>${arr.strArea}</h3>
                            <h3><span class="font-bold">Category : </span>${arr.strCategory}</h3>
                            <h3>Recipes :</h3>
                            <ul class="list-none flex gap-2 flex-wrap">
                                ${Ingredient}
                            </ul>

                            <h3>Tags :</h3>
                            <ul class="list-none flex gap-2 flex-wrap">
                                ${tagsStr}
                            </ul>

                            <a target="_blank" href="${arr.strSource}" class="btn btn-green">Source</a>
                            <a target="_blank" href="${arr.strYoutube}" class="btn btn-red">Youtube</a>
            </div>`

rowData.innerHTML = displayData     

}

// //   end of  details
// //   start of  contact
$('.contactUs').on('click',()=>{
    $('.loadingScreen').fadeIn(300)
    showContact()
    closeNav()
    $('.loadingScreen').fadeOut(300)
})

function showContact(){
    rowData.innerHTML=''
    searchContainer.innerHTML=''
    displayData=`<form class="contact min-h-screen flex justify-center items-center w-full">
    <div class="container w-6/7 mx-auto text-center flex flex-wrap justify-center items-center">
        
            <div class="w-full md:w-1/2 p-2 ">
                <input id="fullName" type="text" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Enter Your Name">
                <div id="fullNameAlert" class="btn alert-red w-full mt-2 hidden fullNameAlert">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <input id="email" type="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Enter Your Email">
                <div id="emailAlert" class="btn alert-red w-full mt-2 hidden emailAlert">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <input id="phone" type="text" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="btn alert-red w-full mt-2 hidden phoneAlert">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <input id="age" type="number" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Enter Your Age" >
                <div id="ageAlert" class="btn alert-red w-full mt-2 hidden ageAlert">
                    Enter valid age
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <input  id="password" type="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Enter Your Password">
                <div id="passwordAlert" class="btn alert-red w-full mt-2 hidden passwordAlert">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <input  id="repassword" type="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 " placeholder="Confirme">
                <div id="repasswordAlert" class="btn alert-red w-full mt-2 hidden repasswordAlert">
                    Enter The Same Password
                </div>
            </div>
        
        <button id="submitBtn" disabled class="disabled:opacity-65 btn bg-red-500 border-red-900 text-white hover:bg-red-900 px-2 mt-3">Submit</button>
    </div>
</form> `
    rowData.innerHTML = displayData;
    $('.contact input').on('keyup',()=>{
        inputsValidation()
    })
    submitBtn = document.getElementById('submitBtn');
    $('#fullName').on('focus',()=>{fullNameInputFocus = true})
    $('#email').on('focus',()=>{emailInputFocus = true})
    $('#phone').on('focus',()=>{phoneInputFocus = true})
    $('#age').on('focus',()=>{ageInputFocus = true})
    $('#password').on('focus',()=>{passwordInputFocus = true})
    $('#repassword').on('focus',()=>{repasswordInputFocus = true})
}
let fullNameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passwordInputFocus = false;
let repasswordInputFocus = false;
function inputsValidation() {
    if (fullNameInputFocus) {
        if (nameValidation()) {
            document.getElementById("fullNameAlert").classList.replace("block", "hidden")

        } else {
            document.getElementById("fullNameAlert").classList.replace("hidden", "block")
        }
    }
    if (emailInputFocus) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("emailAlert").classList.replace("hidden", "block")
        }
    }

    if (phoneInputFocus) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("phoneAlert").classList.replace("hidden", "block")
        }
    }
    if (ageInputFocus) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("ageAlert").classList.replace("hidden", "block")
        }
    }
    if (passwordInputFocus) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("passwordAlert").classList.replace("hidden", "block")

        }
    }
    if (repasswordInputFocus) {
        if (repasswordCheck()) {
            document.getElementById("repasswordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("repasswordAlert").classList.replace("hidden", "block")

        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordCheck()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
        
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("fullName").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordCheck(){
    if(document.getElementById('repassword').value == document.getElementById('password').value){
        return true
    }else{
        return false
    }
}