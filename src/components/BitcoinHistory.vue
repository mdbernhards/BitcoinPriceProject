<template>
    <div id="history">
        <trend-chart  v-if="weekDataset.length && isShown == 1" :datasets="[{data: weekDataset, fill: true, className: 'curve-btc'}]" :labels="weekLabels" :min="11000.00" :grid="grid" :interactive="true"/>
        <trend-chart  v-if="monthDataset.length && isShown == 2" :datasets="[{data: monthDataset, fill: true, className: 'curve-btc'}]" :labels="monthLabels" :min="7000.00" :grid="grid" :interactive="true"/>
        <trend-chart  v-if="yearDataset.length && isShown == 3" :datasets="[{data: yearDataset, fill: true, className: 'curve-btc'}]" :labels="yearLabels" :min="0" :grid="grid" :interactive="true"/>
        <trend-chart  v-if="allDataset.length && isShown == 4" :datasets="[{data: allDataset, fill: true, className: 'curve-btc'}]" :labels="allLabels" :min="0" :grid="grid" :interactive="true"  @mouse-move="onMouseMove"/>

        <div class = "historyButtons">
            <button v-on:click="isShown = 1">1 week</button>
            <button v-on:click="isShown = 2">1 month</button>
            <button v-on:click="isShown = 3">1 year</button>
            <button v-on:click="isShown = 4">10 years</button>
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
                isShown: 4,
                weekDataset: [],
                monthDataset: [],
                yearDataset: [],
                allDataset: [],
                weekLabels: {
                    xLabels: [],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                monthLabels: {
                    xLabels: [],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                yearLabels: {
                    xLabels: ["10/19", "11/19", "12/19", "01/20", "02/20", "03/20", "04/20", "05/20", "06/20", "07/20", "08/20", "09/20", "10/20"],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                allLabels: {
                    xLabels: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                grid: {
                    verticalLines: true,
                    verticalLinesNumber: 10,
                    horizontalLines: true,
                    horizontalLinesNumber: 5
                }
            }
        },
        mounted() {
            axios
                .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-10-22&end=2020-10-29")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            this.weekDataset.push(data[key]);
                            this.weekLabels.xLabels.push(moment(key).format("MM/DD"));
                        }
                    });

            axios
                .get("https://api.coindesk.com/v1/bpi/historical/close.json")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            this.monthDataset.push(data[key]);
                            this.monthLabels.xLabels.push(moment(key).format("MM/DD"));
                        }
                    });

            axios
                .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-10-29&end=2020-10-29")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            this.yearDataset.push(data[key]);
                        }
                    });

            axios
                .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-10-29&end=2020-10-29")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            this.allDataset.push(data[key]);
                        }
                    });
        }
    }
</script>