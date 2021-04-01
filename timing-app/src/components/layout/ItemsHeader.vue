<template>
   <div :class="page" class="notes-header">
      <router-link to="timer" class="bold" id="timerButton">Timers</router-link>
      <span class="separator"></span>
      <router-link to="note" class="dim" type="button">Notes</router-link>
      <item-header-line></item-header-line>
    </div> 
</template>




<script>
import ItemHeaderLine from './ItemHeaderLine.vue'
export default {
    components:{
        ItemHeaderLine
    },
   
}
</script>





<style scoped>
.notes-header{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}


 a {
  color: rgb(83, 70, 70);
  font-family: "Comfortaa", cursive;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  transition: all 200ms ease;
  text-decoration: none;
  width: 100px;
  
}


</style>