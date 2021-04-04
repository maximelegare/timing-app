export default {
  async addTimer(context, payload) {
    const userId = context.rootGetters.userId;
    const timer = {
      title: payload.title,
      
      time: {
        hours: payload.time.hours,
        minutes: payload.time.minutes,
        seconds: payload.time.seconds,
      },
    };
    console.log(timer)
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers.json`,
      {
        method: "POST",
        body: JSON.stringify(timer),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to send Data");
      throw err;
    }
    context.commit("addTimer", payload);
  },

  async loadTimers(context) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to get the data!");
      throw err;
    }

    const timers = [];

    for (const key in responseData) {
      const timer = {
        id: key,
        title: responseData[key].title,
        time: {
          hours: responseData[key].time.hours,
          minutes: responseData[key].time.minutes,
          seconds: responseData[key].time.seconds,
        },
      };
      
      timers.push(timer);
      
    }
    
    context.commit("loadTimers", timers);
  },

  async deleteTimer(context, payload){
    const userId = context.rootGetters.userId
    const timerId = payload
    
    const response =  await fetch(`https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/timers/${timerId}.json`, {
      method:'DELETE'
    })

    const responseData = await response.json()

    if(!response.ok){
      const err  = new Error(responseData.message || 'failed to delete data')
      throw err
    }
    context.dispatch('loadTimers')
  }
};
