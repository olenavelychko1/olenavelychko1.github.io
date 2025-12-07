<script setup>
import { computed } from 'vue';
import { TECH_BADGES } from '../data/techBadges';

// RENDERS THE TECH BADGES LIST

const props = defineProps({
    show: { type: Array, default: () => [] } // e.g. ['vuejs','typescript']
});

const filteredBadges = computed(() => {
    if (!props.show || props.show.length === 0) return TECH_BADGES;
    // return a key-value object preserving keys in same shape as TECH_BADGES
    const result = {};
    props.show.forEach(k => {
        const key = k.toLowerCase();
        if (TECH_BADGES[key]) result[key] = TECH_BADGES[key];
    });
    return result;
});
</script>

<template>
    <div class="tech-badges">
        <a v-for="(badge, key) in filteredBadges"
        :key="key" :href="badge.link" target="_blank" rel="noreferrer"
            class="tech-badge">
            <img :src="badge.src" :alt="badge.alt" style="margin: .25rem" />
        </a>
    </div>
</template>

<style scoped>
.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}


</style>
