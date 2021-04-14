<template>
  <div class="create-notes-container">
    <h2>Note item</h2>
    <div class="form-container">
      <form @submit.prevent="sendNote">
        <base-button mode="add-item" icon="fas fa-plus"></base-button>

        <input
          :class="{ invalid: !titleIsValid }"
          type="text"
          placeholder="Title"
          v-model.trim="title"
          @blur="clearValidity('titleIsValid')"
        />
        <p class="invalid" v-if="!titleIsValid">You must enter a Title</p>
        <textarea
          :class="{ invalid: !contentIsValid }"
          @blur="clearValidity('contentIsValid')"
          v-model.trim="content"
          type="text"
          placeholder="Content"
          rows="3"
        ></textarea>
        <p class="invalid" v-if="!contentIsValid">You must enter some content</p>
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
      formIsValid: true,
      contentIsValid: true,
      titleIsValid: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    sendNote() {
      this.validateForm();

      console.log(this.formIsValid);

      if (!this.formIsValid) {
        console.log("cannot submit");
        return;
      }

      this.$store.dispatch("notes/addNote", {
        title: this.title,
        content: this.content,
        userId: this.user,
      });
      this.$router.replace({ name: "notes" });

      this.title = "";
      this.content = "";
    },
    validateForm() {
      this.formIsValid = true;
      if (this.title === "") {
        this.titleIsValid = false;
        this.formIsValid = false;
      }
      if (this.content === "") {
        this.contentIsValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(input) {
      this[input] = true;
      this.formIsValid = true;
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

.create-notes-container {
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
input.invalid,
textarea.invalid {
  border: 2px solid #bd0a0a;
}
p.invalid{
  color:#bd0a0a;
  margin-bottom: 20px;
  margin-top: -5px;
  text-align: center;
}
</style>
