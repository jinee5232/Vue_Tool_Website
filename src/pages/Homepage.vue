<template>
  <div class="HomeBox" :style="backgroundStyle">
    <div class="card-container">
      <div
        v-for="(item, index) in filteredWebData"
        :key="index"
        class="card2"
        @mouseenter="showTooltip(index)"
        @mouseleave="hideTooltip(index)"
        @mousemove="updateTooltipPosition($event, index)"
        ref="cardElements"
      >
        <div
          v-show="item.isTooltipVisible"
          class="tooltip"
          :style="{ top: item.tooltipY + 'px', left: item.tooltipX + 'px' }"
        >
          <span class="tooltip-name">{{ item.name }}</span>
          <span class="tooltip-info">{{ item.info }}</span>
        </div>
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="item.name"
        >
          <component :is="item.svg" class="SVGclore" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SvgFimga from "../../public/SVG/figma.svg?component";
import SvgGithub from "../../public/SVG/github.svg?component";
import HackMD from "../../public/SVG/hackmd.svg?component";
import SvgHahow from "../../public/SVG/hahow.svg?component";
import SvgNotion from "../../public/SVG/notion.svg?component";
import SvgUdemy from "../../public/SVG/udemy.svg?component";

// SVG 字串名稱 → 實際元件對應表
// webdata.json 裡 svg 欄位存的是字串（如 "SvgFimga"），需要在這裡對應成元件
const svgMap = { SvgFimga, SvgGithub, HackMD, SvgHahow, SvgNotion, SvgUdemy };

const webData = ref([]);
const backgroundStyle = ref({});
const cardElements = ref([]);

const filteredWebData = computed(() =>
  webData.value.filter((item) => item.Bigtype.includes("辦公")),
);

function showTooltip(index) {
  filteredWebData.value[index].isTooltipVisible = true;
}
function hideTooltip(index) {
  filteredWebData.value[index].isTooltipVisible = false;
}
function updateTooltipPosition(event, index) {
  const card = cardElements.value[index];
  if (!card) return;
  const rect = card.getBoundingClientRect();
  filteredWebData.value[index].tooltipX = event.clientX - rect.left;
  filteredWebData.value[index].tooltipY = event.clientY - rect.top - 10;
}

async function fetchWebData() {
  try {
    const res = await fetch("/Vue_Tool_Website/webdata.json");
    const data = await res.json();
    webData.value = data.map((item) => ({
      ...item,
      svg: svgMap[item.svg] ?? null,
      isTooltipVisible: false,
      tooltipX: 0,
      tooltipY: 0,
    }));
  } catch (error) {
    console.error("Error fetching web data:", error);
  }
}

