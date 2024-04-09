<template>
  <div class="HomeBox">
    <div class="card-container">
      <div v-for="(item, index) in filteredWebData" :key="index" class="card2">
        <!-- <img :src="item.img" alt="Card Image" class="card-img" /> -->
        <a :href="item.url" target="_blank">
          <component :is="item.svg" class="SVGclore" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SvgNotion from "../../public/SVG/notion.svg?component";
import SvgHahow from "../../public/SVG/hahow.svg?component";
import SvgUdemy from "../../public/SVG/udemy.svg?component";
import SvgFimga from "../../public/SVG/figma.svg?component";
import SvgGithub from "../../public/SVG/github.svg?component";
// import TheIcon from "../components/TheIcon.vue";

export default {
  data() {
    return {
      webData: [],
    };
  },
  components: {
    SvgNotion,
    SvgHahow,
    SvgUdemy,
    SvgFimga,
    SvgGithub,
  },
  computed: {
    filteredWebData() {
      return this.webData
        .filter((item) => item.Bigtype.includes("辦公"))
        .map((item) => ({
          url: item.url,
          name: item.name,
          svg: item.svg, // 这里的 item.img 应该是对应 SVG 图标的路径，而不是组件名
          info: item.info,
        }));
    },
  },
  mounted() {
    this.fetchWebData();
  },
  methods: {
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
  background-image: url("/public/images/nighe_bg.gif");
  background-size: cover;
  background-position: 0% 80%;
}

.card-container {
  display: flex;
  overflow: hidden;
  width: 80vw;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-around;
}

.card2 {
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
  a {
    width: 100%;
    height: 100%;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
    background-color: rgba(255, 255, 255);
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
      width: 100%;
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
            fill: rgb(255, 255, 255);
            transition: fill 0.3s linear;
          }
        }
      }
    }
  }
}
</style>
