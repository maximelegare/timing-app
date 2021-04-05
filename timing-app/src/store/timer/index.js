import getters from './getters'
import actions from './actions'
import mutations from './mutations'



export default{
    namespaced:true,
    state(){
        return{
            timers:[],
            countdownValues : {
                hours:null,
                minutes:null,
                seconds:null,
                timerStatus:false,
                startingTime:null, 
                timerExpired:false
            },
        }
    },
    getters,
    mutations,
    actions
}