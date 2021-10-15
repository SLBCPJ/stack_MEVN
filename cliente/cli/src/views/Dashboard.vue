<template>
  <div class="">
    <Header />
    <Aside />
    <h1>Bienvenid@ a nuestro sistema</h1>
    <Menu></Menu>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
import Menu from "@/components/Menu";
export default {
  name: "Dashboard",
  components: {
    Header,
    Aside,
    Menu,
    Footer,
  },
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