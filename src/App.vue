<template>
  <div id="app">

    <img src="./assets/logo.png" height="55px">

    <router-view></router-view>
 
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {},
  methods: {}
}
</script>

<style>

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  
}

button {
  cursor: pointer;
  margin-left: 3px;
  margin-right: 1px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 6px;
}

</style>
