<template>
  <div class="create-notes-container">
    <h2>List item</h2>
    <div class="form-container">
      <form>
        <base-button mode="add-button"></base-button>

        <input name="title" type="text" placeholder="Title" />
        <textarea
          name="content"
          type="text"
          placeholder="Content"
          rows="3"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton";

export default {
  components: {
    BaseButton,
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
