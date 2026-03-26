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

  <!-- Desktop Theme Toggler -->
  <button class="theme-toggler" @click="toggleTheme" title="Switch Theme">
    <span v-if="isDark" class="material-symbols-outlined">wb_sunny</span>
    <span v-else class="material-symbols-outlined">dark_mode</span>
  </button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "./assets/reset.css";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
const isLoading = ref(true);
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  // Init Theme from LocalStorage or System Preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      isDark.value = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // 模擬載入內容，實際可以根據需求控制載入完成時間
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // 模擬 2 秒過場動畫
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

:root {
  /* Global Light Mode Tokens */
  --bg-color: #f7f9fc;
  --text-primary: #213547;
  --text-secondary: #5a6c7d;
  --card-bg: #ffffff;
  --card-border: rgba(0, 0, 0, 0.05);
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
  --card-shadow-hover: 0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
  --nav-bg: rgba(255, 255, 255, 0.95);
  --nav-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --nav-border: rgba(0,0,0,0.05);
  --group-title: #2c3e50;
  --button-hover-bg: #f9f9f9;
  
  /* Brand Variable (Unified Teal) */
  --brand-color: #277988;
  --brand-color-transparent: rgba(39, 121, 136, 0.9);
  --brand-color-hover: rgba(39, 121, 136, 0.1);
}

html[data-theme='dark'] {
  color-scheme: dark;
  /* Global Dark Mode Tokens */
  --bg-color: #121212;
  --text-primary: #e4e6eb;
  --text-secondary: #b0b3b8;
  --card-bg: #1e1e1e;
  --card-border: rgba(255, 255, 255, 0.08);
  --card-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  --card-shadow-hover: 0 15px 30px rgba(0, 0, 0, 0.6);
  --nav-bg: rgba(18, 18, 18, 0.85); /* Frosty dark */
  --nav-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  --nav-border: rgba(255,255,255,0.08);
  --group-title: #ffffff;
  --button-hover-bg: #333333;

  /* Brand Variable (Orange) */
  --brand-color: #fc9e79;
  --brand-color-transparent: rgba(252, 158, 121, 0.9);
  --brand-color-hover: rgba(252, 158, 121, 0.15);
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  transition: background-color 0.4s ease, color 0.4s ease;
}

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
  background-color: var(--bg-color);
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

/* Theme Toggler Button */
.theme-toggler {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #333333;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.theme-toggler:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .theme-toggler {
    display: none !important;
  }
}
</style>
