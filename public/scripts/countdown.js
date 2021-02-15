let timerData = JSON.parse(document.querySelector("#timerD").innerText);


timerData.forEach(function(timerElement){
    let hour = timerElement.time.hours
    let min = timerElement.time.minutes
    let sec = timerElement.time.seconds


    let timerItem = document.createElement("div");
    let timerItemContent = document.createElement("div")
    let icon = document.createElement("i")
    let buttonStartText = document.createElement("p")
   
    let itemTitle = document.createElement("h3")
    let itemTime = document.createElement("h3")


    let formContainer = document.createElement("form")
    let button = document.createElement("button") 
    let hiddenInput = document.createElement("input")


    let formContainerStatus = document.createElement("form")
    let buttonStart = document.createElement("button")

    
    
    timerItem.className = "timer-items";
    timerItemContent.className = "timer-items-content";
    icon.className = "fas fa-trash-alt";
    


    formContainer.action = "/delete"
    formContainer.method = "POST"

    button.type = "submit"
    button.name = "itemId"
    button.value = timerElement.id
    button.className = "timer-delete-button"
    


    formContainerStatus.action = "/start"
    formContainerStatus.method = "POST"

    buttonStart.type = "submit"
    buttonStart.name = "itemId"
    buttonStart.value = timerElement.id
    buttonStart.className = "timer-start-button"
    
    buttonStart.addEventListener("click", function(e){
        
        startCountdown(timerElement.time)
    });
    
    $(formContainerStatus).submit(function(e){
        e.preventDefault();
        var mm = {itemId:timerElement.id};
        $.ajax({
            url:"/start",
            data:mm,
            type:"POST",
            success:function(data){
    
            }
        });
    });
    
    
    


    hiddenInput.type = "hidden"
    hiddenInput.name = "collection"
    hiddenInput.value = "timer"
    
 



    itemTitle.innerText = timerElement.title
    
    itemTime.id = "timer"
    buttonStartText.innerText = "Start Timer"
    itemTime.innerText = hour + ":" + min + ":" + sec



    timerItem.appendChild(timerItemContent)
    timerItemContent.appendChild(itemTitle)
    timerItemContent.appendChild(itemTime)

    timerItem.appendChild(formContainer)
    formContainer.appendChild(button)
    button.appendChild(icon)
    formContainer.appendChild(hiddenInput)


    timerItem.appendChild(formContainerStatus)
    formContainerStatus.appendChild(buttonStart)
    buttonStart.appendChild(buttonStartText)

       
    document.querySelector("#noteSection").appendChild(timerItem)

    
    function startCountdown(time){
       
        console.log("timerStarted");
        console.log("clicked");
        var dayNow = new Date().getDay()

        console.log(dayNow);
        var yearNow = new Date().getDay()
        console.log(yearNow);
        
        
        
        // var countDownDate = new Date("'" + dayNow +", " + yearNow + " " + timeNow + time ).getTime();
        
        // Update the count down every 1 second
            var x 
            clearInterval(x)
            x = setTimeout(interval(), 1000);

        }
        function interval(time){
            
            var countDownDate = new Date("Sep 25, 2025 17:10:00"  ).getTime();
            var timeNow = new Date().getTime();
            // Get todays date and time

            console.log("we're in!!!");
            // Find the distance between now an the count down date
            var distance = countDownDate - timeNow;

            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            itemTime.innerText = hours + "h "
            + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x)
                document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }

} 
);   





// console.log("here")

// for (;;){
// timerData.forEach(function(timerElement){
//     if(timerElement.status){
//         startCountdown(timerElement.time, itemTime)  
//         console.log(timerElement.status)
//     }   
// })
// }

   













































