<template>
    <div id="zap">
        <h1>Bitcoin Price</h1>

        <section v-if="errored">
            <p>Price currently not available</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <button v-on:click="isHiddenUSD = true; isHiddenEUR = false; isHiddenGBP = false; isHiddenLTL = false">USD</button>
                <button v-on:click="isHiddenEUR = true; isHiddenUSD = false; isHiddenGBP = false; isHiddenLTL = false">EUR</button>
                <button v-on:click="isHiddenGBP = true; isHiddenUSD = false; isHiddenEUR = false; isHiddenLTL = false">GBP</button>
                <button v-on:click="isHiddenLTL = true; isHiddenEUR = false; isHiddenGBP = false; isHiddenUSD = false">LTL</button>
                
                <h1 v-if="isHiddenUSD"> 
                    {{info.USD.description}}:  
                    <span class="lighten">
                        <span v-html="info.USD.symbol"></span>{{ info.USD.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isHiddenEUR"> 
                    {{info.EUR.description}}:  
                    <span class="lighten">
                        <span v-html="info.EUR.symbol"></span>{{ info.EUR.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isHiddenGBP"> 
                    {{info.GBP.description}}:  
                    <span class="lighten">
                        <span v-html="info.GBP.symbol"></span>{{ info.GBP.rate_float | currencydecimal }}
                    </span>
                </h1>

                <h1 v-if="isHiddenLTL"> 
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
                isHiddenUSD: false,
                isHiddenEUR: false,
                isHiddenGBP: false,
                isHiddenLTL: false
            }
        },
        filters: {
            currencydecimal (value) {
                return value.toFixed(2)
            }
        },
        methods: {
            say: function (message) {
                alert(message)
            }
        },
        mounted () {
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    this.info = response.data.bpi
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)

            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice/LTL.json')
                .then(response => {
                    this.ltlinfo = response.data.bpi
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>

<style>

</style>