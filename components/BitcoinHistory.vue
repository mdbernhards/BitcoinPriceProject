<template>
    <div id="app">
        <div class="bitcoin-price">
            <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="#f69119"></stop>
                <stop offset="100%" stop-color="#ffffff"></stop>
                </linearGradient>
            </defs>
            </svg>
            <trend-chart v-if="dataset.length" :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]" :labels="labels" :min="0" :grid="grid" />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Vue from "vue";
    import TrendChart from "vue-trend-chart";
    Vue.use(TrendChart);
    import moment from "moment";
    export default{
    el: "#app",
    data ()  {
        return {
            dataset: [],
            labels: {
            xLabels: [],
            yLabels: 5,
            yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
            },
            grid: {
            verticalLines: true,
            verticalLinesNumber: 1,
            horizontalLines: true,
            horizontalLinesNumber: 1
            }
        }
    },
    mounted() {
        axios
        .get(
            "https://api.coindesk.com/v1/bpi/historical/close.json"
        )
        .then(res => {
            const data = res.data.bpi;
            for (let key in data) {
            this.dataset.push(data[key]);
            this.labels.xLabels.push(moment(key).format("MM/DD"));
            }
        });
    }
    }
</script>

<style>
    #app {
    margin: 0 auto;
    padding: 30px;
    max-width: 1200px;
    max-height: 300px;
    }

    .vtc {
        height: 250px;
        font-size: 12px;
        @media (min-width: 699px) {
        height: 350px;
        }
    }
    .grid,
    .labels {
        stroke: rgba(#f69119, 0.5);
    }
    
        line {
            opacity: 0.3;
        }
    .curve-btc {
        stroke: #f69119;
        stroke-width: 2;

        fill: url(#btcFill);
        fill-opacity: 0.5;
    }
</style>