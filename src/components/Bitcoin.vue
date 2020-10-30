<template>
    <div id="zap">
        <h1>Bitcoin Price</h1>

        <section v-if="errored">
            <p>Price currently not available</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <button v-on:click="changeShown(1), getPrices()">USD</button>
                <button v-on:click="changeShown(2), getPrices()">EUR</button>
                <button v-on:click="changeShown(3), getPrices()">GBP</button>
                <button v-on:click="changeShown(4), getPrices()">LTL</button>

                <h1 v-if="isShown == 1"> 
                    {{info.USD.description}}:  
                    <span class="lighten">
                        <span v-html="info.USD.symbol"></span>{{ info.USD.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isShown == 2"> 
                    {{info.EUR.description}}:  
                    <span class="lighten">
                        <span v-html="info.EUR.symbol"></span>{{ info.EUR.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isShown == 3"> 
                    {{info.GBP.description}}:  
                    <span class="lighten">
                        <span v-html="info.GBP.symbol"></span>{{ info.GBP.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isShown == 4"> 
                    {{ltlinfo.LTL.description}}: Lt {{ ltlinfo.LTL.rate_float | currencydecimal }}
                </h1>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        el: '#zap',
        data () {
            return {
                info: null,
                ltlinfo: null,
                loading: true,
                errored: false,
                isShown: 1,
                isHiddenEUR: false,
                isHiddenGBP: false,
                isHiddenLTL: false
            }
        },
        filters: {
            currencydecimal (value) {
                return value.toFixed(2);
            }
        },
        methods: {
            say: function (message) {
                alert(message);
            },
            changeShown(number){
                this.isShown = number;
            },
            getPrices(){
                axios
                    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    .then(response => {
                        this.info = response.data.bpi;
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => this.loading = false);

                axios
                    .get('https://api.coindesk.com/v1/bpi/currentprice/LTL.json')
                    .then(response => {
                        this.ltlinfo = response.data.bpi;
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => this.loading = false);

            }
        },
        mounted () {
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    this.info = response.data.bpi;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false);

            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice/LTL.json')
                .then(response => {
                    this.ltlinfo = response.data.bpi;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false);
        }
    }
</script>