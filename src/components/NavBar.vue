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
                <router-link to="/page/Other">Angular</router-link>
                <router-link to="/page/Other">Vue</router-link>
                <router-link to="/page/Other">React</router-link>
                <router-link to="/page/Other">Wordpress</router-link>
                <router-link to="/page/Other">網頁工具</router-link>
              </div>
            </li>
          </ul>
        </nav>
        <button type="button" class="menuOpenBtn" @click="hamOpen = !hamOpen">
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
            <router-link to="/page/Other" @click="closeSidebar"
              >Angular</router-link
            >
            <router-link to="/page/Other" @click="closeSidebar"
              >Vue</router-link
            >
            <router-link to="/page/Other" @click="closeSidebar"
              >React</router-link
            >
            <router-link to="/page/Other" @click="closeSidebar"
              >Wordpress</router-link
            >
            <router-link to="/page/Other" @click="closeSidebar"
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
.header_bg {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 90;
}
*:focus {
  outline: none;
}
.menuOpenBtn:after,
.menuOpenBtn:before,
.menuOpenBtn span,
.menu a:before,
.slideMenu a:before,
.slideMenuBox,
body a,
footer .goTop svg,
.header,
.meow-logo,
.nbFont,
.header .wrap {
  transition: all 0.5s ease-out;
}
.pageContainer {
  padding-top: 135px;
}
@media (max-width: 64em) {
  .pageContainer {
    padding-top: 60px;
  }
}
.wrap {
  max-width: 68.75em;
  position: relative;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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
  /* background-color: #fff; */
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
}
.header.isTop {
  box-shadow: 0 0 0 transparent;
}
.header.isTop .wrap {
  height: 135px;
}
@media (max-width: 64em) {
  header.isTop .wrap {
    height: 60px;
  }
}

@media (max-width: 111.25em) {
  header .wrap {
    padding-left: 20px;
    padding-right: 20px;
  }
}
header nav {
  flex-grow: 1;
  padding-right: 3rem;
  display: flex;
  justify-content: end;
  align-items: center;
}

.hameSidebar {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  height: calc(100vh - 100%);
  background-color: #e97575;
  text-align: center;
  z-index: 50;
  animation: rightIn 0.3s forwards;

  ul {
    list-style-type: none;
    height: 100%;
    li {
      line-height: 24px;
      display: block;
      font-size: 20px;
      margin-right: 2rem;
      color: #202020;
      &:hover {
        color: #f7d518;
      }
      .nbFont {
        color: #ffffff;
        &:hover {
          color: #f7d518;
        }
      }
    }
  }
}
@keyframes rightIn {
  from {
    transform: translate3d(20%, 0, 0);
  }

  to {
    transform: none;
  }
}
.dropdownItem {
  line-height: 50px;
  display: block;
  padding: 10px 8px;
  color: #f4edcc;
  font-size: 24px;
  font-weight: 600;
  position: relative;
  &:hover {
    color: #ffffff;
    .ItemDrop {
      opacity: 1;
      max-height: 400px;
    }
  }

  .ItemDrop {
    position: absolute;
    z-index: 203;
    width: 150px;
    left: -25%;
    top: 100%;
    background-color: rgb(237, 175, 175);
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    max-height: 10px;
    transform-origin: top;
    transition: opacity 1s ease, max-height 1s ease;
  }
  .ItemDrop a:hover {
    background-color: #a4ce95;
  }
  .ItemDrop a:before {
    display: none;
  }
}

@media (max-width: 64em) {
  .header .socialList {
    display: none;
  }
}
@media (min-width: 75.0625em) {
  .header .socialList > li + li {
    margin-left: 0.9375em;
  }
}
@media (max-width: 75em) {
  .header .socialList > li + li {
    margin-left: 0.125em;
  }
}

@media (min-width: 25.0625em) {
  .logo a:after {
    margin-left: 12px;
    padding-bottom: 2px;
    color: #939293;
  }
}
.wrap {
  max-width: 68.75em;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 68.75em) {
  .wrap {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media (max-width: 64em) {
  .header.isTop .wrap {
    height: 60px;
  }
}
.header-logo {
  width: 50%;
  height: auto;
}
.logoHigh {
  width: 80%;
  height: auto;
}
.header .wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 111.25em;
  width: 100%;
  height: 80px;
}

/* .logo img {
  width: 50%;
  height: auto;
} */
.menu {
  display: flex;
  justify-content: center;
}
@media (max-width: 64em) {
  .menu {
    display: none;
  }
}
.menu > li {
  position: relative;
}

.menu li {
  margin: 0 20px;
  padding: 0 auto;
}
.menu a {
  position: relative;
  display: block;
  padding: 10px 8px;
  color: #f4edcc;
  font-size: 24px;
  font-weight: 600;
}
.menu a.current,
.menu a:hover {
  color: #ffffff;
}
.menu a.current:before,
.menu a:hover:before {
  right: auto;
  left: 0;
  width: 100%;
}
.menu a:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 0;
  height: 5px;
  background-color: #a4ce95;
}
.socialList {
  display: flex;
  align-items: center;
}
.socialList a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #b3b3b3;
  background-color: #fff;
}
.socialList a:hover {
  color: #4974ae;
}
.menuOpenBtn {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
}
@media (min-width: 64.0625em) {
  .menuOpenBtn {
    display: none;
  }
}
.menuOpenBtn.open span {
  width: 0;
}
.menuOpenBtn.open:before {
  transform: rotate(-45deg);
}
.menuOpenBtn.open:after {
  transform: rotate(45deg);
}
.menuOpenBtn:after,
.menuOpenBtn:before,
.menuOpenBtn span {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 24px;
  height: 2px;
  margin-left: -12px;
  margin-top: 0.5px;
  background-color: #ffffff;
}
.menuOpenBtn:after,
.menuOpenBtn:before {
  content: "";
}
.menuOpenBtn:before {
  transform: translateY(-8px);
}
.menuOpenBtn:after {
  transform: translateY(8px);
}

/* 主訴求 */
.header .demand {
  margin: 20px auto;
  font-size: 32px;
  display: flex;
  flex-direction: column;
}

.header h2 {
  margin: 100px auto 30px auto;
  font-size: 48px;
  font-weight: bold;
}

.header p {
  margin: 5px auto;
  font-size: 32px;
}

.header li {
  box-sizing: border-box;
  padding: 20px 0;
}

.header li img {
  width: 600px;
  height: 400px;
}

.timeline-box {
  width: 650px;
  height: 450px;
}

.intro {
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline li:nth-child(odd) {
  float: left;
  padding-right: 100px;
}

.timeline li:nth-child(even) {
  float: right;
  /* padding-left: 10px; */
  padding-left: 100px;
}

.timeline li::after {
  content: "";
  position: relative;
  width: 2px;
  height: 100%;
  background-color: #404040;
}
/* .timeline li:nth-child(odd) {
  padding-right: 100px;
} */
.isTop {
  padding: 20px 0;
}
.header.shrink {
  padding: 10px 0;
  background-color: #1b3c73;
}
.default-nav {
  background-color: #5f5d9c;
}
.page1-nav {
  background-color: rgba(0, 0, 0, 0.1);
}
.SideItemDrop {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  animation: upIn 0.3s forwards;
  transform-origin: top;

  a {
    padding: 0 2rem;
    width: 100%;
    background-color: white;
    color: #678f59;
    line-height: 36px;
    font-size: 18px;
  }
}
@keyframes upIn {
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(100%);
    opacity: 1;
  }
}
</style>
