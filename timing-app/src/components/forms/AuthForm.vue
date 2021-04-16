<template>
  <base-dialog :show="!isAuth || !!error" :title="dialogTitle">
    <template #section>
      <div class="form-container">
        <form @submit.prevent="sendAuthData">
          <div class="form-control">
            <h4>Email Address</h4>
            <input
              type="email"
              placeholder="Email"
              v-model.trim="email"
              :class="{ invalid: !emailIsValid }"
              @blur="clearValidity('emailIsValid')"
            />
            <p class="invalid" v-if="!emailIsValid">
              Please change your email address or try again later.
            </p>
          </div>
          <div class="form-control">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Password"
              v-model.trim="password"
              :class="{ invalid: !passwordIsValid }"
              @blur="clearValidity('passwordIsValid')"
            />
            <input
              v-if="signUp"
              type="password"
              placeholder="Confirm Password"
              v-model.trim="passwordValidation"
              class="validation-password"
              :class="{ invalid: !passwordIsValid }"
              @blur="clearValidity('passwordIsValid')"
            />
            <p class="invalid" v-if="!passwordIsValid">
              Your password must have at least 6 characters.
            </p>
            <p v-if="!!error" class="invalid">
              <!-- Something went wrong. Please try again later -->
              {{ error }}
            </p>
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
    <!-- <div v-if="!!error">
      <p>{{ error }}</p>
    </div> -->
  </base-dialog>
  <div class="input-container"></div>
</template>

<script>
import BaseDialog from "../ui/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  emits: ["user-logout"],
  props: ["userLogout"],
  data() {
    return {
      showDialog: false,
      signUp: true,
      login: false,
      email: "",
      password: "",
      passwordValidation: "",
      emailIsValid: true,
      passwordIsValid: true,
      formIsValid: true,
      error: null,
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
    clearValidity(input) {
      this[input] = true;
      this.formIsValid = true;
      this.error = null
    },

    async sendAuthData() {
      this.validateForm();
      console.log("passedValidation");
      if (this.formIsValid === false) {
        return;
      } else {
        try {
          if (this.signUp === true) {
            await this.$store.dispatch("auth", {
              email: this.email,
              password: this.password,
              mode: "signUp",
            });
          } else if (this.login === true) {
            await this.$store.dispatch("auth", {
              email: this.email,
              password: this.password,
              mode: "login",
            });
          }
          this.login = false;
          this.signUp = false;
          this.email = "";
        } catch (error) {
          this.formIsValid = false;
          console.log(error)
          if (error.message === "EMAIL_EXISTS") {
            this.error =
              "There is already an account using this email Address.";
              this.emailIsValid = false
              console.log(error.message)

          }else if (error.message === "INVALID_PASSWORD") {
            this.error = "The password is invalid";
            this.passwordIsValid = false
            
          } else {
            this.error = "Something went wrong!";
          }
        }
        this.$router.replace("notes");
        
        this.password = "";
        this.passwordValidation = "";
        this.showDialog = false;

        console.log(`login form: ${this.login}`);
        console.log(`signup form: ${this.signUp}`);
        this.$emit("user-logout", false);
      }
    },
    validateForm() {
      if (this.email === "" || !this.email.includes("@")) {
        this.formIsValid = false;
        this.emailIsValid = false;
      }
      if (this.signUp === true) {
        if (
          this.password === "" ||
          this.password.length < 6 ||
          this.password !== this.passwordValidation
        ) {
          this.formIsValid = false;
          this.passwordIsValid = false;
          console.log("error password");
        }
      } else if (this.password === "" || this.password.length < 6) {
        this.formIsValid = false;
        this.passwordIsValid = false;
      }
      // console.log(this.passwordIsValid);
      // console.log(this.formIsValid);
      // console.log(this.emailIsValid);
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
        return "Create your account";
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
    token() {
      return this.$store.getters.token;
    },
    // haveError() {
    //   return this.$store.getters.error;
    // },
  },
  // userLoggedOut(){
  //   if(this.userLogout){
  //     return console.log('userLogout' + this.userLogout)
  //   }
  //   return this.login === false
  // },
  watch: {
    async token(newVal) {
      const route = this.$route.path;
      if (newVal !== null && newVal !== undefined && this.isAuth) {
        if (route === "/timers") {
          await this.$store.dispatch("timers/loadTimers");
        } else if (route === "/notes") {
          await this.$store.dispatch("notes/loadNotes");
        }
      }
    },
    error(newVal) {
      console.log(newVal);
    },
    // it sets the login and signup when the user clicks on the logout button
    userLogout(newVal) {
      if (newVal) {
        this.login = true;
        this.signUp = false;
        console.log(`login: ${this.login}`);
        console.log(`signup: ${this.signUp}`);
      }
    },
  },
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
  margin: 30px 0 30px 0;
  text-align: center;
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
input.invalid {
  border: 2px solid #bd0a0a;
}
p.invalid {
  color: #bd0a0a;
  margin-top: 10px;
}
.validation-password {
  margin-top: 15px;
}
</style>
