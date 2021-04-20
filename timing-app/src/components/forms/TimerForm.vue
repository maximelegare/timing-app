<template>
  <div class="create-timer-container">
    <h2>Timer item</h2>
    <div class="form-container">
      <form @submit.prevent="sendTimer">
        <base-button
          mode="add-item"
          icon="fas fa-plus"
          class="base-button"
        ></base-button>
        <input
          @blur="clearForm('titleIsValid')"
          :class="{ invalid: !titleIsValid }"
          type="text"
          placeholder="Title"
          v-model.trim="title"
          class="element-with-marge"
        />
        <p v-if="!titleIsValid" class="invalid">You must enter a title</p>

        <div class="form-time">
          <input
            @blur="clearForm('timeIsValid')"
            :class="{ invalid: !timeIsValid }"
            type="text"
            placeholder="Hours"
            class="time-input"
            v-model.number="time.hours"
          />
          <input
            @blur="clearForm('timeIsValid')"
            :class="{ invalid: !timeIsValid }"
            type="text"
            placeholder="Minutes"
            class="time-input"
            v-model.number="time.minutes"
          />
          <input
            @blur="clearForm('timeIsValid')"
            :class="{ invalid: !timeIsValid }"
            type="text"
            placeholder="Seconds"
            class="time-input"
            v-model.number="time.seconds"
          />
        </div>
        <p v-if="!timeIsValid" class="invalid">
          You must enter at least one time field
        </p>
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
      titleIsValid: true,
      timeIsValid: true,
      formIsValid: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    sendTimer() {
      this.validateForm();

      if (this.formIsValid === false) {
        return;
      } else {
        const userData = {
          title: this.title,
          time: {
            hours: this.time.hours,
            minutes: this.time.minutes,
            seconds: this.time.seconds,
          },
          userId: this.user,
        };

        const screenMedia = window.matchMedia("(max-width: 900px)")
        if(screenMedia.matches){
          this.$store.dispatch('form/setFormVisibility', false)
        }

        // this.$store.dispatch('form/setFormVisibility', false)
        this.$store.dispatch("timers/addTimer", userData);
        this.$router.push({ name: "timers" });
        this.title = "";
        this.time.hours = null;
        this.time.minutes = null;
        this.time.seconds = null;
        
      }
    },
    validateForm() {
      this.formIsValid = true;
      // let exclude=/^[0-9]+$/;

      if (!this.time.hours) {
        console.log(isNaN)
        this.timeIsValid = false;
        this.formIsValid = false;
      }
      if (!this.time.minutes ) {
        this.timeIsValid = false;
        this.formIsValid = false;
      }
      if (!this.time.seconds) {
        this.timeIsValid = false;
        this.formIsValid = false;
      }

      // if all the time fields are false, set form to false
      if (!this.time.minutes && !this.time.hours && !this.time.seconds) {
        this.timeIsValid = false;
        this.formIsValid = false;
      }
      // if minutes is false, remplace by 0, same for secs and hours
      else {
        if (!this.time.minutes ) {
          this.time.minutes = 0;
        }

        if (!this.time.seconds ) {
          this.time.seconds = 0;
        }

        if (!this.time.hours) {
          this.time.hours = 0;
        }

       

        // if secs, hours, mins are under 0 or not a number
        if (
          this.time.minutes < 0 ||
          this.time.hours < 0 ||
          this.time.hours > 24 ||
          this.time.seconds < 0 ||
          isNaN(this.time.minutes) ||
          isNaN(this.time.hours) ||
          isNaN(this.time.seconds)
        ) {
          this.timeIsValid = false;
          this.formIsValid = false;
        } else {
          this.timeIsValid = true;
          this.formIsValid = true;
        }
        
      }
      if (this.title === "") {
          this.titleIsValid = false;
          this.formIsValid = false;
          console.log("title is invalid");
        }
      console.log(this.formIsValid);
    },
    clearForm(input) {
      this[input] = true;
      this.formIsValid = true;
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}

form {
  width: 400px;
}

h2 {
  margin-bottom: 20px;
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
  justify-content: space-between;
  width: 100%;
}
.time-input {
  width: 30%;
}

input.invalid,
textarea.invalid {
  border: 2px solid #bd0a0a;
}
p.invalid {
  color: #bd0a0a;
  margin-bottom: 20px;
  margin-top: -5px;
  text-align: center;
}

.base-button {
  margin-left: 373px;
  margin-top: 35px;
}

/* @media (max-width: 1120px) {
   form{
        width:350px;
    }
}


@media (max-width: 900px) {
   form{
        width:100%;
    }
} */

@media (max-width: 1120px) {
  form {
    width: 300px;
  }
  .base-button {
    margin-left: 273px;
  }
}
@media (max-width: 400px) {
  form {
    width: 250px;
  }
  .base-button {
    margin-left: 223px;
  }
}
</style>
