export default {
  signUp(context, payload) {
    const data = {
      ...payload,
      mode: "signUp",
    };
    context.dispatch("auth", data);
  },
  login(context, payload) {
    const data = {
      ...payload,
      mode: "login",
    };
    context.dispatch("auth", data);
  },
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
      const err = new Error(responseData.message || "failed to post data");
      throw err;
    }

    
    context.commit('notes/loadNotes')
    context.commit("setUser", {
      userId: responseData.localId,
      userEmail: responseData.email,
      token: responseData.idToken,
    });

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem('userEmail', responseData.email);
    // localStorage.setItem('tokenExpiration', responseData.)
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem('userEmail')

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        userEmail: userEmail
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    context.commit("setUser", {
      token: null,
      userId: null,
      userEmail: null,
      expiration: null,
    });
  },
};
