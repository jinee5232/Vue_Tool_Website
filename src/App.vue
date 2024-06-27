<template>
  <header>
    <NavBar />
    <!-- <NavBar2 /> -->
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
import "./assets/reset.css";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
</script>

<style>
* {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  box-sizing: border-box;
}
*:focus {
  outline: none;
}
</style>
