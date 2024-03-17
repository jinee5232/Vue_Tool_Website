<template lang="">
  <div style="margin-top: 200px">
    <div class="card-container">
      <div v-for="(item, index) in filteredWebData" :key="index" class="card">
        <img :src="item.img" alt="Card Image" class="card-img" />
        <div class="card-body">
          <div class="title_type">
            <h2 class="card-title">{{ item.name }}</h2>
            <div class="card-Typebox">
              <p class="card-type">類別：</p>
              <p class="card-typeitem">{{ item.subType }}</p>
            </div>
          </div>

          <div class="card-intrbox">
            <h3>介紹：</h3>
            <p class="card-info">{{ item.info }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      webData: [],
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
  justify-content: space-around;
}

.card {
  width: 500px;
  min-width: 300px;
  margin: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: box-shadow 0.3s linear;
  animation: card 3s forwards;
  animation-duration: 2s;
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
</style>
