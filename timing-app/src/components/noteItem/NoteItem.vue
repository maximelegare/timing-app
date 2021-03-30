<template>
  <div class="note">
    <form action="/delete" method="POST">
      <button
        type="submit"
        name="itemId"
        class="delete-button list"
        value="<%= foundListItem.id %>"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
      <input type="hidden" name="collection" value="list" />
    </form>
    <!-- <h3><%=(foundListItem.title).length < 20 ? foundListItem.title : (foundListItem.title).substr(0, 20) + " ..."  %></h3> -->
    <!-- <h4><%=(foundListItem.content).length < 90 ? foundListItem.content : (foundListItem.content).substr(0, 90) + " ..." %></h4> -->
    <!-- <a href="#" class="list-more"><%=(foundListItem.content).length < 90 ? "" : "more" %></a> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.note{
    margin: 30px 10px;
    width:300px;
    height: 300px;
    background-image: url('../../assets/img/post-it.svg');
    background-repeat: none;
    background-size: cover;
}</style>
