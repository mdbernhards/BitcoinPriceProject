<template>
    <div id="bitcoinPrice">
        <h1>Bitcoin Price</h1>

        <section v-if="errored">
            <p>Price currently not available</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <div class="currencyButtons">
                    <button @click="changeCurrency('USD')">USD</button>
                    <button @click="changeCurrency('EUR')">EUR</button>
                    <button @click="changeCurrency('GBP')">GBP</button>
                    <button @click="changeCurrency('LTL')">LTL</button>
                </div>
                <div class="currency">
                    <span class="date">Current price:</span>
                    <div class = "currencyText">
                        <h1>{{currency.name}}: {{currency.simbol}} {{currency.price}}</h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    export default{
        el: '#bitcoinPrice',
        data () {
            return {
                currency: {
                    name: null,
                    price: 1000,
                    simbol: "$"
                }, 
                info: null,
                ltlinfo: null,
                loading: true,
                errored: false
            }
        },
        methods: {
            changeCurrency(currencyShown: string){
                this.getPrices();

                if(currencyShown == "USD"){
                    this.currency.name = this.info.USD.description;
                    this.currency.price = this.info.USD.rate_float.toFixed(2);
                    this.currency.simbol = "$";
                }
                else if(currencyShown == "EUR"){
                    this.currency.name = this.info.EUR.description;
                    this.currency.price = this.info.EUR.rate_float.toFixed(2);
                    this.currency.simbol = "€";
                }
                else if(currencyShown == "GBP"){
                    this.currency.name = this.info.GBP.description;
                    this.currency.price = this.info.GBP.rate_float.toFixed(2);
                    this.currency.simbol = "£";
                }
                else if(currencyShown == "LTL"){
                    this.currency.name = this.ltlinfo.LTL.description;
                    this.currency.price = this.ltlinfo.LTL.rate_float.toFixed(2);
                    this.currency.simbol = "Lt";
                }
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
                    this.currency.name = response.data.bpi.USD.description;
                    this.currency.price = response.data.bpi.USD.rate_float.toFixed(2);
                    this.currency.simbol = "$";
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false);
        }
    }
</script>