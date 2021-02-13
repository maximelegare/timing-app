let timerData = JSON.parse(document.querySelector("#timerD").innerText);
console.log(timerData)



timerData.forEach(function(timerElement){

    let timerItem = document.createElement("div");
    let timerItemContent = document.createElement("div")
    let icon = document.createElement("i")
   
    let itemTitle = document.createElement("h3")
    let itemTime = document.createElement("h3")


    let formContainer = document.createElement("form")
    let button = document.createElement("button") 
    let hiddenInput = document.createElement("input")

    

    timerItem.className = "timer-items";
    timerItemContent.className = "timer-items-content";
    icon.className = "fas fa-trash-alt";
    


    formContainer.action = "/delete"
    formContainer.method = "POST"

    button.type = "submit"
    button.name = "itemId"
    button.value = timerElement.id
    button.onclick = "deleteTimerItem()"

    hiddenInput.type = "hidden"
    hiddenInput.name = "collection"
    hiddenInput.value = "timer"

    itemTitle.innerText = timerElement.title
    itemTime.innerText = timerElement.time
    

    timerItem.appendChild(timerItemContent)
    timerItemContent.appendChild(itemTitle)
    timerItemContent.appendChild(itemTime)

    timerItem.appendChild(formContainer)
    formContainer.appendChild(button)
    button.appendChild(icon)
    formContainer.appendChild(hiddenInput)
       
    document.querySelector("#noteSection").appendChild(timerItem)
})













































