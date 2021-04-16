<template>
  <transition name="form">
    <div v-if="showForm">
      <div class="create-container">
        <base-button mode="close-form" @click="setForm" class="base-button"
          ><i class="fas fa-times"></i
        ></base-button>
        <note-form class="element n"></note-form>
        <timer-form class="element"></timer-form>
      </div>
    </div>
  </transition>
  <!-- <div class="background" @click="setForm" v-if="showForm"></div> -->
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
}
.create-container {
  margin-right: 70px;
  background-color: rgba(216, 214, 202, 0.24);
  padding: 15px;
  border-radius: 7px;
    box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  
  
  
  /* background-color: rgba(240, 239, 232, 0.911);
  width: 500px;

  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  z-index: 100;
  position: fixed;
  left: 0;
  border-radius: 0 15px 15px 0; */
  /* compensation for TheHeader beeing a fixed element */

  /* margin-top: 200px; */
}

.background {
  position: fixed;
  top: 75px;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(56, 75, 72, 0.247);
  z-index: 3;
}

.element {
  margin: 40px 0;
}
.element.n {
  /* margin-top: 70px; */
}

.form-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.form-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.form-enter-active {
  transition: all 0.3s ease-out;
}
.form-leave-active {
  transition: all 0.3s ease-in;
}

.form-enter-to,
.form-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
