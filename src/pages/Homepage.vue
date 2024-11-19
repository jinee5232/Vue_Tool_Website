<template>
  <div class="HomeBox" :style="backgroundStyle">
    <div class="card-container">
      <div
        v-for="(item, index) in filteredWebData"
        :key="index"
        class="card2"
        :alt="item.Smalltype"
        @mouseenter="showTooltip(index)"
        @mouseleave="hideTooltip(index)"
        @mousemove="updateTooltipPosition($event, index)"
        ref="cardElements"
      >
        <!-- :style="{ top: item.tooltipY + 'px', left: item.tooltipX + 'px' }" -->
        <div
          v-show="item.isTooltipVisible"
          class="tooltip"
          :style="{ top: item.tooltipY + 'px', left: item.tooltipX + 'px' }"
        >
          <span
            :style="{ color: '#ffffff', fontSize: '20px', fontWeight: '1000' }"
            >{{ item.name }}</span
          ><br />
          <span :style="{ color: '#ffffff' }"> {{ item.info }}</span>
        </div>
        <!-- <img :src="item.img" alt="Card Image" class="card-img" /> -->
        <a :href="item.url" target="_blank">
          <component :is="item.svg" class="SVGclore" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SvgFimga from "../../public/SVG/figma.svg?component";
import SvgGithub from "../../public/SVG/github.svg?component";
import HackMD from "../../public/SVG/hackmd.svg?component";
import SvgHahow from "../../public/SVG/hahow.svg?component";
import SvgNotion from "../../public/SVG/notion.svg?component";
import SvgUdemy from "../../public/SVG/udemy.svg?component";
// import TheIcon from "../components/TheIcon.vue";

export default {
  data() {
    return {
      webData: [],
      backgroundStyle: {},
    };
  },
  components: {
    SvgNotion,
    SvgHahow,
    SvgUdemy,
    SvgFimga,
    SvgGithub,
    HackMD,
  },
  computed: {
    filteredWebData() {
      return this.webData.filter((item) => item.Bigtype.includes("辦公"));
    },
  },
  mounted() {
    this.fetchWebData();
    this.setBackground();
  },
  created() {
    window.addEventListener("resize", this.setBackground);
  },
  methods: {
    showTooltip(index) {
      this.filteredWebData[index].isTooltipVisible = true;
    },
    hideTooltip(index) {
      this.filteredWebData[index].isTooltipVisible = false;
    },
    updateTooltipPosition(event, index) {
      // 獲取當前卡片的邊界信息
      const cardElement = this.$refs.cardElements[index]; // 獲取當前卡片的參考
      const rect = cardElement.getBoundingClientRect();

      this.filteredWebData[index].tooltipX = event.clientX - rect.left; // 相對於父元素的 X
      this.filteredWebData[index].tooltipY = event.clientY - rect.top; // 相對於父元素的 Y

      // 可以添加一些偏移量
      const tooltipOffset = 10; // 可調整的偏移量
      this.filteredWebData[index].tooltipY -= tooltipOffset; // 在鼠標上方顯示
    },
    fetchWebData() {
      fetch("/Vue_Tool_Website/webdata.json")
        .then((response) => response.json())
        .then((data) => {
          this.webData = data.map((item) => ({
            ...item,
            isTooltipVisible: false, // 確保每個項目都有這個屬性
            tooltipX: 0,
            tooltipY: 0,
          }));
        })
        .catch((error) => {
          console.error("Error fetching web data:", error);
        });
    },
    setBackground() {
      const now = new Date();
      const hours = now.getHours();
      const isMobile = window.innerWidth < 768;
      const isTable = (window.innerWidth >= 768) & (window.innerWidth < 1440);

      let imageUrl = "";

      if (hours >= 4 && hours < 8) {
        // 清晨
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/6a/42/9a/6a429af860c91ed307ca581707c21b6c.gif)"
          : isTable
          ? "url(https://i.pinimg.com/originals/c5/c6/5b/c5c65bdf726853eb5c4e5384418bab5a.gif)"
          : "url(https://i.pinimg.com/originals/48/db/d3/48dbd3dd282e90737625bda891e34f1b.gif)";
      } else if (hours >= 8 && hours < 12) {
        // 早上
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/b3/7f/bf/b37fbf6cefd77a0c0375f19dde0ee75b.gif)"
          : isTable
          ? "url(https://i.pinimg.com/originals/e1/19/14/e1191464111f7e01c7b8bdf0dab01033.gif)"
          : "url(https://i.pinimg.com/originals/49/66/08/496608bfeedd20ca4f6388d721cc8392.gif)";
      } else if (hours >= 12 && hours < 15) {
        // 中午
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/564x/cf/6f/5e/cf6f5efdd24ea69543465364efcafe98.jpg)"
          : isTable
          ? "url(https://i.pinimg.com/originals/50/30/36/503036abe4097ed6c0eee297edde5a3c.gif)"
          : "url(https://i.pinimg.com/originals/4a/86/24/4a86243b02d28c05212af2ba91b2e279.gif)";
      } else if (hours >= 15 && hours < 18) {
        // 下午
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/6f/bc/44/6fbc440fae8707546834d0124272500c.gif)"
          : isTable
          ? "url(https://i.pinimg.com/originals/50/12/3c/50123cfa7afaa751a4bcbe3e92024477.gif)"
          : "url(https://i.pinimg.com/originals/0a/a1/31/0aa131abc3ec589e6ecfb97b763924a4.gif)";
      } else if (hours >= 18 && hours < 20) {
        // 傍晚
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/2d/44/e9/2d44e965dff94b7aa7a51fb42f25faf8.gif)"
          : isTable
          ? "url(https://i.pinimg.com/originals/9b/42/05/9b42059d8a17648c903c67979604dd76.gif)"
          : "url(https://i.pinimg.com/originals/ef/2f/6f/ef2f6f465754178bcfa9cc5ff48203e7.gif)";
      } else if (hours >= 20 && hours < 22) {
        // 晚上
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/96/df/13/96df1363fa65b541a1dfda19bac82690.gif)"
          : "url(https://i.pinimg.com/originals/1c/19/31/1c1931f09a88d4ff5ec524a247ebf9e1.gif)";
      } else {
        // 其他
        imageUrl = isMobile
          ? "url(https://i.pinimg.com/originals/2d/c1/bd/2dc1bd8616e72c9b244fb690e7712989.gif)"
          : "url(https://i.pinimg.com/originals/61/8f/08/618f083c61a7460ce0a6064319af41bd.gif)";
      }

      this.backgroundStyle = isMobile
        ? {
            backgroundImage: imageUrl,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: " 50% 100%",
            backgroundAttachment: "fixed",
          }
        : {
            backgroundImage: imageUrl,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: " 0% 80%",
            backgroundAttachment: "fixed",
          };
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.7); /* 背景色 */

  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 9999; /* 提高 z-index，確保 tooltip 不被其他元素遮擋 */
}
*:focus {
  outline: none;
}
.SVGclore {
  fill: rgb(255, 255, 255);
  transition: fill 0.3s linear;
}

