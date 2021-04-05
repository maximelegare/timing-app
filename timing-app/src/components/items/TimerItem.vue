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
    <form @submit.prevent="startTimer">
      <base-button text="Start Timer" mode="start-timer"></base-button>
    </form>
  </div>
</template>

<script>

export default {
  props: ["time", "id", "title"],
  
  data() {
    return {
      timerStatus: false,
      
    };
  },
  methods: {
   startTimer(){
            this.timerStatus = true
         
            let timeValues = {
                hours: this.time.hours,
                minutes: this.time.minutes ,
                seconds: this.time.seconds +1,
                startingTime: new Date().getTime(),
                timerStatus:true,
                timerExpired:false
              }
      
            this.$store.dispatch('timers/startTimer', timeValues)
   },
    deleteTimer() {
      this.$store.dispatch("timers/deleteTimer", this.id);
    },
  },
  // mounted(){
  //   this.timerStatus = this.
  // },
  computed:{
    countdownValues(){  
      const values = this.$store.getters['timers/countdownValues']  
      if(values.hours !== null){
        return values.hours + "h " + (values.minutes < 10 ? "0" : "") + values.minutes + "m " + (values.seconds < 10 ? "0" : "")+ values.seconds + "s "   
      }else{
        return this.time.hours + "h " + (this.time.minutes < 10 ? "0" : "") + this.time.minutes + "m " + (this.time.seconds < 10 ? "0" : "")+ this.time.seconds + "s "
      }
    },
    timeShown(){
      return this.time.hours + "h " + (this.time.minutes < 10 ? "0" : "") + this.time.minutes + "m " + (this.time.seconds < 10 ? "0" : "")+ this.time.seconds + "s "
    },
    timerExpired(){
      return this.$store.getters['timers/timerExpired']
    },
    userLoggedIn(){
      return this.$store.getters.userId
    }
  },
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
