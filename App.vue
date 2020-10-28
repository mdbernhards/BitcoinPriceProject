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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>