<template>
  <li class="note">
    <form @submit.prevent="deleteNote">
      <base-button
        icon="fas fa-trash-alt"
        mode="delete-note"
        class="delete-note-button-position"
      ></base-button>
      <input type="hidden" name="collection" value="list" />
    </form>
    <h3>{{ itemTitle }}</h3>
    <h4>{{ itemContent }}</h4>

    <!-- <h3><%=(foundListItem.title).length < 20 ? foundListItem.title : (foundListItem.title).substr(0, 20) + " ..."  %></h3> -->
    <!-- <h4><%=(foundListItem.content).length < 90 ? foundListItem.content : (foundListItem.content).substr(0, 90) + " ..." %></h4> -->
    <!-- <a href="#" class="list-more"><%=(foundListItem.content).length < 90 ? "" : "more" %></a> -->
  </li>
</template>

<script>
var _ = require("lodash");
export default {
  emits: ["unmount"],
  props: ["id", "content", "title"],
  methods: {
    deleteNote() {
      this.$store.dispatch("notes/deleteNote", this.id);
    },
  },
  created() {
    if (this.id === undefined) {
      this.$emit("loadNotes");
    }
  },
  computed: {
    itemTitle() {
      return this.title.length < 25
        ? _.capitalize(this.title)
        : _.capitalize(this.title).substr(0, 25) + "...";
    },
    itemContent() {
      return this.content.length < 50
        ? _.capitalize(this.content)
        : _.capitalize(this.content).substr(0, 50) + "...";
    },
  },
};
</script>

<style scoped>

.note {
  margin: 30px 10px;
  width: 300px;
  height: 300px;
  background-image: url("../../assets/img/post-it.svg");
  background-repeat: none;
  background-size: cover;
}

div h3 {
  padding-top: 5px;
  width: 240px;
  margin: 40px auto 0 auto;
  line-height: 1.2;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
}
.items-section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 60px;
}

div h4 {
  width: 240px;
  margin: 7px auto 0 auto;
  text-align: center;
}
.delete-note-button-position {
  margin-left: 250px;
  margin-top: -11px;
}
@media (max-width: 400px) {
  .note {
    width: 270px;
    height: 270px;
  }
  .delete-note-button-position {
  margin-left: 225px;
  margin-top: -11px;
}
}
</style>
