<template>
  <div id="app">
    <img  alt="Bitcoin logo" src="./assets/BTCLogo.svg" style="height: 200px; width: 200px;">
    <Bitcoin/>
    <BitcoinHistory/>
  </div>
</template>

<script>
  import Bitcoin from './components/Bitcoin'
  import BitcoinHistory from './components/BitcoinHistory'

  export default {
    name: 'App',
    components: {
      Bitcoin,
      BitcoinHistory
    }
  }
</script>