<template>
  <button  type="button" :class="mode"><i class="fas fa-plus"></i></button>
</template>

<script>
export default {
  props:['mode']



};
</script>

<style scoped>

button {
  color: white;
  box-shadow: 0px 2px 3px rgba(145, 145, 145, 0.404);
  transition: all 200ms ease;
  position: absolute;
  border: white 3px solid;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
}




.add-button {
  background-color:  rgb(114, 218, 204);
  font-weight: 400;
  font-size: 1.5rem;
  padding: 9px 13px;
  margin-left:390px;
  text-align: center;
  margin-top: 35px;
}
</style>
