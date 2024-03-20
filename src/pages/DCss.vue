<template lang="">
  <div style="margin-top: 200px">
    <div class="card-container">
      <div v-for="(item, index) in filteredWebData" :key="index" class="card">
        <a :href="item.url" target="_blank">
          <div class="card-imgbox">
            <img :src="item.img" alt="Card Image" class="card-img" />
            <p class="card-typeitem2">{{ item.subType }}</p>
          </div>
          <div class="card-infobox" :class="{ opacityIN: animate }">
            <div class="card-intrbox2">
              <h2 class="card-title2">{{ item.name }}</h2>
              <p class="card-info">{{ item.info }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      webData: [],
      animate: false,
    };
  },
  computed: {
    filteredWebData() {
      return this.webData
        .filter((item) => item.Bigtype.includes("CSS"))
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
    this.handleResize();
  },
  methods: {
    handleResize() {
      // 获取窗口宽度
      const windowWidth = window.innerWidth;
      // 根据窗口宽度执行动画
      if (windowWidth <= 767) {
        this.animate = true;
      } else {
        this.animate = false;
      }
    },
    fetchWebData() {
      fetch("/Vue_Tool_Website/webdata.json")
        .then((response) => response.json())
        .then((data) => {
          this.webData = data;
        })
        .catch((error) => {
          console.error("Error fetching web data:", error);
        });
    },
  },
};
</script>
<style scoped>
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
.card-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.card-intrbox2 {
  width: 80%;
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
@media (max-width: 767px) {
  .card-container {
    width: 95vw;
    .card {
      width: 100%;
      margin: 30px 0;
      border: 1px solid #ccc;
      display: flex;
      position: relative;
      a {
        display: flex;
      }
      &:hover,
      &:active {
        .card-infobox {
          display: block;
        }
      }
    }
    .card-imgbox {
      width: 100%;
      min-height: 300px;
      .card-img {
        width: 100%;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        object-fit: contain;
      }
    }
    .card-infobox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      z-index: 5;
      background-color: rgb(255, 255, 255, 0.5);
      transition-delay: 5s;
      animation: opacityinto ease-in 5s forwards;
      .card-info {
        background-color: #fff;
      }
      /* transition-timing-function: 5s;
      transition: opacityinto 5s ease; */
    }
    .opacityIN {
      opacity: 1;
      transition: opacityinto 5s ease-in;
    }
    @keyframes opacityinto {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
}
</style>
