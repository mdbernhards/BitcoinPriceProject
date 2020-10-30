<template>
    <div id="history">
        <div id="historyGraphs">
            <trend-chart  v-if="dataset.length" :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]" :labels="labels" :min="0" :grid="grid" :interactive="true"/>
        </div>
        <div class = "historyButtons">
            <button v-on:click="getLastWeeksData()">1 week</button>
            <button v-on:click="getLastMonthsData()">1 month</button>
            <button v-on:click="getLastYearsData()">1 year</button>
            <button v-on:click="getLastTenYearsData()">10 years</button>
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
                dataset: [],
                labels: {
                    xLabels: [],
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
        methods: {
            getDate(days, months, years, format){
                return moment()
                    .subtract(days, "days")
                    .subtract(months, "months")
                    .subtract(years, "years")
                    .format(format)
            },
            getLastWeeksData(){
                var copyWeekDataset = [];
                this.grid.verticalLinesNumber = 8;
                this.labels.xLabels = [this.getDate(7, 0, 0, "DD/MM"), this.getDate(6, 0, 0, "DD/MM"), this.getDate(5, 0, 0, "DD/MM"),
                                       this.getDate(4, 0, 0, "DD/MM"), this.getDate(3, 0, 0, "DD/MM"), this.getDate(2, 0, 0, "DD/MM"),
                                       this.getDate(1, 0, 0, "DD/MM"), this.getDate(0, 0, 0, "DD/MM")];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(7, 0, 0, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyWeekDataset.push(data[key]);
                            this.dataset = copyWeekDataset;
                        }
                    });
            },
            getLastMonthsData(){
                var copyMonthDataset = [];
                this.grid.verticalLinesNumber = 7;
                this.labels.xLabels = [this.getDate(30, 0, 0, "DD/MM"), this.getDate(25, 0, 0, "DD/MM"), this.getDate(20, 0, 0, "DD/MM"),
                                       this.getDate(15, 0, 0, "DD/MM"), this.getDate(10, 0, 0, "DD/MM"), this.getDate(5,  0, 0, "DD/MM"),
                                       this.getDate(0,  0, 0, "DD/MM")];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyMonthDataset.push(data[key]);
                            this.dataset = copyMonthDataset;
                        }
                    });
            },
            getLastYearsData(){
                var copyYearDataset = [];
                this.grid.verticalLinesNumber = 13;
                this.labels.xLabels = [this.getDate(0, 0, 1, "MM/YYYY"), this.getDate(0, 11, 0, "MM/YYYY"), this.getDate(0, 10, 0, "MM/YYYY"), 
                                       this.getDate(0, 9, 0, "MM/YYYY"), this.getDate(0, 8,  0, "MM/YYYY"), this.getDate(0, 7,  0, "MM/YYYY"),
                                       this.getDate(0, 6, 0, "MM/YYYY"), this.getDate(0, 5,  0, "MM/YYYY"), this.getDate(0, 4,  0, "MM/YYYY"),
                                       this.getDate(0, 3, 0, "MM/YYYY"), this.getDate(0, 2,  0, "MM/YYYY"), this.getDate(0, 1,  0, "MM/YYYY"), 
                                       this.getDate(0, 0, 0, "MM/YYYY")];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(0, 0, 1, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyYearDataset.push(data[key]);
                            this.dataset = copyYearDataset;
                        }
                    });
            },
            getLastTenYearsData(){
                var copyTenYearDataset = [];
                this.grid.verticalLinesNumber = 11;
                this.labels.xLabels = [this.getDate(0, 0, 10, "MM/YYYY"),this.getDate(0, 0, 9, "MM/YYYY"),this.getDate(0, 0, 8, "MM/YYYY"),this.getDate(0, 0, 7, "MM/YYYY"),
                                       this.getDate(0, 0,  6, "MM/YYYY"),this.getDate(0, 0, 5, "MM/YYYY"),this.getDate(0, 0, 4, "MM/YYYY"),this.getDate(0, 0, 3, "MM/YYYY"),
                                       this.getDate(0, 0,  2, "MM/YYYY"),this.getDate(0, 0, 1, "MM/YYYY"),this.getDate(0, 0, 0, "MM/YYYY")];
                
                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(0, 0, 10, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyTenYearDataset.push(data[key]);
                            this.dataset = copyTenYearDataset;
                        }
                    });
            }
        },
        mounted() {
            this.getLastTenYearsData();
        }
    }
</script>