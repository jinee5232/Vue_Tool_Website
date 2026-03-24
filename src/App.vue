<template>
  <!-- 過場動畫容器 -->
  <div :class="{ hidden: !isLoading }" id="loading-screen">
    <div class="spinner"></div>
  </div>
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
import { onMounted, ref } from "vue";
import "./assets/reset.css";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
// 過場動畫的控制
const isLoading = ref(true);

onMounted(() => {
  // 模擬載入內容，實際可以根據需求控制載入完成時間
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // 模擬 2 秒過場動畫
});
</script>

<style>
* {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  box-sizing: border-box;
}
*:focus-visible {
  outline: 2px solid #5f5d9c;
  outline-offset: 2px;
}
/* 過場動畫樣式 */
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
}
#loading-screen.hidden {
  opacity: 0;
  visibility: hidden;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
