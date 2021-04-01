<template>
  <button type="button" :title="text" :class="mode">
    {{ title }}<i :class="icon" v-if="!!icon"></i>
  </button>
</template>

<script>
export default {
  props: ["mode", "icon", "text"],
  data() {
    return {
      title: this.text,
    };
  },
};
</script>

<style scoped>
button {
  color: white;
  box-shadow: 0px 2px 3px rgba(145, 145, 145, 0.404);
  transition: all 200ms ease;
  position: absolute;
  border: white 3px solid;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 9px 13px;
  text-align: center;
}

.delete-timer {
  padding: 7px 11px;
  font-size: 1.3rem;
  border: white 2px solid;
  background-color: #e2e1dc;
  margin-left: 375px;
  margin-top: -125px;
}

.delete-note {
  border: white 2px solid;
  padding: 7px 11px;
  font-size: 1.3rem;
  background-color: #e2e1dc;
  margin-left: 250px;
  margin-top: -11px;
}

.start-timer {
  margin-left: 269px;
  
  border-radius: 0 0 7px 7px;
  padding: 6px 15px;
  background-color: rgb(114, 218, 204);
  border: none;
  font-size: 1.2rem;
  font-weight: 400;
}

.delete-timer:hover,
.delete-note:hover {
  background-color: #bd0a0a;
}

.add-button {
  background-color: rgb(114, 218, 204);
  margin-left: 390px;
  margin-top: 35px;
}
</style>
