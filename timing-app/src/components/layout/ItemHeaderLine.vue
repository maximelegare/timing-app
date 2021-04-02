<template>
  <span :class="route"></span>
</template>

<script>
export default {
props:['route']
 
};
</script>

<style scoped>
span {
  position: absolute;
  width: 30px;
  height: 4px;
  background-color: rgb(114, 218, 204);
  border-radius: 10px;
  margin-top: -10px;
}
.timer-route {
  margin-left: -100px;
}
.note-route {
  margin-left: 100px;
}
</style>
