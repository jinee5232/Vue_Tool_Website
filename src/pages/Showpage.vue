<template>
  <div style="margin-top: 200px" v-if="filteredWebData.length !== 0">
    <div class="btn_box">
      <div class="checkbox-wrapper-63">
        <label class="switch">
          <input type="checkbox" @click="this.layout = !this.layout" />
          <span class="slider"></span>
        </label>
      </div>
      <div style="margin-left: 2rem">
        <p v-if="layout === true">Single</p>
        <p v-if="layout === false">Group</p>
      </div>
    </div>

    <div v-show="layout === true">
      <div class="tag-filter-container">
        <span
          v-for="tag in allTags"
          :key="tag"
          :class="['tag-item', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </span>
        <button
          v-if="selectedTags.length > 0"
          @click="selectedTags = []"
          class="clear-btn"
        >
          清除全部
        </button>
      </div>
      <div class="card-container">
        <div v-for="(item, index) in displayedCards" :key="index" class="card">
          <a :href="item.url" target="_blank">
            <div class="card-imgbox">
              <img
                :src="item.img"
                alt="Card Image"
                class="card-img"
                referrerpolicy="no-referrer"
              />
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
          :slidesPerView="slidesPerView"
          :spaceBetween="swiperGap"
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
                <img
                  :src="item.img"
                  alt="Card Image"
                  class="card-img"
                  referrerpolicy="no-referrer"
                />
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
  <div class="noData_bg" v-if="filteredWebData.length === 0">
    <div>
      <img src="/images/NoData.png" alt="" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default {
  data() {
    return {
      webData: [],
      layout: true,
      selectedTags: [],
      slidesPerView: 3,
      swiperGap: 30,
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },
  created() {
    this.updateSlidesPerView();
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  computed: {
    // 1. 獲取當前大類下所有的子標籤 (用於渲染按鈕)
    allTags() {
      const tags = this.filteredWebData.map((item) => item.subType);
      return [...new Set(tags)]; // 去重
    },

    // 2. 這是最終渲染在 Single Layout 上的資料
    displayedCards() {
      if (this.selectedTags.length === 0) {
        return this.filteredWebData;
      }
      return this.filteredWebData.filter((item) =>
        this.selectedTags.includes(item.subType),
      );
    },
    groupedData() {
      const grouped = {};
      this.filteredWebData.forEach((item) => {
        if (!grouped[item.subType]) {
          grouped[item.subType] = [];
        }
        grouped[item.subType].push(item);
      });
      console.log(this.filteredWebData);
      return grouped;
    },
    filteredWebData() {
      const type = this.$route.params.type;

      return this.webData
        .filter((item) => item.Bigtype.includes(type))
        .map((item) => ({
          url: item.url,
          name: item.name,
          img: item.img,
          info: item.info,
          subType: item.Smalltype,
        }));
    },
  },
  watch: {
    "$route.params.type": "fetchWebData",
    "$route.params.type"() {
      this.selectedTags = []; // 切換大類時清空選中標籤
      this.fetchWebData();
    },
  },
  mounted() {
    this.fetchWebData();
  },
  methods: {
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1); // 如果已選中，則移除
      } else {
        this.selectedTags.push(tag); // 如果未選中，則加入
      }
    },
    updateSlidesPerView() {
      const w = window.innerWidth;
      let containerWidth, minItemWidth, gap;

      if (w <= 800) {
        containerWidth = w * 0.9; // matches .swiper { width: 90vw }
        minItemWidth = 280;
        gap = 20;
      } else {
        containerWidth = w * 0.8; // matches .swiper { width: 80vw }
        minItemWidth = 300;
        gap = 30;
      }

      // Exact mathematical formula mirroring CSS grid auto-fill logic
      let columns = Math.floor((containerWidth + gap) / (minItemWidth + gap));
      if (columns < 1) columns = 1;

      this.slidesPerView = columns;
      this.swiperGap = gap;
    },
    async fetchWebData() {
      try {
        const response = await axios.get("/Vue_Tool_Website/webdata.json");
        this.webData = response.data;
      } catch (error) {
        console.error("Error fetching web data:", error);
      }
    },
    showLayout(data) {
      this.layout = data;
    },
  },
};
</script>

