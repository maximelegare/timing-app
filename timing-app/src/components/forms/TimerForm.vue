<template>
  <div class="create-timer-container">
    <h2>Timer item</h2>
    <div class="form-container">
      <form @submit.prevent="sendTimer">
        <base-button mode="add-button" icon="fas fa-plus"></base-button>
        <input type="text" placeholder="What?" v-model="title"/>

        <div class="form-time">
          <input
            type="text"
            placeholder="hours?"
            class="time-input"
            v-model.number="time.hours"
          />
          <input
            type="text"
            placeholder="minutes?"
            class="time-input"
            v-model.number="time.minutes"
          />
          <input
            type="text"
            placeholder="seconds?"
            class="time-input"
            v-model.number="time.seconds"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      time: {
        hours: null,
        minutes: null,
        seconds: null,
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    sendTimer() {
      
      const userData = {
        title: this.title,
        time: {
          hours:this.time.hours,
          minutes:this.time.minutes,
          seconds:this.time.seconds
        },
        userId: this.user,
      };
      
      this.$store.dispatch("timers/addTimer", userData);
      this.$router.push({name: 'timers'})
      this.title = "";
      this.time.hours = null
      this.time.minutes = null
      this.time.seconds = null
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

form {
  width: 400px;
}

form input,
form textarea {
  width: 100%;
  padding: 15px 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-bottom: 15px;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  resize: none;
}

.form-time {
  display: flex;
  width: 105%;
  justify-content: space-between;
}
.time-input {
  width: 25%;
}
</style>
