
const inputBill = document.querySelector("[data-input-bill]")
const inputPeople = document.querySelector("[data-input-people]")
const buttons = document.querySelectorAll("[data-btn]")
const customInput = document.getElementById("try")
const tipPerPerson = document.getElementById("tipPerPerson")
const totalPerPerson = document.getElementById("totalPerPerson")
const resetBtn = document.getElementById("resetBtn")

let isCompleteInputPeople = false
let isCompleteInputBill = false
let isCompleteCustomInput = false



// active and desactive the color
customInput.addEventListener("click", function(e){
    setValueToDefault()
    const divWherePutErrorMessage = customInput.closest(".padre")
    if (divWherePutErrorMessage.querySelector(".p-error") ) {
        divWherePutErrorMessage.querySelector(".p-error").remove()
    }

    document.querySelectorAll(".activeBtn").forEach(x => x.classList.remove("activeBtn"))
    if(e.target.matches(".active-custom")) {
        document.querySelector(".active-custom").value = ""
        e.target.classList.remove("active-custom") 
        isCompleteCustomInput = false
        return }
    customInput.classList.add("active-custom")
    isEverythingReady()
})


buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        setValueToDefault()
        if(e.target.closest("button").matches(".activeBtn")) {
            e.target.closest("button").classList.remove("activeBtn") 
            isCompleteCustomInput = false
            return }

        document.querySelectorAll(".activeBtn").forEach(x => x.classList.remove("activeBtn"))
        // to return normal property of custom input
        customInput.value = ""
        const divWherePutErrorMessage = customInput.closest(".padre")
        if (divWherePutErrorMessage.querySelector(".p-error") ) {
            divWherePutErrorMessage.querySelector(".p-error").remove()
        }
        if (document.querySelector(".active-custom"))  {
             document.querySelector(".active-custom").classList.remove("active-custom")
            }
        
            
        e.target.closest("button").classList.add("activeBtn")
        isCompleteCustomInput = true
        isEverythingReady()
    })
})


inputPeople.addEventListener("input", function(){
   setValueToDefault()
   checkIsNumberAndNotCero(inputPeople) ? isCompleteInputPeople = true : isCompleteInputPeople = false
   isEverythingReady()
})

inputBill.addEventListener("input", function(){
    setValueToDefault()
    checkIsNumberAndNotCero(inputBill) ? isCompleteInputBill = true : isCompleteInputBill = false
    isEverythingReady()
})

customInput.addEventListener("input", function(){
    setValueToDefault()
    checkIsNumberAndNotCero(customInput) ? isCompleteCustomInput  = true : isCompleteCustomInput  = false
    //to fix an especial event error is when is click, then go to another part, come back to click and write something
    if(!document.querySelector(".active-custom")) { 
        addErrorInputMessage(customInput.closest(".padre"), "Click again in order to accept the number and change the box color")
        return
      } 
    
    isEverythingReady()
})



resetBtn.addEventListener("click", function(){
    setValueToDefault()
    inputBill.value = ""
    inputPeople .value = ""
    customInput.value = ""
    if (document.querySelector(".activeBtn")) { document.querySelector(".activeBtn").classList.remove("activeBtn") }
    if (document.querySelector(".active-custom")) { document.querySelector(".active-custom").classList.remove("active-custom") }
    document.querySelectorAll(".active-formulario").forEach(x => x.classList.remove("active-formulario"))
    isCompleteInputPeople = false
    isCompleteInputBill = false
    isCompleteCustomInput = false
})

/*
   

*/


// FUNCTION

function checkIsNumberAndNotCero(inputElement){
    // eliminate possible error messaje if they where on the specify input
    const divWherePutErrorMessage = inputElement.closest(".padre")
    if (divWherePutErrorMessage.querySelector(".p-error") ) {
        divWherePutErrorMessage.querySelector(".p-error").remove()
    }
    
   // to not appear 0 error when is blank 
   if (inputElement.value === "") return false

   // check is a number and is not cero if it is then error
    inputElement.classList.remove("error")
    if(!isNaN(Number(inputElement.value))){
        if(Number(inputElement.value) === 0 || Number(inputElement.value) < 0 ) {
            addErrorInputMessage(divWherePutErrorMessage, "it cannot be 0 or negative") 
            return false
        } 
        return true
    } else {
        inputElement.classList.add("error")
        addErrorInputMessage(divWherePutErrorMessage, "need a number")
        return false
    }
}

function addErrorInputMessage(divWherePutErrorMessage, text){
    const errorP = document.createElement("p")
    errorP.textContent = text
    errorP.classList.add("p-error")
    divWherePutErrorMessage.querySelector("[data-before]").after(errorP) 
}



function isEverythingReady(){

   if (isCompleteInputBill) {
    inputBill.classList.add("active-formulario") 
   }  else {
    inputBill.classList.remove("active-formulario")
   }

   if(isCompleteInputPeople) {
    inputPeople.classList.add("active-formulario") 
   } else{
    inputPeople.classList.remove("active-formulario")
   }

    if(!isCompleteInputBill) return
    if(!isCompleteInputPeople) return
    if(!isCompleteCustomInput ) return

    resetBtn.classList.add("active-reset")
    
    let billNumber = Number(inputBill.value)
    let peopleNumber = Number (inputPeople.value)
    let tipPorcentaje;

    if(document.querySelector(".active-custom")) {
        tipPorcentaje = Number (customInput.value)
    } else{

       tipPorcentaje = Number (document.querySelector(".activeBtn").querySelector("span").textContent)
       
    }

    let tip = (billNumber * (tipPorcentaje / 100) ) / peopleNumber
    let finalPerPerson = (billNumber + (tip *  peopleNumber) ) / peopleNumber
    finalPerPerson =  Number(finalPerPerson.toFixed(2))
    tip = Number(tip.toFixed(2))
   
    
    
    tipPerPerson.textContent = `${tip}`
    totalPerPerson.textContent = `${finalPerPerson}`
}


function setValueToDefault(){
    tipPerPerson.textContent = `0.00`
    totalPerPerson.textContent = `0.00`
    resetBtn.classList.remove("active-reset")
}