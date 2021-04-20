import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'


export default{
    state(){
        return{
            token:null,
            userId:null,
            userEmail:null,
            didAutoLogout:false
            

            // error:null
        }
    },
    actions,
    mutations,
    getters
}