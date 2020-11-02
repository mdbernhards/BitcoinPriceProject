<template>
    <div id="history">
        <div>
            <trend-chart  v-if="dataset.length" :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]" :labels="labels" :min="0" :grid="grid" :interactive="true" @mouse-move="onMouseMove"/>
        </div>
        <div class = "historyButtons">
            <button @click="getLastWeeksData()">1 week</button>
            <button @click="getLastMonthsData()">1 month</button>
            <button @click="getLastYearsData()">1 year</button>
            <button @click="getLastTenYearsData()">10 years</button>
        </div>
        <h1 class="graphInfo">{{currentInfo.value}}: ${{currentInfo.label}}</h1>
    </div>
</template>

<script lang="ts">
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
                allLabels: [],
                dataIndex: 0, 
                currentInfo: {
                    value: null,
                    label: null
                },
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
            getDate(days: number, months: number, years: number, format: string){
                return moment()
                    .subtract(days, "days")
                    .subtract(months, "months")
                    .subtract(years, "years")
                    .format(format)
            },
            getLastWeeksData(){
                var copyWeekDataset = [];
                this.allLabels = [];
                this.grid.verticalLinesNumber = 8;
                this.labels.xLabels = [this.getDate(7, 0, 0, "DD/MM"), this.getDate(6, 0, 0, "DD/MM"), this.getDate(5, 0, 0, "DD/MM"),
                                       this.getDate(4, 0, 0, "DD/MM"), this.getDate(3, 0, 0, "DD/MM"), this.getDate(2, 0, 0, "DD/MM"),
                                       this.getDate(1, 0, 0, "DD/MM"), this.getDate(0, 0, 0, "DD/MM")];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(8, 0, 0, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyWeekDataset.push(data[key]);
                            this.dataset = copyWeekDataset;
                            this.allLabels.push(moment(key).format("DD/MM/YYYY"));
                        }
                    });
            },
            getLastMonthsData(){
                var copyMonthDataset = [];
                this.allLabels = [];
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
                            this.allLabels.push(moment(key).format("DD/MM/YYYY"));
                        }
                    });
            },
            getLastYearsData(){
                var copyYearDataset = [];
                this.allLabels = [];
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
                            this.allLabels.push(moment(key).format("DD/MM/YYYY"));
                        }
                    });
            },
            getLastTenYearsData(){
                var copyTenYearDataset = [];
                this.allLabels = [];
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
                            this.allLabels.push(moment(key).format("DD/MM/YYYY"));
                        }
                    });
            },
            onMouseMove(params) {
                this.currentInfo = {
                    label: params.data[0],
                    value: this.allLabels[params.index]
                };
            }
        },
        mounted() {
            this.getLastTenYearsData();
        }
    }
</script>