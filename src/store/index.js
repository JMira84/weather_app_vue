import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

const state = {
    weather: []
}
const getters = {
    getWeather: state => state.weather.daily
}
const mutations = {
    SET_WEATHER(state, payload) {
        state.weather = payload
    }
}
const actions = {
    weatherForecast: async (context, params) => {
        const response = await instance.get(`/onecall?lat=${params.lat}&lon=${params.lon}&units=metric&exclude=minutely,hourly&appid=${params.apiKey}`)
        // Remove the last element, because I only want 7 elements
        response.data.daily.splice(-1, 1)
        if (response) context.commit('SET_WEATHER', response.data)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
