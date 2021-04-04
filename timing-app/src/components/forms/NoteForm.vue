<template>
  <div class="create-notes-container">
    <h2>Note item</h2>
    <div class="form-container">
      <form @submit.prevent="sendNote">
        <base-button mode="add-button" icon="fas fa-plus"></base-button>

        <input type="text" placeholder="Title" v-model="title" />
        <textarea
          v-model="content"
          type="text"
          placeholder="Content"
          rows="3"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    sendNote() {
      this.$store.dispatch("notes/addNote", {
        title: this.title,
        content: this.content,
        userId:this.user
      });
      this.$router.push({name: 'notes'})
      this.title = "";
      this.content = "";
      
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

form {
  width: 400px;
}

form input,
form textarea {
  width: 100%;
  padding: 15px 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-bottom: 15px;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  resize: none;
}
</style>
