export default {
    userId(state){
        return state.userId
    },
    isAuthenticated(state){
        return !!state.token
    },
    token(state){
        return state.token
    },
    userEmail(state){
        return state.userEmail
    },
    didAutoLogout(state){
        return state.didAutoLogout
    }
    // error(state){
    //     return state.error
    // }
};