<template>
    <div
    class="weather-card-wrapper"
    :class="icon">
        <Icon class="weather-icon" :icon="icon"/>
        <span class="current-temperature">{{Math.round(maxTemp)}}</span>
        <div class="other-info-wrapper">
            <div class="precipitation">
                <Icon icon="precipitation"/>
                <span class="value">{{Math.round((precipitation) * 100)}}%</span>
            </div>
            <div class="min-temperature">
                <Icon icon="low"/>
                <span class="value">{{Math.round(minTemp)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
    props: {
        icon: String,
        maxTemp: [String, Number],
        minTemp: [String, Number],
        precipitation: [String, Number]
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
$lightest_blue: #D3EBF4;
$lighter_blue: #BCE1EF;
$light_blue: #4DB0D3;
$blue: #2B8BAD;
$medium_blue: #247490;
$dark_blue: #0E2E3A;
$light_yellow: #E6DF95;

.weather-card-wrapper {
    height: 355px;
    position: relative;
    border-radius: 30px;
    font-family: 'Oswald', sans-serif;
    box-shadow: 2px 4px 4px rgb(0 0 0 / 10%), 9px 2px 9px 1px rgb(32 77 92 / 25%);
    .weather-icon {
        position: absolute
    }
    .current-temperature {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        font-size: 4.3rem;
        &::after {
            content: '\00B0';
            position: absolute;
            font-size: 2rem;
        }
    }
    .other-info-wrapper {
        position: absolute;
        left: 50%;
        bottom: 17px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        .precipitation,
        .min-temperature {
            display: flex;
            align-items: center;
            .value {
                padding-left: 8px;
            }
        }
        .precipitation {
            padding-bottom: 7px;
        }
        .min-temperature {
            .value {
                position: relative;
                &::after {
                    content: '\00B0';
                    position: absolute;
                    font-size: 1rem;
                }
            }
        }
    }
    &.cloudy,
    &.partly-cloudy {
        background-color: $light_blue;
    }
    &.cloudy,
    &.partly-cloudy,
    &.rainy,
    &.stormy {
        .current-temperature {
            color: $light_yellow;
        }
        .other-info-wrapper {
            color: $lightest_blue;
            .precipitation,
            .min-temperature {
                ::v-deep svg {
                    fill: $lightest_blue;
                }
            }
        }
    }
    &.sunny,
    &.snowy {
        .other-info-wrapper {
            color: $medium_blue;
            .precipitation,
            .min-temperature {
                ::v-deep svg {
                    fill: $medium_blue;
                }
            }
        }
    }
    &.cloudy {
        .weather-icon {
            top: 30px;
            left: -25px;
        }
    }
    &.partly-cloudy {
        .weather-icon {
            top: 18px;
            left: -14px;
        }
    }
    &.rainy {
        background-color: $blue;
        .weather-icon {
            top: -22px;
            right: -9px;
        }
    }
    &.stormy {
        background-color: $dark_blue;
        .weather-icon {
            top: 20px;
            left: -25px;
        }
    }
    &.sunny {
        background-color: $light_yellow;
        .weather-icon {
            top: 5px;
            left: -13px;
        }
        .current-temperature {
            color: $light_blue;
        }
    }
    &.snowy {
        background-color: $lighter_blue;
        .weather-icon {
            top: 8px;
            left: -15px;
        }
        .current-temperature {
            color: $dark_blue;
        }
    }
}
</style>