<template>

       <div class="container">

        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/notas">Notas</router-link> |
          <router-link to="/users">Usuarios</router-link> |
          <router-link to="/dietas">Dietas</router-link> |
          <router-link to="/register">Registro</router-link> |
          <router-link to="/">        <b-button @click="cerrarSesion()" variant="danger">Cerrar Sesion</b-button>
</router-link>
        </div>

        <h1>Bienvenid@ a nuestro sistema</h1>
        <!-- <b-button @click="cerrarSesion()" variant="danger">Cerrar Sesion</b-button> -->

    </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    cerrarSesion() {
      window.localStorage.removeItem("token");
      this.$router.push({ path: "/" });
    },
  },
};


</script>

<style scoped>
  
</style>