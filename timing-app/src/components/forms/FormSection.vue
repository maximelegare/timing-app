<template>
  <transition name="form" appear>
    <div v-if="showForm">
      <div class="create-container">
        <base-button mode="close-form" @click="setForm" class="base-button"
          ><i class="fas fa-times"></i
        ></base-button>
        <note-form class="element n"></note-form>
        <timer-form class="element"></timer-form>
      </div>
      <div class="background" @click="setForm"></div>
    </div>
  </transition>
  <!-- <div class="backdrop" v-if="showForm"></div> -->
</template>

<script>
import NoteForm from "./NoteForm.vue";
import TimerForm from "./TimerForm.vue";

export default {
  components: { NoteForm, TimerForm },
  methods: {
    setForm() {
      this.$store.dispatch("form/setFormVisibility", false);
    },
  },
  computed: {
    showForm() {
      return this.$store.getters["form/showForm"];
    },
  },
};
</script>

<style scoped>
.base-button {
  position: absolute;
  margin-left: 360px;
  align-items: center;
}
.create-container {
  margin-right: 70px;
  background-color: #ebe9e1;
  padding: 15px 35px;
  border-radius: 7px;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  z-index: 100;
}
.backdrop {
  position: fixed;
  width: 100vh;
  height: 100vh;
  z-index: 10;
  background-color: transparent;
}
.background {
  display: none;
}

.element {
  margin: 40px 0;
}
.element.n {
  /* margin-top: 70px; */
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
.form-enter-active {
  transition: all 0.3s ease-out;
}
.form-leave-active {
  transition: all 0.3s ease-in;
}

@media (max-width: 1120px) {
  .base-button {
    margin-left: 260px;
  }
}

@media (max-width: 900px) {
  .create-container {
    /* margin-right: 0; */
    width: 400px;
    height: 100vh;
    padding: 0;
    box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
    z-index: 300;
    position: fixed;
    margin-left: -50px;
    margin-top: -40px;
    border-radius: 0 15px 15px 0;

    /* top: 0; */
    /* margin-top: 90px; */
    /* background-color: rgba(240, 239, 232); */
    /* compensation for TheHeader beeing a fixed element */
  }
  .background {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    z-index: 100;
  }
  .base-button {
    margin-left: 315px;
  }
}

@media (max-width:400px){
  .base-button {
  margin-left: 300px;
}
}
</style>
