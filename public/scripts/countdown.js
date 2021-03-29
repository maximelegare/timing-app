

let timerData = JSON.parse(document.querySelector("#timerD").innerText);

//general website animation(excluding each timer element and list element)
window.onload = function(){
    

    let tl = gsap.timeline();

    tl
        .from(".logo", {
            opacity:0,
            duration:1,
            x:"-20px",
            ease:"elastic.out( 1, 0.2)"
            
        })
        

        .from(".create-container", {
            duration:0.8,
            opacity:0,
            x:"-7%",
            
            ease:"power3.out"
        }, "-=0.7")

        .from(".add-button", {
            scale:0,
            opacity:0,
            duration:1,
            ease:"elastic.out( 1.2, 0.5)"
        }, "-=0.5")

}





timerData.forEach(function(timerElement){
    let hours = timerElement.time.hours
    let minutes = timerElement.time.minutes
    let seconds = timerElement.time.seconds
    
    
    

    let timerItem = document.createElement("div");
    let timerItemContent = document.createElement("div")
    let icon = document.createElement("i")
    let buttonStartText = document.createElement("p")
   
    let itemTitle = document.createElement("h4")
    let itemTime = document.createElement("h3")


    let formContainer = document.createElement("form")
    let button = document.createElement("button") 
    let hiddenInput = document.createElement("input")


    let formContainerStatus = document.createElement("form")
    let buttonStart = document.createElement("button")

  
    timerItem.className = "timer-items";
    timerItemContent.className = "timer-items-content";
    icon.className = "fas fa-trash-alt timer";
    


    formContainer.action = "/delete"
    formContainer.method = "POST"

    button.type = "submit"
    button.name = "itemId"
    button.value = timerElement.id
    button.className = "delete-button timer"
    


    formContainerStatus.action = "/start"
    formContainerStatus.method = "POST"

    buttonStart.type = "submit"
    buttonStart.name = "itemId"
    buttonStart.value = timerElement.id
    buttonStart.className = "timer-start-button"
    
    

    
    hiddenInput.type = "hidden"
    hiddenInput.name = "collection"
    hiddenInput.value = "timer"
    itemTitle.className = "time-title"
  
    itemTime.className = "time-showing"
    itemTime.id = "timer"
    buttonStartText.innerText = "Start Timer"
    

    // html positionning of elements for each timer Item
    timerItem.appendChild(formContainer)
    formContainer.appendChild(button)
    button.appendChild(icon)
    formContainer.appendChild(hiddenInput)
    
    timerItem.appendChild(timerItemContent)
    timerItemContent.appendChild(itemTitle)
    timerItemContent.appendChild(itemTime)
    
    timerItem.appendChild(formContainerStatus)
    formContainerStatus.appendChild(buttonStart)
    buttonStart.appendChild(buttonStartText)
    
    document.querySelector("#noteSection").appendChild(timerItem)



    itemTitle.innerText = (timerElement.title).length < 25 ? timerElement.title : (timerElement.title).substr(0, 25)
    if(!timerElement.status){
        itemTime.innerText = (hours === null ? "0" : hours) + "h " + (minutes < 10 ? "0" : "") + (minutes === null ? "0" : minutes) + "m " + (seconds < 10 ? "0" : "") + (seconds === null ? "0" : seconds) + "s "
        
    }
    
    
   
    buttonStart.addEventListener("click", function(event){
        console.log(timerElement.status)   
            let startingTime = new Date().getTime();
            
            //let startingTimeDB = timerElement.startingTime
            
            startCountdown(startingTime)

            $(formContainerStatus).submit(function(e){
                e.preventDefault();
                
                var data = {itemId:timerElement.id, startingTime:startingTime};
                $.ajax({
                    url:"/start",
                    data:data,
                    type:"POST",
                    success:function(data){}
                })
            })
            
        buttonStart.style.visibility = "hidden" 
        })
    
    
    if(timerElement.status){
        startingTimeDB = Number(timerElement.startingTime)
        startCountdown(startingTimeDB)
        console.log(startingTimeDB + "when refresh")
        
        buttonStart.style.visibility = "hidden" 
    }
    


    // countdown function for each timer element
    function startCountdown(time){
        
        timerItem.style.borderLeft = "solid 20px rgb(114, 218, 204)"
        buttonStart.style.backgroundColor = "#e2e1dc"  
        
        
        // if there's a cookie with the name myClock, use that value as the deadline
        var now = time   
        let deadline = timer(now, hours, minutes, seconds)

        function timer(date, hours, minutes, seconds) {
            return new Date(date + hours*60*60*1000 + minutes*60*1000 + seconds*1000);
        }
    

        console.log(deadline)
        // Update the count down every 1 second
        var x = setInterval(function() {
            
            // Get todays date and time
            var timeNow = new Date().getTime()
            
            // Find the distance between now an the count down date
            var distance = deadline - timeNow;
            
            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Output the result in an element with id="demo"
        
            itemTime.innerText = hours + "h " + (minutes < 10 ? "0" : "") + minutes + "m " + (seconds < 10 ? "0" : "")+ seconds + "s ";


            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                timerItem.style.borderLeft = "solid 20px #bd0a0a"
                
                itemTime.innerText = "EXPIRED";
                itemTime.style.color = "#bd0a0a"
            }
        }, 1000);
    }
});   



