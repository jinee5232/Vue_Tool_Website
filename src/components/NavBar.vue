<template>
  <!-- :class="[scrollPosition >= 120 ? 'shrink' : 'isTop']" -->
  <div class="header_bg">
    <div
      class="header"
      :class="[navClass, scrollPosition >= 120 ? 'shrink' : 'isTop']"
    >
      <div class="wrap">
        <div class="logo">
          <router-link to="/Vue_Tool_Website/">
            <img
              class="meow-logo"
              src=""
              alt=""
              :class="[scrollPosition >= 120 ? 'header-logo' : 'logoHigh']"
            />
          </router-link>
        </div>
        <nav>
          <ul class="menu">
            <li>
              <div>
                <router-link class="nbFont" to="/">首頁</router-link>
              </div>
            </li>
            <li>
              <div>
                <router-link class="nbFont" to="/page/美編"
                  >平面美編</router-link
                >
              </div>
            </li>
            <li>
              <div>
                <router-link class="nbFont" to="/page/CSS">CSS樣式</router-link>
              </div>
            </li>
            <li>
              <div>
                <router-link class="nbFont" to="/page/靈感">靈感</router-link>
              </div>
            </li>
            <li
              @mouseenter="dropdown1Open = true"
              @mouseleave="dropdown1Open = false"
              class="dropdownItem"
            >
              <div>
                <div class="nbFont">網頁製作</div>
              </div>
              <!-- v-show="dropdown1Open" -->
              <div class="ItemDrop">
                <router-link to="/page/Angular">Angular</router-link>
                <router-link to="/page/Vue">Vue</router-link>
                <router-link to="/page/React">React</router-link>
                <router-link to="/page/Wordpress">Wordpress</router-link>
                <router-link to="/page/工具">網頁工具</router-link>
              </div>
            </li>
          </ul>
        </nav>
        <button type="button" class="menuOpenBtn" :class="{ 'open': hamOpen }" @click="hamOpen = !hamOpen">
          <span></span>
        </button>
      </div>
      <div v-if="hamOpen" class="hameSidebar">
        <ul>
          <li>
            <router-link class="nbFont" @click="closeSidebar" to="/"
              >首頁</router-link
            >
          </li>
          <li>
            <router-link class="nbFont" @click="closeSidebar" to="/page/美編"
              >平面美編</router-link
            >
          </li>
          <li>
            <router-link class="nbFont" @click="closeSidebar" to="/page/CSS"
              >CSS樣式</router-link
            >
          </li>
          <li>
            <router-link class="nbFont" @click="closeSidebar" to="/page/靈感"
              >靈感</router-link
            >
          </li>
          <li>
            <div class="nbFont" @click="MorebtnClick = !MorebtnClick">
              網頁製作
            </div>
          </li>
          <div v-if="MorebtnClick === true" class="SideItemDrop">
            <router-link to="/page/Angular" @click="closeSidebar"
              >Angular</router-link
            >
            <router-link to="/page/Vue" @click="closeSidebar">Vue</router-link>
            <router-link to="/page/React" @click="closeSidebar"
              >React</router-link
            >
            <router-link to="/page/Wordpress" @click="closeSidebar"
              >Wordpress</router-link
            >
            <router-link to="/page/工具" @click="closeSidebar"
              >網頁工具</router-link
            >
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hamOpen: false,
      dropdown1Open: false,
      navClass: "default-nav", // 默认样式
      scrollPosition: 0, // 初始化滚动位置为 0
      MorebtnClick: false,
    };
  },
  watch: {
    $route() {
      this.updateNavClass();
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    this.updateNavClass();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    closeSidebar() {
      this.hamOpen = false;
      this.MorebtnClick = false;
    },
    handleResize() {
      // 获取视口宽度
      const windowWidth = window.innerWidth;
      // 假设在小于 768px 的视口宽度下将 open 设置为 false
      if (windowWidth >= 768) {
        this.hamOpen = false;
      }
    },
    updateNavClass() {
      // 根据当前路由路径更新导航栏样式
      if (this.$route.path === "/") {
        this.navClass = "page1-nav";
      } else {
        this.navClass = "default-nav";
      }
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 100;
        window.scrollTo({
          top: section.offsetTop - offset,
          behavior: "smooth",
        });
      }
    },
  },
  mounted() {
    // run the function when the component's mount
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.header_bg {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1000;
}

*:focus {
  outline: none;
}

.menuOpenBtn:after,
.menuOpenBtn:before,
.menuOpenBtn span,
.menu a:before,
.header,
.meow-logo,
.nbFont,
.header .wrap,
.ItemDrop,
.hameSidebar,
.SideItemDrop {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.wrap {
  max-width: 68.75em;
  position: relative;
  width: 100%;
  margin: 0 auto;
  font-family: "Inter", "Helvetica Neue", sans-serif;
}

@media (max-width: 68.75em) {
  .wrap {
    padding-left: 20px;
    padding-right: 20px;
  }
}

body a {
  text-decoration: none;
}

.header {
  position: relative;
  width: 100%;
}

.header.isTop {
  background-color: transparent;
  box-shadow: none;
}

.header.isTop .wrap {
  height: 100px;
}

@media (max-width: 64em) {
  .header.isTop .wrap {
    height: 70px;
  }
}

.header.shrink {
  background: var(--nav-bg) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--nav-shadow);
  border-bottom: 1px solid var(--nav-border);
}

.header.shrink .wrap {
  height: 70px;
}

@media (max-width: 64em) {
  .header.shrink .wrap {
    height: 60px;
  }
}

.header.page1-nav.isTop {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header.default-nav {
  background-color: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  border-bottom: 1px solid var(--nav-border);
}

.header .wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 111.25em;
}

.header-logo {
  height: 40px;
  width: auto;
}

.logoHigh {
  height: 60px;
  width: auto;
}

header nav {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.menu {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 75em) {
  .menu {
    display: none;
  }
}

.menu > li {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.menu a {
  position: relative;
  display: block;
  padding: 8px 12px;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
}

.header.shrink .menu a, 
.header.default-nav .menu a {
  color: var(--text-primary);
}

.menu a:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 3px;
  background-color: var(--brand-color);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.menu a:hover:before, a.router-link-exact-active:before {
  width: 100%;
}

.menu a:hover, a.router-link-exact-active {
  color: var(--brand-color) !important;
}

/* Distinct Dropdown Button Styling */
.dropdownItem > div > .nbFont {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  font-size: 17px;
  font-weight: 600;
  color: #ffffff !important;
  background-color: var(--brand-color);
  border-radius: 24px;
  border: 2px solid var(--brand-color);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 20;
}

.dropdownItem:hover > div > .nbFont {
  background-color: var(--card-bg);
  color: var(--brand-color) !important;
  border-color: var(--brand-color);
}

/* Remove arrow */
.dropdownItem > div > .nbFont::after {
  display: none !important;
}

.dropdownItem {
  position: relative;
  padding: 10px 0;
}

/* The Detached Premium Glass Stub/Tongue */
.dropdownItem .ItemDrop {
  position: absolute;
  top: 56px; /* Transparent gap below the button */
  left: 50%;
  transform: translateX(-50%);
  width: 140px; /* Same visual width as button */
  background: var(--brand-color-transparent); /* Dynamic Brand Glass */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: none; /* No top border */
  border-radius: 0 0 16px 16px; 
  box-shadow: 0 10px 30px var(--brand-color-hover); /* Tinted shadow */
  overflow: hidden;
  box-sizing: border-box;
  
  padding-top: 20px; /* The visible stub height */
  max-height: 20px; /* Clips the interior so only the stub peeks out initially */
  transition: max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  pointer-events: none;
  z-index: 10;
}

.dropdownItem:hover .ItemDrop {
  max-height: 400px;
  pointer-events: auto;
}

.ItemDrop a {
  padding: 12px 20px;
  color: #ffffff !important; /* White text */
  font-size: 15px;
  font-weight: 600;
  display: block;
  transition: all 0.2s;
  text-align: center;
}

.ItemDrop a:hover {
  background-color: rgba(255, 255, 255, 0.15); /* White glassy hover */
  color: #ffffff !important;
}

.ItemDrop a:before {
  display: none !important;
}

.menuOpenBtn {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  z-index: 2000;
}

@media (min-width: 75em) {
  .menuOpenBtn {
    display: none;
  }
}

.menuOpenBtn span, 
.menuOpenBtn:before, 
.menuOpenBtn:after {
  position: absolute;
  top: 50%; left: 50%;
  width: 24px; height: 2px;
  margin-left: -12px; margin-top: -1px;
  background-color: #ffffff;
  content: "";
}

.header.shrink .menuOpenBtn span, 
.header.shrink .menuOpenBtn:before, 
.header.shrink .menuOpenBtn:after,
.header.default-nav .menuOpenBtn span, 
.header.default-nav .menuOpenBtn:before, 
.header.default-nav .menuOpenBtn:after {
  background-color: var(--text-primary);
}

.menuOpenBtn:before { transform: translateY(-8px); }
.menuOpenBtn:after { transform: translateY(8px); }

.menuOpenBtn.open span { width: 0; }
.menuOpenBtn.open:before {
  transform: rotate(-45deg);
  background-color: var(--text-primary) !important;
}
.menuOpenBtn.open:after {
  transform: rotate(45deg);
  background-color: var(--text-primary) !important;
}

.hameSidebar {
  position: fixed;
  top: 0; right: 0;
  width: min(300px, 85vw);
  height: 100vh;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: -10px 0 30px rgba(0,0,0,0.2);
  text-align: left;
  z-index: 1000;
  padding-top: 100px;
  overflow-y: auto;
  animation: rightIn 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes rightIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.hameSidebar ul {
  list-style-type: none;
  padding: 0 30px;
}

.hameSidebar li {
  margin-bottom: 20px;
}

.hameSidebar .nbFont, .hameSidebar a {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
}

.hameSidebar .nbFont:hover, .hameSidebar a:hover,
.hameSidebar .router-link-exact-active {
  color: #277988 !important;
}

.SideItemDrop {
  margin-top: 10px;
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 10px;
  animation: slideDown 0.3s ease forwards;
  transform-origin: top;
}

@keyframes slideDown {
  from { transform: scaleY(0); opacity: 0; }
  to { transform: scaleY(1); opacity: 1; }
}

.SideItemDrop a {
  padding: 10px 15px;
  font-size: 16px;
  color: #5a6c7d !important;
  font-weight: 500;
  text-decoration: none;
  display: block;
}

.SideItemDrop a:hover {
  filter: brightness(0.8);
}
</style>