// 依照時段選擇背景圖
const BG_IMAGES = {
  dawn: {
    mobile:
      "https://i.pinimg.com/originals/6a/42/9a/6a429af860c91ed307ca581707c21b6c.gif",
    tablet:
      "https://i.pinimg.com/originals/c5/c6/5b/c5c65bdf726853eb5c4e5384418bab5a.gif",
    desktop:
      "https://i.pinimg.com/originals/48/db/d3/48dbd3dd282e90737625bda891e34f1b.gif",
  },
  morning: {
    mobile:
      "https://i.pinimg.com/originals/b3/7f/bf/b37fbf6cefd77a0c0375f19dde0ee75b.gif",
    tablet:
      "https://i.pinimg.com/originals/e1/19/14/e1191464111f7e01c7b8bdf0dab01033.gif",
    desktop:
      "https://i.pinimg.com/originals/49/66/08/496608bfeedd20ca4f6388d721cc8392.gif",
  },
  noon: {
    mobile:
      "https://i.pinimg.com/564x/cf/6f/5e/cf6f5efdd24ea69543465364efcafe98.jpg",
    tablet:
      "https://i.pinimg.com/originals/50/30/36/503036abe4097ed6c0eee297edde5a3c.gif",
    desktop:
      "https://i.pinimg.com/originals/4a/86/24/4a86243b02d28c05212af2ba91b2e279.gif",
  },
  afternoon: {
    mobile:
      "https://i.pinimg.com/originals/6f/bc/44/6fbc440fae8707546834d0124272500c.gif",
    tablet:
      "https://i.pinimg.com/originals/50/12/3c/50123cfa7afaa751a4bcbe3e92024477.gif",
    desktop:
      "https://i.pinimg.com/originals/0a/a1/31/0aa131abc3ec589e6ecfb97b763924a4.gif",
  },
  evening: {
    mobile:
      "https://i.pinimg.com/originals/2d/44/e9/2d44e965dff94b7aa7a51fb42f25faf8.gif",
    tablet:
      "https://i.pinimg.com/originals/9b/42/05/9b42059d8a17648c903c67979604dd76.gif",
    desktop:
      "https://i.pinimg.com/originals/ef/2f/6f/ef2f6f465754178bcfa9cc5ff48203e7.gif",
  },
  night: {
    mobile:
      "https://i.pinimg.com/originals/96/df/13/96df1363fa65b541a1dfda19bac82690.gif",
    tablet:
      "https://i.pinimg.com/originals/1c/19/31/1c1931f09a88d4ff5ec524a247ebf9e1.gif",
    desktop:
      "https://i.pinimg.com/originals/1c/19/31/1c1931f09a88d4ff5ec524a247ebf9e1.gif",
  },
  latenight: {
    mobile:
      "https://i.pinimg.com/originals/2d/c1/bd/2dc1bd8616e72c9b244fb690e7712989.gif",
    tablet:
      "https://i.pinimg.com/originals/61/8f/08/618f083c61a7460ce0a6064319af41bd.gif",
    desktop:
      "https://i.pinimg.com/originals/61/8f/08/618f083c61a7460ce0a6064319af41bd.gif",
  },
};

function getTimeSlot(hours) {
  if (hours >= 4 && hours < 8) return "dawn";
  if (hours >= 8 && hours < 12) return "morning";
  if (hours >= 12 && hours < 15) return "noon";
  if (hours >= 15 && hours < 18) return "afternoon";
  if (hours >= 18 && hours < 20) return "evening";
  if (hours >= 20 && hours < 22) return "night";
  return "latenight";
}

function getDeviceType() {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1440) return "tablet";
  return "desktop";
}

function setBackground() {
  const hours = new Date().getHours();
  const slot = getTimeSlot(hours);
  const device = getDeviceType();
  const imageUrl = `url(${BG_IMAGES[slot][device]})`;

  backgroundStyle.value = {
    backgroundImage: imageUrl,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: device === "mobile" ? "50% 100%" : "0% 80%",
    backgroundAttachment: "fixed",
  };
}

onMounted(() => {
  fetchWebData();
  setBackground();
  window.addEventListener("resize", setBackground);
});

onUnmounted(() => {
  window.removeEventListener("resize", setBackground);
});
</script>

<style scoped>
.HomeBox {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: auto;
  justify-content: space-around;
}
.card2 {
  position: relative;
  width: 150px;
  padding: 30px;
  margin: 20px;
  border-radius: 16px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: cardIn 2s forwards;
}
.card2 a {
  width: 100%;
  height: 100%;
  display: block;
}
.card2:hover {
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-color: rgba(255, 255, 255, 0.45);
  transform: scale(1.06) translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}
.card2:hover .SVGclore {
  filter: none;
  opacity: 1;
}

.SVGclore {
  opacity: 0.75;
  filter: brightness(0) invert(1);
  transition:
    opacity 0.3s ease,
    filter 0.3s ease;
}

@keyframes cardIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tooltip {
  position: absolute;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tooltip-name {
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
}
.tooltip-info {
  color: #dddddd;
  font-size: 13px;
  max-width: 200px;
  white-space: normal;
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
  }
  .card-container {
    width: 90%;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 15px;
  }
  .card2 {
    width: 100%;
    margin: 0;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card2 a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .SVGclore {
    width: 100%;
    height: 100%;
    max-width: 55px;
    max-height: 55px;
    filter: brightness(0) invert(1);
    opacity: 0.75;
  }
}
</style>
