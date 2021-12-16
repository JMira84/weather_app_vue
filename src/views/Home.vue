<template>
    <div class='container'>
        <WeatherInfo v-if='getWeather && getWeather.length' :weatherData='parsedWeather' />
    </div>
</template>

<script>
import WeatherInfo from '@/components/WeatherInfo';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        WeatherInfo,
    },
    data() {
        return {
            apiKey: '5ec59eda94979b06addc907ac5235f35',
            locationOptions: {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            },
        };
    },
    computed: {
        ...mapGetters(['getWeather']),
        parsedWeather () {
            return this.getWeather.map(data => {
                let newIcon;
                    switch (data.weather[0].icon) {
                        case '02d':
                        case '02n':
                        case '03d':
                        case '03n':
                            newIcon = 'partly-cloudy';
                            break;
                        case '04d':
                        case '04n':
                            newIcon = 'cloudy';
                            break;
                        case '01d':
                        case '01n':
                            newIcon = 'sunny';
                            break;
                        case '10d':
                        case '09d':
                            newIcon = 'rainy';
                            break;
                        case '13d':
                            newIcon = 'snowy';
                            break;
                        case '11d':
                            newIcon = 'stormy';
                            break;

                        default:
                            break;
                    }
                    return {
                        ...data,
                        newIcon: newIcon
                    };
            })
        }
    },
    methods: {
        ...mapActions(['weatherForecast']),
        async fetchWeather(lon, lat) {
            try {
                await this.weatherForecast({
                    apiKey: this.apiKey,
                    lon: lon,
                    lat: lat
                });
            } catch (error) {
                console.log(error)
            }
        },
        async success(pos) {
            let crd = pos.coords

            try {
                await this.fetchWeather(crd.longitude, crd.latitude)
            } catch (error) {
                console.log(error)
            }
        },
        error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message)
        },
    },
    async mounted() {
        navigator.geolocation.getCurrentPosition(
            this.success,
            this.error,
            this.locationOptions
        )
    },
};
</script>

<style lang='scss' scoped>
.container {
    padding: 0 40px;
}
</style>