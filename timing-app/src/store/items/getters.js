export default{
    items(state, _, rootGetters){
        const userId = rootGetters.userId
        return state.users.filter(userItems => userItems.userId === userId)
    }
}