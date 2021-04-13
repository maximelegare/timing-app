<template>
  <button :title="text" :class="mode">
    <slot> {{ title }}<i :class="icon" v-if="!!icon"></i> </slot>
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
  box-shadow: 0px 2px 3px rgba(145, 145, 145, 0.404);
  transition: all 200ms ease;
  outline: none;
  cursor: pointer;
  padding: 11px 15px;
  text-align: center;
  /* margin: 0 5px; */
}

.add-item {
  color: white;
  border: 2px white solid;
  transition: all 200ms ease;
  position: absolute;
  border-radius: 50%;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 11px 15px;
  margin: 0 5px;
  background-color: rgb(114, 218, 204);
  margin-left: 390px;
  margin-top: 35px;
}

.delete-timer {
  padding: 7px 11px;
  font-size: 1.3rem;
  border: white 2px solid;
  background-color: #e2e1dc;
  margin-left: 375px;
  margin-top: -125px;
  position: absolute;
  color: white;
  border-radius: 50%;
}
.delete-note {
  border: white 2px solid;
  padding: 7px 11px;
  font-size: 1.3rem;
  background-color: #e2e1dc;
  margin-left: 250px;
  margin-top: -11px;
  position: absolute;
  border-radius: 50%;
  color: white;
}

.start-timer {
  margin-left: 269px;
  border-radius: 0 0 7px 7px;
  padding: 6px 15px;
  background-color: rgb(114, 218, 204);
  border: none;
  font-size: 1.2rem;
  font-weight: 400;
  position: absolute;
  color: white;
}
.flat {
  font-size: 1rem;
  border: none;
  padding: 7px 11px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 3px rgba(145, 145, 145, 0.404);
  color: rgb(83, 70, 70);
}

.text-only {
  padding: 7px 11px;
  border: 2px rgb(255, 255, 255) solid;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  box-shadow: none;
  border-radius: 5px;
}

.auth {
  width: 50%;
  border-radius: 5px;
  background-color: rgb(114, 218, 204);
  border: none;
  font-size: 1.2rem;
  font-weight: 400;
  color: white;
}
.auth-flat {
  width: 50%;
  border-radius: 5px;
  background-color: white;
  border: none;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(160, 160, 147);
  font-size: 1rem;
}
.delete-timer:hover,
.delete-note:hover {
  background-color: #bd0a0a;
}

.userButton{
border-radius: 50%;
/* padding: 10px 11px; */
width: 45px;
height: 45px;
text-align: center;
font-family: "Comfortaa", cursive;
font-weight: 600;
font-size: 1.4rem;
color: white;
background-color: rgb(114, 218, 204);
border: white 2px solid;
}
.userButton:hover{
  background-color: rgb(95, 189, 176);
}

.add-button {
}
</style>