.HomeBox {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-self: center;
  /* background-image: url("https://images.pexels.com/photos/937782/pexels-photo-937782.jpeg"); */
  /* background-image: url(https://i.imgur.com/7lEglhQ.gif); */
  /* background-image: url(https://i.pinimg.com/originals/1c/19/31/1c1931f09a88d4ff5ec524a247ebf9e1.gif);
  background-size: cover;
  background-position: 0% 80%; */
}

.card-container {
  display: flex;
  /* overflow: hidden; */
  width: 80vw;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-around;
}

.card2 {
  position: relative;
  width: 150px;
  padding: 30px;
  /* min-width: 300px; */
  margin: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  transition: box-shadow 0.3s linear;
  transition: background-color 0.3s linear;
  transition: background-color 0.3s linear;
  transition: fill 0.3s linear;
  animation: card 3s forwards;
  animation-duration: 2s;
  mix-blend-mode: exclusion;
  a {
    width: 100%;
    height: 100%;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
    background-color: rgba(255, 255, 255);
    mix-blend-mode: normal;
    .SVGclore {
      fill: rgb(125, 165, 106);
    }
  }
}
.card-body {
  padding: 10px;
}
.card-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.title_type {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-title {
  margin: 0;
  font-size: 32px;
  line-height: 50px;
  margin-bottom: 10px;
}
.card-Typebox {
  display: flex;
  .card-type {
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
  }
  .card-typeitem {
    color: red;
    font-size: 18px;
    padding: 0px 5px;
    line-height: 28px;
    border: 1px solid green;
  }
}
.card-intrbox {
  width: 100%;
  padding: 5px;
  h3 {
    font-size: 24px;
    margin-bottom: 5px;
    line-height: 30px;
  }
  .card-info {
    text-indent: 50px;
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
    letter-spacing: 5px;
  }
}
@keyframes card {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 1440px) {
  .card-container {
    width: 100vw;
  }
}
@media (max-width: 767px) {
  .HomeBox {
    padding-top: 100px;
    height: auto;
    min-height: 100vh;
    background-size: cover;
    .card-container {
      width: 80%;
      margin-top: 50px;
      .card2 {
        width: 80%;
        margin: 5% 20%;
        display: flex;
        a {
          display: flex;
          width: 100%;
          height: 100%;
          .SVGclore {
            width: 100%;
            height: 100%;
            .SVGclore {
              fill: rgb(125, 165, 106);
            }
            transition: fill 0.3s linear;
          }
        }
      }
    }
  }
}
</style>
