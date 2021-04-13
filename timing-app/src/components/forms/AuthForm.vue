<template>
  <base-dialog :show="!isAuth" :title="dialogTitle">
    <template #section>
      <div class="form-container">
        <form @submit.prevent="sendAuthData">
          <div class="form-control">
            <h4>Email Address</h4>
            <input type="email" placeholder="Email" v-model="email" />
          </div>
          <div class="form-control">
            <h4>Password</h4>
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <!-- <h4 v-if="signUp">Confirm Password</h4>
          <input type="password"  placeholder="Confirm Password"/> -->
          <div class="form-control">
            <div class="form-control-buttons">
              <base-button mode="auth" class="login-button">{{
                dialogMainButton
              }}</base-button>
              <base-button
                class="login-button switch"
                mode="auth-flat"
                color="dark"
                type="button"
                @click="switchMode"
                >{{ dialogSwitchButton }}</base-button
              >
            </div>
          </div>
        </form>
      </div>
    </template>
  </base-dialog>
  <div class="input-container"></div>
</template>

<script>
import BaseDialog from "../ui/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      showDialog: false,
      signUp: true,
      login: false,
      email: "",
      password: "",
    };
  },
  methods: {
    setSignUpDialog() {
      this.showDialog = true;
      this.login = false;
      this.signUp = true;
    },
    setLoginDialog() {
      this.showDialog = true;
      this.signUp = false;
      this.login = true;
    },
    switchMode() {
      this.showDialog = true;
      this.login = !this.login;
      this.signUp = !this.signUp;
    },

    async sendAuthData() {
      const route = this.$route.path;

      console.log(route);
      try {
        if (this.signUp === true) {
          await this.$store.dispatch("signUp", {
            email: this.email,
            password: this.password,
          });
        //   this.$router.push("/timers");
        } else {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        //   this.$router.push("/timers");
        }


      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    this.$router.replace('/notes')
      this.email = "";
      this.password = "";
      this.showDialog = false;
      this.login = false;
      this.signUp = false;
    },
  },

  computed: {
    dialogTitle() {
      if (this.signUp === true) {
        return "Let's Sign You Up!";
      } else {
        return "Welcome Back!";
      }
    },
    dialogMainButton() {
      if (this.signUp === true) {
        return "Sign Up";
      } else {
        return "Login";
      }
    },
    dialogSwitchButton() {
      if (this.signUp === true) {
        return "Login instead";
      } else {
        return "Sign Up instead";
      }
    },
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    token(){
        return this.$store.getters.token
    }
  },
  watch:{
     async token(newVal){
          const route = this.$route.path
         if(newVal !==null && newVal !== undefined && this.isAuth){
            if(route === '/timers'){
          await  this.$store.dispatch('timers/loadTimers')
        }else if(route === '/notes'){
           await this.$store.dispatch('notes/loadNotes')
        }
         }
      }
  }
};
</script>

<style scoped>
.login-button {
  display: block;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 10px;
}
.login-button.switch {
  font-size: 1rem;
}

.header-button {
  margin-left: 20px;
}
.form-container {
  display: flex;
  justify-content: center;
}
.input-container {
  display: flex;
  justify-content: space-between;
}
.form-control {
  width: 100%;
}
.form-control {
  margin: 30px 0 30px 0;
}
form {
  width: 400px;
}

input {
  display: block;
  width: 100%;
  /* margin-right: 20px; */
  padding: 13px 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  justify-self: center;
  box-shadow: 0px 3px 3px rgba(145, 145, 145, 0.404);
  font-family: "Open Sans", sans-serif;
  font-size: 0.8rem;
  resize: none;
}
h4 {
  text-align: center;
  margin-bottom: 10px;
  /* font-size: 1rem; */
  /* color: rgb(83, 70, 70); */
}
</style>
