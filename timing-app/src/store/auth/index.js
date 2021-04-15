import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'


export default{
    state(){
        return{
            token:null,
            userId:null,
            userEmail:null,
            expiration:null,
            // error:null
        }
    },
    actions,
    mutations,
    getters
}