<template>
  <div class="note">
    <form>
      <base-button icon="fas fa-trash-alt" mode="delete-note"></base-button>
      <input type="hidden" name="collection" value="list" />
    </form>
    <h3>{{title}}</h3>
    <h4>{{ content }}</h4>

    <!-- <h3><%=(foundListItem.title).length < 20 ? foundListItem.title : (foundListItem.title).substr(0, 20) + " ..."  %></h3> -->
    <!-- <h4><%=(foundListItem.content).length < 90 ? foundListItem.content : (foundListItem.content).substr(0, 90) + " ..." %></h4> -->
    <!-- <a href="#" class="list-more"><%=(foundListItem.content).length < 90 ? "" : "more" %></a> -->
  </div>
</template>

<script>
export default {
  props:['id', 'content', 'title']
};
</script>

<style scoped>
.note{
    margin: 30px 10px;
    width:300px;
    height: 300px;
    background-image: url('../../assets/img/post-it.svg');
    background-repeat: none;
    background-size: cover;
    
}

h3{
    padding-top: 5px;
    width: 240px;  
    margin: 40px auto 0 auto;
    line-height: 1.2;
    text-align: center;
     
}

h4{
    width: 240px;
    margin: 7px auto 0 auto;
    text-align: center;
} 
</style>
