export default {
  async addTimer(context, payload) {
    const userId = context.rootGetters.userId;
    const timer = {
      title: payload.title,
      time: {
        hours: payload.time.hours,
        minutes: payload.time.minutes,
        seconds: payload.time.seconds,
        startingTime: "",
        timerStatus: false,
        timerExpired:false
      },
    };
    
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers.json`,
      {
        method: "POST",
        body: JSON.stringify(timer),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to send Data");
      throw err;
    }
    context.commit("addTimer", payload);
  },

  async loadTimers(context) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to get the data!");
      throw err;
    }

    const timers = [];

    for (const key in responseData) {
      const timer = {
        id: key,
        title: responseData[key].title,
        time: {
          hours: responseData[key].time.hours,
          minutes: responseData[key].time.minutes,
          seconds: responseData[key].time.seconds,
          startingTime: responseData[key].time.startingTime,
          timerStatus: responseData[key].time.timerStatus,
          timerExpired:responseData[key].time.timerExpired
        },
      };

      timers.push(timer);
    }
    
    // if(timerStatus === true){
    //   context.dispatch('countdown')
    // }

    context.commit("loadTimers", timers);
  },

  async deleteTimer(context, payload) {
    const userId = context.rootGetters.userId;
    const timerId = payload;
    
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers/${timerId}.json`,
      {
        method: "DELETE",
      }
    );
    
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to delete data");
      throw err;
    }

    context.commit("deleteTimer", payload);
  },
  async startTimer(context, payload) {
    const userId = context.rootGetters.userId;
    const timerId = payload.timerId;

    const timerValues = {
      hours: payload.hours,
      minutes: payload.minutes,
      seconds: payload.seconds,
      startingTime: payload.startingTime,
      timerStatus: payload.timerStatus,
      timerExpired: payload.timerExpired
    } 


    
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers/${timerId}/time.json`,
      {
        method: "PUT",
        body: JSON.stringify(timerValues),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || "failed to update DB");
      throw err;
    }

    context.dispatch("countdown", payload);
  },
  countdown(context, payload) {
    
    let hours = payload.hours;
    let minutes = payload.minutes;
    let seconds = payload.seconds;
    let startingTime = payload.startingTime;
    let timerStatus= payload.timerStatus;
    let timerExpired = payload.timerExpired
    let now = startingTime;
    let deadline = timer(now, hours, minutes, seconds);

    

    function timer(date, hours, minutes, seconds) {
      return new Date(
        date + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
      );
    }
    
    

    var x = setInterval(function() {
      // Get todays date and time
      var timeNow = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = deadline - timeNow;

      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"

      let countdownValues = {
        hours,
        minutes,
        seconds,
        timerStatus,
        startingTime,
        timerExpired 
      };

      context.commit("countdownValues", countdownValues);

      // itemTime.innerText = hours + "h " + (minutes < 10 ? "0" : "") + minutes + "m " + (seconds < 10 ? "0" : "")+ seconds + "s ";

      // If the count down is over, write some text

      if (distance < 0) {
        clearInterval(x);
        const expiredCountdown ={
          hours:0,
          minutes:0,
          seconds:0,
          timerStatus:true,
          startingTime,
          timerExpired:true
        }
        context.commit('countdownValues', expiredCountdown)
        console.log('done')
        // timerItem.style.borderLeft = "solid 20px #bd0a0a";

        // itemTime.innerText = "EXPIRED";
        // itemTime.style.color = "#bd0a0a";
      }
    }, 1000);
  },
};
