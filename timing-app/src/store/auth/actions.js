let timer;
export default {
  // signUp(context, payload) {
  //   const data = {
  //     ...payload,
  //     mode: "signUp",
  //   };
  //   context.dispatch("auth", data);
  // },
  // login(context, payload) {
  //   const data = {
  //     ...payload,
  //     mode: "login",
  //   };
  //   context.dispatch("auth", data);
  // },
  async auth(context, payload) {
    const API_KEY = process.env.VUE_APP_DB_FIREBASE;

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const mode = payload.mode;

    if (mode === "signUp") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      // let errorMessage

      // if (responseData.error.message === "EMAIL_EXISTS") {
      //   errorMessage = "There is already an account using this email Address.";
      // }
      // if (responseData.error.message === "INVALID_PASSWORD")
      //   errorMessage = "The password is invalid";

      const error = new Error(
        // errorMessage
        responseData.error.message
      );

      // context.commit("setError", errorMessage);

      throw error;
      // console.log(responseData.error.message);
    }

// make a new date for token expiration and store it
    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 10000;


    const expirationDate = new Date().getTime() + expiresIn

    console.log(expirationDate)

// set Data from Firebase to local storage to acces it
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("userEmail", responseData.email);
    localStorage.setItem("tokenExpiration", expirationDate);


// after tokenExpire, the user is logged out
   timer = setTimeout(function() {
      context.dispatch("didAutoLogout");
    }, expiresIn);

    context.commit("notes/loadNotes");
    context.commit("setUser", {
      userId: responseData.localId,
      userEmail: responseData.email,
      token: responseData.idToken,
    });
  },

  tryLogin(context) {
  // check if there is a token and a user ID in local storage, if that's the case, log the user
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const tokenExpiration = localStorage.getItem("tokenExpiration")

    const timeLeft = +tokenExpiration - new Date().getTime()
    
    // check how much time is left to the timeOut and logout.

    if(timeLeft < 0){
      return
    }

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        userEmail: userEmail,
      });
    }

    timer = setTimeout(function(){
      context.dispatch('didAutoLogout')

      context.dispatch('form/setFormVisibility', false, {root:true})
    }, timeLeft)
  },
  // set token, userId and tokenExpiration to null(default)
  logout(context) {

    clearTimeout(timer)

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    context.commit("setUser", {
      token: null,
      userId: null,
      userEmail: null,
    });
  },
  didAutoLogout(context){
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
};
