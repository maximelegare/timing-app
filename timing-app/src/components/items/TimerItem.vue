<template>

  <div class="timer-items">
      <div id="timerItemContent" class="timer-items-content">
        <h3 class="title">{{title}}</h3>
        <h3>{{time}}</h3>
      </div>
      <form>
        <base-button mode="delete-timer" icon="fas fa-trash-alt"></base-button>
      </form>
      <form >
        <base-button text="Start Timer" mode="start-timer"></base-button>
        
      </form>
  </div>
</template>

<script>
export default {
  props:['time', 'id', 'title']
}
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
