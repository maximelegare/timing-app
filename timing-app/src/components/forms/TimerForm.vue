<template>
  <div class="create-timer-container">
    <h2>Timing item</h2>
    <div class="form-container">
      <form >
        <base-button mode="add-button"></base-button>
        <input type="text" placeholder="What?" />

        <div class="form-time">
          <input
            
            type="text"
            placeholder="hours?"
            class="time-input"
          />
          <input
            
            type="text"
            placeholder="minutes?"
            class="time-input"
          />
          <input
            
            type="text"
            placeholder="seconds?"
            class="time-input"
            maxlength="2"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton';
export default {
  components: { BaseButton },};
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

.form-time{
    display: flex;
    width: 105%;
    justify-content: space-between;
}
.time-input{
    width: 25%;
}



</style>
