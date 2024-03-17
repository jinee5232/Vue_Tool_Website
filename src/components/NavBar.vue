<template>
  <!-- :class="[scrollPosition >= 120 ? 'shrink' : 'isTop']" -->
  <div class="header" :class="[scrollPosition >= 120 ? 'shrink' : 'isTop']">
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
            <router-link to="/Vue_Tool_Website/">首頁</router-link>
          </li>
          <li><router-link to="/DGraphicPage">平面美編</router-link></li>
          <li><router-link to="/DCssPage">CSS樣式</router-link></li>
          <li><router-link to="/DInspirationPage">靈感</router-link></li>
          <li><router-link to="/OtherToolPage">更多工具</router-link></li>
        </ul>
      </nav>
      <button type="button" class="menuOpenBtn"><span></span></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0, // 初始化滚动位置为 0
    };
  },
  methods: {
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
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
  display: flex;
  justify-content: end;
  align-items: center;
}
/* @media (min-width: 75.0625em) {
  header .socialList:before {
    content: "資助我們";
    margin-right: 30px;
    color: #4a4ab1;
    cursor: pointer;
  }
} */
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
.menu > li + li {
  padding-left: 50px;
}
@media (max-width: 82.5em) {
  .menu > li + li {
    padding-left: 20px;
  }
}

@media (max-width: 82.5em) {
  .menu > li + li:before {
    left: 10px;
  }
}
.menu a {
  position: relative;
  display: block;
  padding: 10px 8px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
}
.menu a.current,
.menu a:hover {
  color: #307cae;
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
  background-color: #e9545d;
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
  background-color: #4974ae;
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
  background-color: rgb(31, 24, 133);
}
</style>
