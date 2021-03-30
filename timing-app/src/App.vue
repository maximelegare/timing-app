<template>
  <div>
    <the-header></the-header>
    <div class="body-container">
      <form-section></form-section>
      <div class="notes-container">
        <items-header></items-header>
        <div class="notes-section note-items">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemsHeader from "./components/layout/ItemsHeader";
import FormSection from "./components/forms/FormSection.vue";

import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
    FormSection,
    ItemsHeader,
    
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
}

body {
  background-color: rgb(240, 239, 232);
  line-height: 1;
}

.body-container {
  display: flex;
  width: 80%;
  margin: 50px auto 50px auto;
  justify-content: space-between;
}

.notes-container {
  width: 70%;
  margin-left: 70px;
  min-height: 60vh;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
}

.notes-section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 60px;
}

ol,
ul {
  list-style: none;
}

h1 {
  font-family: "Comfortaa", cursive;
  font-weight: 500;
  color: white;
  font-size: 2.5rem;
  margin-left: 35px;
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
  font-size: 1.5rem;
  color: rgb(129, 127, 127);
}

h4 {
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Open Sans", sans-serif;
  color: rgb(160, 160, 147);
  line-height: 1.3;
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
}
</style>
