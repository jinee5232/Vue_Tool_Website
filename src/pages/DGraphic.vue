<template lang="">
  <div style="margin-top: 200px">
    <div class="btn_box">
      <button
        type="Abtn"
        @click="showLayout(true)"
        :class="{ b_color: layout }"
      >
        A
      </button>
      <button
        type="Gbtn"
        @click="showLayout(false)"
        :class="{ b_color: !layout }"
      >
        G
      </button>
    </div>

    <div v-show="layout === true">
      <div class="card-container">
        <div v-for="(item, index) in filteredWebData" :key="index" class="card">
          <a :href="item.url" target="_blank">
            <div class="card-imgbox">
              <img :src="item.img" alt="Card Image" class="card-img" />
              <p class="card-typeitem2">{{ item.subType }}</p>
            </div>

            <div class="card-intrbox2">
              <h2 class="card-title2">{{ item.name }}</h2>
              <p class="card-info">{{ item.info }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-show="layout === false">
      <div
        v-for="(group, subType, index) in groupedData"
        :key="subType"
        class="group"
      >
        <h2 v-if="index % 2 === 0" class="group_title groupmove">
          {{ subType }}
        </h2>
        <h2 v-else class="group_title groupmove2">{{ subType }}</h2>
        <swiper
          :slidesPerView="3"
          :spaceBetween="30"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide
            v-for="(item, index) in group"
            :key="index"
            class="card"
          >
            <a :href="item.url" target="_blank">
              <div class="card-imgbox">
                <img :src="item.img" alt="Card Image" class="card-img" />
                <p class="card-typeitem2">{{ item.subType }}</p>
              </div>

              <div class="card-intrbox2">
                <h2 class="card-title2">{{ item.name }}</h2>
                <p class="card-info">{{ item.info }}</p>
              </div>
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
export default {
  data() {
    return {
      webData: [],
      layout: true,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  computed: {
    groupedData() {
      const grouped = {};
      this.filteredWebData.forEach((item) => {
        if (!grouped[item.subType]) {
          grouped[item.subType] = [];
        }
        grouped[item.subType].push(item);
      });
      return grouped;
    },
    filteredWebData() {
      return this.webData
        .filter((item) => item.Bigtype.includes("美編"))
        .map((item) => ({
          url: item.url,
          name: item.name,
          img: item.img,
          info: item.info,
          subType: item.Smalltype,
          // typeof item.type === "string"
          //   ? item.type.split("、")[1]
          //   : Array.isArray(item.type)
          //   ? item.type.join("、").split("、")[1]
          //   : item.type,
        }));
    },
  },
  mounted() {
    this.fetchWebData();
  },
  methods: {
    fetchWebData() {
      fetch("/Vue_Tool_Website/public/webdata.json")
        .then((response) => response.json())
        .then((data) => {
          this.webData = data;
        })
        .catch((error) => {
          console.error("Error fetching web data:", error);
        });
    },
    showLayout(data) {
      this.layout = data;
    },
  },
};
</script>
<style scoped>
.btn_box {
  width: 80vw;
  margin: 0 auto;
  padding: 0 150px;
  margin-bottom: 50px;
  button {
    width: 50px;
    height: 50px;
    margin: 0 15px;
  }
}
.b_color {
  background-color: rgb(106, 168, 219);
}
.group {
  width: 80vw;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  .group_title {
    color: #ffffff;
    font-size: 80px;
    line-height: 100px;
    font-weight: bolder;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      z-index: -1;
      bottom: 0;
      height: 100%; /* 设置伪元素的高度 */
      width: 100%; /* 设置伪元素的宽度 */
      transform: scaleX(0);
    }
  }
}
.groupmove::before {
  left: 0;
  animation: GTitle 3s forwards;
  transform-origin: left; /* 设置变换原点为左侧 */
  animation-duration: 2s;
  background-color: rgb(70, 70, 70);
}
.groupmove2::before {
  right: 0;
  animation: GTitle 3s forwards;
  transform-origin: right; /* 设置变换原点为左侧 */
  animation-duration: 2s;
  background-color: rgb(73, 53, 255);
}

@keyframes GTitle {
  0% {
    transform: scaleX(0);
    border-radius: 0 200px 200px 0;
  }
  50% {
    border-radius: 0 200px 200px 0;
  }
  100% {
    transform: scaleX(1);
    border-radius: 0 0 0 0;
  }
}
@keyframes GTitle2 {
  0% {
    transform: scaleX(0);
    border-radius: 0 200px 200px 0;
  }
  50% {
    border-radius: 0 200px 200px 0;
  }
  100% {
    transform: scaleX(1);
    border-radius: 0 0 0 0;
  }
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
  justify-content: space-between;
}
/* .card-container2 {
  display: flex;
  flex-wrap: nowrap; 防止換行
  overflow-x: auto; 橫向滾動
  避免最後一個卡片被遮擋
} */
.swiper {
  width: 80vw;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
}

.card {
  width: 30%;
  min-width: 300px;
  margin: 30px 0;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: box-shadow 0.3s linear;
  animation: card 3s forwards;
  animation-duration: 2s;
  a {
    color: #000;
    text-decoration: none;
    outline: none;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
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

.card-imgbox {
  width: 100%;
  position: relative;
  .card-typeitem2 {
    position: absolute;
    bottom: 20px;
    font-weight: 600;
    right: 20px;
    color: rgb(255, 255, 255);
    background-color: #277988;
    font-size: 18px;
    padding: 0px 5px;
    line-height: 28px;
  }
}

.card-intrbox2 {
  width: 90%;
  margin: auto;
  margin: 30px auto;
  padding: 5px;
  position: relative;
  border: 2px solid #000;
  .card-info {
    text-indent: 50px;
    padding: 10px;
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
    letter-spacing: 5px;
    text-align: left;
    height: 200px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .card-title2 {
    font-size: 32px;
    position: absolute;
    padding: 0px 10px;
    top: -20px;
    left: 10px;
    background-color: #fff;
  }
}
</style>
