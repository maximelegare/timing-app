<template>
  <div class="line-container">
    <span :class="route"></span>
  </div>
</template>

<script>
export default {
  props: ["route"],
};
</script>

<style scoped>
span {
  position: relative;
  z-index: 0;
  width: 30px;
  height: 4px;
  background-color: rgb(114, 218, 204);
  border-radius: 10px;
  margin-top: -10px;
}
.line-container{
  display: flex;
  justify-content: center;
}
.timer-route {
  margin-left: -100px;
}
.note-route {
  margin-left: 100px;
}
</style>
