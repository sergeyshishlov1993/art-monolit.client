<template>
  <div class="ticker-affix">
    <div ref="sentinelElement" class="ticker-affix__sentinel" aria-hidden="true"></div>
    <div class="ticker-affix__placeholder" :style="placeholderStyle"></div>

    <div
        ref="tickerElement"
        class="ticker"
        :class="{ 'ticker--fixed': isFixed }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
      <div class="ticker__viewport">
        <div class="ticker__track" :class="{ 'ticker__track--paused': isHovered }">
          <div class="ticker__group" aria-hidden="true">
            <div class="ticker__item" v-for="(message, index) in filledMessages" :key="`a-${index}`">
              <span class="ticker__label">Акція</span>
              <span class="ticker__text">{{ message }}</span>
              <span class="ticker__separator" aria-hidden="true">•</span>
            </div>
          </div>

          <div class="ticker__group">
            <div class="ticker__item" v-for="(message, index) in filledMessages" :key="`b-${index}`">
              <span class="ticker__label">Акція</span>
              <span class="ticker__text">{{ message }}</span>
              <span class="ticker__separator" aria-hidden="true">•</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  text: readonly string[];
}>();

const isHovered = ref<boolean>(false);
const isFixed = ref<boolean>(false);

const tickerElement = ref<HTMLDivElement | null>(null);
const sentinelElement = ref<HTMLDivElement | null>(null);
const tickerHeight = ref<number>(0);

const baseMessages = computed<readonly string[]>(() => {
  return props.text.map((item) => item.trim()).filter((item) => item.length > 0);
});

const filledMessages = computed<readonly string[]>(() => {
  const source = baseMessages.value;
  if (source.length === 0) return [];

  const targetLength = Math.max(24, source.length * 6);
  const result: string[] = [];

  while (result.length < targetLength) {
    for (const message of source) {
      result.push(message);
      if (result.length >= targetLength) break;
    }
  }

  return result;
});

const placeholderStyle = computed<Record<string, string>>(() => {
  return isFixed.value ? { height: `${tickerHeight.value}px` } : { height: "0px" };
});

let intersectionObserver: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

const updateHeight = (): void => {
  if (!tickerElement.value) return;
  tickerHeight.value = Math.round(tickerElement.value.getBoundingClientRect().height);
};

onMounted(() => {
  updateHeight();

  if (typeof ResizeObserver !== "undefined" && tickerElement.value) {
    resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(tickerElement.value);
  }

  if (sentinelElement.value) {
    intersectionObserver = new IntersectionObserver(
        (entries) => {
          isFixed.value = !(entries[0]?.isIntersecting ?? true);
        },
        { threshold: 0 }
    );
    intersectionObserver.observe(sentinelElement.value);
  }

  window.addEventListener("resize", updateHeight);
});

onBeforeUnmount(() => {
  if (intersectionObserver && sentinelElement.value) {
    intersectionObserver.unobserve(sentinelElement.value);
  }
  if (resizeObserver && tickerElement.value) {
    resizeObserver.unobserve(tickerElement.value);
  }
  window.removeEventListener("resize", updateHeight);
});
</script>

<style scoped lang="scss">
.ticker-affix {
  width: 100%;
}

.ticker-affix__sentinel {
  height: 1px;
}

.ticker-affix__placeholder {
  width: 100%;
  height: 0;
}

.ticker {
  width: 100%;
  overflow: hidden;
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 50;
}

.ticker--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.ticker__viewport {
  width: 100%;
  overflow: hidden;
}

.ticker__track {
  display: flex;
  width: max-content;
  animation: tickerMove 280s linear infinite;
}

.ticker__track--paused {
  animation-play-state: paused;
}

.ticker__group {
  display: flex;
}

.ticker__item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 25px;
  white-space: nowrap;
  font-size: 20px;
  line-height: 1;
}

.ticker__label {
  color: #ff2b2b;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.ticker__text {
  color: #fff;
  font-weight: 600;
}

.ticker__separator {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 800;
}

@keyframes tickerMove {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

</style>
