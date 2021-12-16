<template>
    <div class="weather-info-wrapper">
        <div class="weather-elements-wrapper" v-for="(data, index) in weatherData" :key="index">
            <div class="weather-days">
                <span class="week-day">{{convertDate(data.dt, { weekday: 'short' })}}</span>
                <span class="day">{{convertDate(data.dt, { day: 'numeric' })}}</span>
            </div>
            <WeatherCard
            :icon="data.newIcon"
            :maxTemp="data.temp.max"
            :minTemp="data.temp.min"
            :precipitation="data.pop"/>
        </div>
    </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard'
export default {
    props: {
        weatherData: Array
    },
    components: {
        WeatherCard
    },
    computed: {},
    methods: {
        convertDate (date, option) {
            const parse = new Date (date * 1000).toLocaleString('en-EN', option)
            return parse.toUpperCase()
        }
    }
}
</script>

<style lang="scss" scoped>
.weather-info-wrapper {
    display: flex;
    gap: 20px;
    padding: 40px 0;
    .weather-elements-wrapper {
        min-width: 110px;
        .weather-days {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
            .day,
            .week-day {
                font-family: 'Krona One', sans-serif;
                color: #4DB0D3;
            }
            .week-day {
                margin-bottom: 10px;
                font-size: .9rem;
                letter-spacing: .2rem;
            }
            .day {
                font-size: 2.8rem;
            }
        }
    }
}
</style>