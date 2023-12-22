<template>
  <router-view/>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;1,300;1,400&family=Kalam&display=swap');
#app {
  font-family: 'Inria Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container-fluid{
  --bs-gutter-x: 12rem !important;
}

.form-control:focus, select:focus{
  box-shadow: none !important;
}

a{
  text-decoration: none;
}

.single-page-header{
  font-family: 'Kalam', cursive;
  font-weight: 600;
  font-size: 35px;
}
</style>
