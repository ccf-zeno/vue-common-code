<script setup lang="ts">
import { callWebView } from '../../utils';

function onRefresh() {
  if (window?.WebViewJavascriptBridge?.callHandler) {
    callWebView('reload');
  } else {
    location.reload();
  }
}
</script>

<template>
  <van-pull-refresh v-bind="$attrs" @refresh="onRefresh">
    <slot />
  </van-pull-refresh>
</template>

<style module lang="less"></style>
