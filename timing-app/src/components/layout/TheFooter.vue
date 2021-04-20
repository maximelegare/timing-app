<template>
  <div class="container">
    <div class="text">
      <h3>Made while listening to&nbsp;a&nbsp;lot&nbsp;of&nbsp;<i class="fas fa-music"></i></h3>
      <h4>© Maxime Légaré, {{ year }}</h4>
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        year(){
            return new Date().getFullYear()
        }
    }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  max-height: 100px;
  margin: 0 40px;
  margin-bottom: 30px;

}
h3 {
  color: rgb(129, 127, 127);
  font-size: 1.2rem;
  margin-bottom: 10px;
  line-height: 1.2;
}
h4{
    font-size: 0.8rem;
}
.text{
    text-align: center;
}
</style>
