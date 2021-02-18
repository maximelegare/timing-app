let timerData = JSON.parse(document.querySelector("#timerD").innerText);





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

    if(timerElement.status){
        startingTimeDB = Number(timerElement.startingTime)
        startCountdown(startingTimeDB)
        console.log(startingTimeDB + "when refresh")
    }
    
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
    
    if(!timerElement.status){
        
        buttonStart.addEventListener("click", function(){
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
                });
            });
        })
 
    };
    

    
    
    


    hiddenInput.type = "hidden"
    hiddenInput.name = "collection"
    hiddenInput.value = "timer"
    
 

    itemTitle.innerText = (timerElement.title).length < 25 ? timerElement.title : (timerElement.title).substr(0, 25)
    itemTitle.className = "time-title"
  
    itemTime.className = "time-showing"
    itemTime.id = "timer"
    buttonStartText.innerText = "Start Timer"
    
    if(!timerElement.status){
        itemTime.innerText = (hours === null ? "0" : hours) + "h " + (minutes < 10 ? "0" : "") + (minutes === null ? "0" : minutes) + "m " + (seconds < 10 ? "0" : "") + (seconds === null ? "0" : seconds) + "s "
    }
    
    
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





   


// function setCookie(cname,cvalue,exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname+"="+cvalue+"; "+expires;
// }
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0; i<ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1);
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
// window.onload = function startingTimer(){
//     //countdown(prompt("Enter how many minutes you want to count down:"),true);
//       countdown(2,true);
// }












// document.cookie.split(";").map(function(cookie){
//     cookie.split("=").reduce((accumulator, [key, value]) => 
//     ({...accumulator, [key.trim()]: decodeURIComponent(value)}))
// })
// let cookie = document.cookie


// if(cookie.timerCookie === "timerCookie"){
//    deadline = cookie.timerCookie
   
// }else{
//     var hours = time.hours;
//     var minutes = time.minutes;
//     var seconds = time.seconds;
//     var currentTime = Date.parse(new Date());
//     var deadline = new Date(currentTime + hours*60*60*1000 +  minutes*60*1000 + seconds*1000);

//     document.cookie= JSON.stringify("timercookie=" + deadline)
// }







