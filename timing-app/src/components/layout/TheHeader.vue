<template>
  <header>
    <div class="container">
      <div class="logo">
        <i class="fas fa-stopwatch watch"></i>
        <h1>Timing</h1>
      </div>
      <div class="user-infos" v-if="isAuth">
        <h2>{{ userEmail }}</h2>
        <base-button mode="userButton" @click="logout">
          <div class="user-button-letter"><i class="fas fa-user user"></i></div>
        </base-button>
        <!-- <base-button mode="flat" @click="logout">Logout</base-button> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    userButtonLetter() {
      if (this.userEmail !== null) {
        return this.userEmail.slice(0, 1).toUpperCase();
      }
      return "";
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.user-button-letter {
  position: absolute;
  transform: translate(-24%, -45%);
  text-align: center;
}

i.user{
  font-size: 1.5rem;
}

.user-infos {
  display: flex;
  align-items: center;
  
  
}
.container {
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin: 0 40px;
  align-items: center;
}
i.watch {
  width: 40px;
  margin-right: 5px;
  font-size: 2.4rem;
  transition: all 200ms ease;
  color: white;
}


.logo {
  width: 100%;
  display: flex;
}

h2 {
  color: white;
  margin-right: 20px;
  font-size: 1.2rem;
}
header {
  width: 100%;
  height: 75px;
  background-color: rgb(114, 218, 204);
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.562);
}
</style>