<style scoped>
.noData_bg {
  margin-top: 200px;
  display: flex;
  justify-content: center;
}
.btn_box {
  width: 80vw;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  margin: 0 auto 30px auto;
  padding: 0;
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
  margin-bottom: 60px;
  text-align: center;
  
  .group_title {
    color: var(--group-title);
    font-size: clamp(24px, 5vw, 36px);
    line-height: 1.2;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 40px;
    position: relative;
    display: inline-block;
    letter-spacing: 2px;
    text-transform: capitalize;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background-color: var(--brand-color);
      border-radius: 4px;
    }
  }
}

.groupmove, .groupmove2 {
  animation: fadeUp 1s ease forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  width: 80vw;
  margin: 0 auto;
}

.swiper {
  width: 80vw;
  height: 100%;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 60px;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
}

:deep(.swiper-slide) {
  height: auto;
}

:deep(.swiper-pagination-bullets) {
  bottom: 0px !important;
}

.card {
  width: 100%;
  margin: 0;
  border: 1px solid var(--card-border);
  border-radius: 16px;
  background-color: var(--card-bg);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: var(--card-shadow);
  animation: card 0.8s forwards;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    outline: none;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--card-shadow-hover);

    .card-img {
      transform: scale(1.05);
    }
  }
}

@keyframes card {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-imgbox {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--card-border);
  
  .card-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  
  .card-typeitem2 {
    position: absolute;
    bottom: 12px;
    right: 12px;
    font-weight: 500;
    color: #fff;
    background-color: var(--brand-color-transparent);
    backdrop-filter: blur(4px);
    font-size: 14px;
    padding: 6px 14px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

.card-intrbox2 {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: var(--card-bg);

  .card-title2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .card-info {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-secondary);
    font-weight: 400;
    text-indent: 0;
    padding: 0;
    margin: 0;
    padding-right: 8px; /* space for scrollbar */
    
    /* Fixed height for perfectly uniform cards with sleek vertical scroll */
    height: 72px;
    overflow-y: auto;
    
    /* Thin custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--brand-color-transparent) transparent;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--brand-color-transparent);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--brand-color);
    }
  }
}

/* Mobile queries moved to bottom of file */

.checkbox-wrapper-63 input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper-63 *,
.checkbox-wrapper-63 ::after,
.checkbox-wrapper-63 ::before {
  box-sizing: border-box;
}

/* The switch - the box around the slider */
.checkbox-wrapper-63 .switch {
  font-size: 1rem;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
}

/* The slider */
.checkbox-wrapper-63 .slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #eee;
  transition: 0.4s;
  border-radius: 0.5em;
  box-shadow: 0 0.2em #dfd9d9;
}

.checkbox-wrapper-63 .slider:before {
  position: absolute;
  content: "";
  height: 1.5em;
  width: 1.4em;
  border-radius: 0.3em;
  left: 0.3em;
  bottom: 0.7em;
  background-color: lightsalmon;
  transition: 0.4s;
  box-shadow: 0 0.4em #bcb4b4;
}

.checkbox-wrapper-63 .slider:hover::before {
  box-shadow: 0 0.2em #bcb4b4;
  bottom: 0.5em;
}

.checkbox-wrapper-63 input:checked + .slider::before {
  transform: translateX(2em);
  background: lightgreen;
}
.tag-filter-container {
  width: 80vw;
  margin: 0 auto 20px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.tag-item {
  padding: 6px 15px;
  border: 1px solid var(--brand-color);
  border-radius: 20px;
  cursor: pointer;
  color: var(--brand-color);
  transition: all 0.3s;
  font-weight: 600;
  user-select: none;
}

.tag-item:hover {
  background-color: var(--brand-color-hover);
}

.tag-item.active {
  background-color: var(--brand-color);
  color: #fff;
}

.clear-btn {
  background: none;
  border: none;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
}

@media (max-width: 800px) {
  .card-container, .swiper, .group, .btn_box, .tag-filter-container {
    width: 90vw;
  }
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    gap: 15px;
  }
  .card-intrbox2 {
    padding: 16px;
    .card-title2 {
      font-size: 18px;
    }
  }
  .tag-filter-container {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 15px;
    scrollbar-width: thin;
    scrollbar-color: var(--brand-color-transparent) transparent;
  }
  .tag-filter-container::-webkit-scrollbar {
    height: 4px;
  }
  .tag-filter-container::-webkit-scrollbar-thumb {
    background-color: var(--brand-color-transparent);
    border-radius: 4px;
  }
  .tag-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
}
</style>
