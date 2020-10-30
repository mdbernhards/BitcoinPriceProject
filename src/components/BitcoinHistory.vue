<template>
    <div id="history">
        <div id="historyGraphs">
            <trend-chart  v-if="weekDataset.length && isShown == 1" :datasets="[{data: weekDataset, fill: true, className: 'curve-btc'}]" :labels="weekLabels" :min="11000.00" :grid="grid" :interactive="true"/>
            <trend-chart  v-if="monthDataset.length && isShown == 2" :datasets="[{data: monthDataset, fill: true, className: 'curve-btc'}]" :labels="monthLabels" :min="7000.00" :grid="grid" :interactive="true"/>
            <trend-chart  v-if="yearDataset.length && isShown == 3" :datasets="[{data: yearDataset, fill: true, className: 'curve-btc'}]" :labels="yearLabels" :min="0" :grid="grid" :interactive="true"/>
            <trend-chart  v-if="tenYearDataset.length && isShown == 4" :datasets="[{data: tenYearDataset, fill: true, className: 'curve-btc'}]" :labels="tenYearLabels" :min="0" :grid="grid" :interactive="true"/>
        </div>
        <div class = "historyButtons">
            <button v-on:click="changeShown(1), getLastWeeksData()">1 week</button>
            <button v-on:click="changeShown(2), getLastMonthsData()">1 month</button>
            <button v-on:click="changeShown(3), getLastYearsData()">1 year</button>
            <button v-on:click="changeShown(4), getLastTenYearsData()">10 years</button>
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
                tenYearDataset: [],
                weekLabels: {
                    xLabels: [this.getDate(7, 0, 0, "DD/MM"), this.getDate(6, 0, 0, "DD/MM"), this.getDate(5, 0, 0, "DD/MM"),
                              this.getDate(4, 0, 0, "DD/MM"), this.getDate(3, 0, 0, "DD/MM"), this.getDate(2, 0, 0, "DD/MM"),
                              this.getDate(1, 0, 0, "DD/MM"), this.getDate(0, 0, 0, "DD/MM")],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                monthLabels: {
                    xLabels: [this.getDate(30, 0, 0, "DD/MM"), this.getDate(25, 0, 0, "DD/MM"), this.getDate(20, 0, 0, "DD/MM"),
                              this.getDate(15, 0, 0, "DD/MM"), this.getDate(10, 0, 0, "DD/MM"), this.getDate(5, 0, 0, "DD/MM"),
                              this.getDate(0, 0, 0, "DD/MM")],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                yearLabels: {
                    xLabels: [this.getDate(0, 0, 1, "MM/YYYY"), this.getDate(0, 11, 0, "MM/YYYY"), this.getDate(0, 10, 0, "MM/YYYY"), 
                              this.getDate(0, 9, 0, "MM/YYYY"), this.getDate(0, 8, 0, "MM/YYYY"), this.getDate(0, 7, 0, "MM/YYYY"),
                              this.getDate(0, 6, 0, "MM/YYYY"), this.getDate(0, 5, 0, "MM/YYYY"), this.getDate(0, 4, 0, "MM/YYYY"),
                              this.getDate(0, 3, 0, "MM/YYYY"), this.getDate(0, 2, 0, "MM/YYYY"), this.getDate(0, 1, 0, "MM/YYYY"), this.getDate(0, 0, 0, "MM/YYYY")],
                    yLabels: 5,
                    yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
                },
                tenYearLabels: {
                    xLabels: [this.getDate(0,0,10,"MM/YYYY"),this.getDate(0,0,9,"MM/YYYY"),this.getDate(0,0,8,"MM/YYYY"),this.getDate(0,0,7,"MM/YYYY"),
                              this.getDate(0,0,6,"MM/YYYY"),this.getDate(0,0,5,"MM/YYYY"),this.getDate(0,0,4,"MM/YYYY"),this.getDate(0,0,3,"MM/YYYY"),
                              this.getDate(0,0,2,"MM/YYYY"),this.getDate(0,0,1,"MM/YYYY"),this.getDate(0,0,0,"MM/YYYY")],
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
            changeShown(number){
                this.isShown = number;
            },
            getDate(days, months, years, format){
                return moment()
                        .subtract(days, "days")
                        .subtract(months, "months")
                        .subtract(years, "years")
                        .format(format)
            },
            getLastWeeksData(){
                var copyWeekDataset = [];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(7, 0, 0, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyWeekDataset.push(data[key]);
                            this.weekDataset = copyWeekDataset;
                        }
                    });
            },
            getLastMonthsData(){
                var copyMonthDataset = [];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyMonthDataset.push(data[key]);
                            this.monthDataset = copyMonthDataset;
                        }
                    });
            },
            getLastYearsData(){
                var copyYearDataset = [];
                this.yearDataset = [];

                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(0, 0, 1, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyYearDataset.push(data[key]);
                            this.yearDataset = copyYearDataset;
                        }
                    });
            },
            getLastTenYearsData(){
                var copyTenYearDataset = [];
                this.tenYearDataset = [];
                
                axios
                    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=" + this.getDate(0, 0, 10, "YYYY-MM-DD") + "&end=" + this.getDate(0, 0, 0, "YYYY-MM-DD"))
                    .then(res => {
                        const data = res.data.bpi;
                        for (let key in data) {
                            copyTenYearDataset.push(data[key]);
                            this.tenYearDataset = copyTenYearDataset;
                        }
                    });
            }

        },
        mounted() {
            this.getLastWeeksData();
            this.getLastMonthsData();
            this.getLastYearsData();
            this.getLastTenYearsData();
        }
    }
</script>