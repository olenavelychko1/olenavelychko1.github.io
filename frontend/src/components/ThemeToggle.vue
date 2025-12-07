<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme';

const { current, toggle, iconHtml } = useTheme();
const icon = computed(() => iconHtml());
</script>

<template>
  <button
    id="themeToggle"
    class="theme-btn"
    :aria-pressed="current === 'dark'"
    aria-label="Toggle color theme"
    title="Toggle theme"
    @click="toggle"
    v-html="icon"
  />
</template>

<style scoped>
.theme-btn {
  width: 40px;
  height: 40px;
  display: inline-grid;
  place-items: center;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-default);
  outline: none;
}
.theme-btn:focus {
  box-shadow: 0 0 0 4px rgba(107, 227, 176, 0.12);
}

</style>
