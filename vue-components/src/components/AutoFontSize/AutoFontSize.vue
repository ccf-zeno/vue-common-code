<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  text?: string;
}

defineProps<Props>();

const warpDom = ref();
const textDom = ref();

onMounted(() => {
  const containerWidth = warpDom.value.clientWidth;

  let fontSize = parseInt(window.getComputedStyle(textDom.value).fontSize);

  while (textDom.value.scrollWidth > containerWidth && fontSize > 0) {
    fontSize--;
    textDom.value.style.fontSize = fontSize + 'px';
  }
});
</script>

<template>
  <div ref="warpDom" class="mi-autoFontSize">
    <span ref="textDom" class="mi-autoFontSize-text">
      {{ text }}
      <slot />
    </span>
  </div>
</template>

<style module lang="less">
.mi-autoFontSize {
  white-space: nowrap; /* 确保文本不换行 */
  overflow: hidden; /* 隐藏溢出的文本 */

  .mi-autoFontSize-text {
    display: inline-block;
  }
}
</style>
