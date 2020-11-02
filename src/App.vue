<template>
  <div id="app">
    <img alt="Bitcoin logo" id="logo" src="./assets/BTCLogo.svg">
    <Bitcoin/>
    <BitcoinHistory/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bitcoin from './components/Bitcoin';
import BitcoinHistory from './components/BitcoinHistory';

@Component({
  components: {
    Bitcoin,
    BitcoinHistory
  },
})
export default class App extends Vue {}
</script>
