<template>
  <div>
    <the-header></the-header>
    <div class="body-container">
      <form-section class="form-section"></form-section>
      <div class="notes-container">
        <items-header></items-header>
        <div class="items-section">
          <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import ItemsHeader from "./components/layout/ItemsHeader";
import FormSection from "./components/forms/FormSection.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    FormSection,
    ItemsHeader,
    TheFooter,
  },
  mounted() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    showForm() {
      return this.$store.getters["form/showForm"];
    },
  },
  watch: {
    showForm() {
      const mediaScreen = window.matchMedia("(max-width: 900px)")
      if (mediaScreen.matches && this.showForm) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  /* word-break: break-all; */
  word-wrap: break-word;
}

body {
  background-color: rgb(240, 239, 232);
  line-height: 1;
}

.body-container {
  display: flex;
  width: 90%;

  /* compensation for the header beeing fixed */
  margin: 125px auto 80px auto;
  justify-content: space-between;
}

.notes-container {
  width: 105%;
  /* margin-left: 70px; */
  min-height: 60vh;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  transition: 0.2ms all;
}

.form-section-over {
  display: none;
}

.form-section {
  display: block;
}

/* ////////////////////////////
/////////GENERAL-STYLING///////
///////////////////////////// */

ol,
ul {
  list-style: none;
}

h1 {
  font-family: "Comfortaa", cursive;
  font-weight: 500;
  color: white;
  font-size: 2.5rem;
}

h2 {
  color: rgb(83, 70, 70);
  font-family: "Comfortaa", cursive;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
}

h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: rgb(129, 127, 127);
}

h4 {
  font-size: 1.1rem;
  font-weight: 400;
  font-family: "Open Sans", sans-serif;
  color: rgb(160, 160, 147);
  line-height: 1.3;
}
p {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: rgb(160, 160, 147);
}

li {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: rgb(160, 160, 147);
  list-style: none;
}
label {
  font-family: "Comfortaa", cursive;
  color: rgb(83, 70, 70);
  font-size: 1.1rem;
}
button {
  font-family: "Open Sans", sans-serif;
}

/* ////////////////////////////
///////ROUTER-ANIMATION///////
///////////////////////////// */

.route-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* ////////////////////////////
/////////GENERAL-SCALING///////
///////////////////////////// */

/* @media (max-width: 1120px) {
  .body-container {
    width: 90%;
  }
} */

@media (max-width: 900px) {
}

@media (max-width: 800px) {
  a,
  li,
  img {
    cursor: none;
  }
  .curseur {
    cursor: none;
  }
  .body-container {
    margin-bottom: 40px;
  }
}
</style>
