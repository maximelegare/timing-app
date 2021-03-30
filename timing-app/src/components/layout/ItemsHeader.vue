<template>
   <div :class="page" class="notes-header">
      <router-link to="/timer" class="bold" id="timerButton">Timers</router-link>
      <span class="separator"></span>
      <router-link to="/note" class="dim">Notes</router-link>
      <div class="line-header line-header--left"></div>
    </div> 
</template>




<script>
export default {
    // props:{
    //     page:{
    //         type:String,
    //         require:true
    //     }
    // }
}
</script>





<style scoped>
.notes-header{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.line-header{
    position: absolute;
    width: 30px;
    height: 4px;
    background-color:rgb(114, 218, 204);
    border-radius: 10px;
    margin-top: 60px;
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