<template>
  <base-button
    mode="add-item"
    icon="fas fa-plus"
    class="smaller-screen-add-item-button"
    @click="setForm"
  ></base-button>
  <base-button
    v-if="!formIsVisible"
    mode="text-only-white"
    class="base-button"
    @click="setForm"
    >Add Items...</base-button
  >
  <div :class="page" class="notes-header">
    <router-link :to="{ name: 'timers' }" class="bold" id="timerButton"
      >Timers</router-link
    >
    <span class="separator"></span>
    <router-link :to="{ name: 'notes' }" class="dim" type="button"
      >Notes</router-link
    >
  </div>
</template>

<script>
export default {
  methods: {
    setForm() {
      this.$store.dispatch("form/setFormVisibility", true);
    },
  },
  computed: {
    formIsVisible() {
      return this.$store.getters["form/showForm"];
    },
  },
};
</script>

<style scoped>
.notes-header {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
a:hover {
  color: rgb(114, 218, 204);
}
a.router-link-exact-active {
  color: rgb(114, 218, 204);
}

.base-button {
  margin-left: 20px;
  margin-top: 25px;
  position: absolute;
}

.smaller-screen-add-item-button {
  display: none;
}

@media (max-width: 900px) {
  .base-button {
    display: none;
  }
  .notes-header {
    margin-top: 40px;
  }
  .smaller-screen-add-item-button {
    display: block;
    left:50% ;
    transform: translate(-50%, -50%);
    
  }
}
</style>
