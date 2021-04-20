<template>
  <auth-form :userLogout="userLogout" @user-logout="setUserLogout"></auth-form>
  <header>
    <div class="container">
      <div class="logo">
        <i class="fas fa-stopwatch watch"></i>
        <h1>Timing</h1>
      </div>
      <div class="user-infos" v-if="isAuth">
        <base-button
          mode="user-button"
          @click="setDropdown"
          class="user-button"
        >
          <div class="user-button-letter"><i class="fas fa-user user"></i></div>
        </base-button>
        <!-- <base-button mode="flat" @click="logout">Logout</base-button> -->
      </div>
    </div>
    <div class="backdrop" @click="setDropdown" v-if="showDropdown"></div>
    <transition name="dropdown" appear>
      <div class="dropdown-container" v-if="showDropdown">
        <div class="dropdown">
          <h4><i class="fas fa-user"></i>&ensp;{{ userEmail }}</h4>
          <base-button class="dropdown-button" mode="text-only-white-header"
            ><i class="fas fa-cog"></i>&ensp;Parameters</base-button
          >
          <base-button
            class="dropdown-button"
            mode="text-only-white-header"
            @click="logout"
            ><i class="fas fa-sign-out-alt"></i>&ensp;logout</base-button
          >
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import AuthForm from "../forms/AuthForm.vue";
export default {
  data() {
    return {
      userLogout: false,
      showDropdown: false,
    };
  },
  components: {
    AuthForm,
  },
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
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  methods: {
    setDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      this.showDropdown = false;
      this.$store.dispatch("form/setFormVisibility", false);
      this.$store.dispatch("logout");
      this.$router.push("notes");
      this.userLogout = true;
    },
    setUserLogout() {
      this.userLogout = false;
      console.log("userLogout");
    },
  },
  watch: {
    didAutoLogout(newVal) {
      if (newVal) {
        this.$store.dispatch("form/setFormVisibility", false);
        this.$router.push("notes");
        this.userLogout = true;
        this.showDropdown = false;
      }
    },
  },
};
</script>

<style scoped>
.dropdown-button {
  display: block;
}

.user-button-letter {
  position: absolute;
  transform: translate(-24%, -45%);
  text-align: center;
}

i.user {
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
  position: fixed;
  z-index: 10;
}
.dropdown {
  background-color: white;
  /* width: 150px;
  height: 100px; */
  position: fixed;
  border-radius: 7px;
  right: 30px;
  margin-top: 45px;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.562);
  text-align: left;
  z-index: 300;
  min-width: 200px;
  height: 150px;
}
.dropdown::before {
  content: "";
  border: 12px solid transparent;
  border-bottom-color: white;
  position: absolute;
  margin-top: -23px;
  right: 20px;
  z-index: 300;
}
h4 {
  padding: 9px 13px;
  /* border-bottom:solid 2px  ; */
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.151);
  z-index: 10;
}
.logout-button {
  position: relative;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.dropdown-leave-active {
  transition: 0.3s all ease-in;
}
.dropdown-enter-active {
  transition: 0.3s all ease-out;
}

@media (max-width: 600px) {
  .container {
    margin: 0 20px;
  }
  .dropdown{
    right: 10px;
  }
}
</style>
