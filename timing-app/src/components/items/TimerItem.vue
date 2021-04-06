<template>
  <div class="timer-items">
    <div id="timerItemContent" class="timer-items-content">
      <h3 class="title">{{ title }}</h3>
      <h3 v-if="!timerStatus && !expirationStatus">{{ timeShown }}</h3>
      <h3 v-else-if="timerStatus && !timerExpired">{{ countdownValues }}</h3>
      <h3 v-else-if="timerStatus && timerExpired">EXPIRED</h3>
    </div>
    <form @submit.prevent="deleteTimer">
      <base-button mode="delete-timer" icon="fas fa-trash-alt"></base-button>
    </form>
    <form @submit.prevent="timerRequestDB">
      <base-button text="Start Timer" mode="start-timer"></base-button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["time", "id", "title"],

  data() {
    return {
      displayHours: null,
      displayMinutes: null,
      displaySeconds: null,
      timerStatus: false,
      startingTime: null,
      timerExpired: false,
    };
  },
  mounted() {
    this.timerStatusValidation();
  },

  computed: {
    countdownValues() {
      // const values = this.$store.getters["timers/countdownValues"];
      // return this.seconds;

      if (this.displayHours !== null) {
        return (
         (this.displayHours < 10 ? "0" : "") +
          this.displayHours +
          "h " +
          (this.displayMinutes < 10 ? "0" : "") +
          this.displayMinutes +
          "m " +
          (this.displaySeconds < 10 ? "0" : "") +
          this.displaySeconds +
          "s "
        );
      } else {
        return (
          (this.time.hours < 10 ? "0" : "") +
          this.time.hours +
          "h " +
          (this.time.minutes < 10 ? "0" : "") +
          this.time.minutes +
          "m " +
          (this.time.seconds < 10 ? "0" : "") +
          this.time.seconds +
          "s "
        );
      }
    },

    timeShown() {
      return (
        (this.time.hours < 10 ? "0" : "") +
          this.time.hours +
          "h " +
        (this.time.minutes < 10 ? "0" : "") +
        this.time.minutes +
        "m " +
        (this.time.seconds < 10 ? "0" : "") +
        this.time.seconds +
        "s "
      );
    },

    userLoggedIn() {
      return this.$store.getters.userId;
    },
  },
  methods: {
   async timerStatusValidation() {
      const userId = this.userLoggedIn;

      const timerId = this.id;
      const response = await fetch(
        `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers/${timerId}/time.json`);


      const responseData = await response.json();
      if(responseData === null){
        return
      }
      else if (!response.ok) {
        const err = new Error(responseData.message || "failed to update DB");
        throw err;
      }

    

      if(responseData.timerStatus === true){
        this.timerStatus = true
        const timerDBvalues = {
          hours: responseData.hours,
          minutes:responseData.minutes,
          seconds:responseData.seconds,
          startingTime:responseData.startingTime
        }
        this.countdown(timerDBvalues)
      }else{
        return
      }

    },
    async timerRequestDB() {
      this.timerStatus = true;

      const userId = this.userLoggedIn;

      const timerId = this.id;

      const timerValues = {
        hours: this.time.hours,
        minutes: this.time.minutes,
        seconds: this.time.seconds + 1,
        startingTime: new Date().getTime(),
        timerStatus: true,
        timerExpired: false,
      };

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


      
      this.countdown(timerValues);
    },
    countdown(payload) {
      let hours = payload.hours;
      let minutes = payload.minutes;
      let seconds = payload.seconds;
      let startingTime = payload.startingTime;

      let now = startingTime;
      let deadline = timer(now, hours, minutes, seconds);

      

      function timer(date, hours, minutes, seconds) {
        return new Date(
          date + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
        );
      }

      var x = setInterval(() => {
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

        this.displayHours = hours;
        this.displayMinutes = minutes;
        this.displaySeconds = seconds;

        

       

        //   context.commit("countdownValues", countdownValues);

        // itemTime.innerText = hours + "h " + (minutes < 10 ? "0" : "") + minutes + "m " + (seconds < 10 ? "0" : "")+ seconds + "s ";

        // If the count down is over, write some text

        if (distance < 0) {
          clearInterval(x);

          this.hours = 0;
          this.minutes = 0;
          (this.seconds = 0),
            (this.timerStatus = true),
            //   startingTime,
            (this.timerExpired = true);

          // context.commit('countdownValues', expiredCountdown)
      
          // timerItem.style.borderLeft = "solid 20px #bd0a0a";

          // itemTime.innerText = "EXPIRED";
          // itemTime.style.color = "#bd0a0a";
        }
      }, 1000);
    },

    deleteTimer() {
      this.$store.dispatch("timers/deleteTimer", this.id);
    },
  },
  // mounted(){
  //   this.timerStatus = this.
  // },

  created() {
    if (this.id === undefined) {
      this.$emit("loadTimers");
    }
  },
};
</script>

<style scoped>
.timer-items {
  margin: 40px 10px;
  border-left: solid 20px #e2e1dc;
  width: 400px;
  height: 100px;
  background-color: rgb(240, 239, 232);
  border-radius: 5px 5px 0px 5px;
  box-shadow: 0px 4px 6px rgba(126, 126, 126, 0.404);
}

.timer-items-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3.title {
  margin-left: 10px;
  text-align: left;
  width: 200px;
}
</style>
