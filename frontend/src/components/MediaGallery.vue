<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';


const props = defineProps({
    images: { type: Array, default: () => [] },
    // optional: you can expose a fixed visible height (px) if you want
    visibleHeightPx: { type: Number, default: 360 }
});


function extOf(src) {
    return (src || '').split('.').pop().toLowerCase();
}
function isVideo(src) {
    const ext = extOf(src);
    return ['mp4', 'webm', 'ogg'].includes(ext);
}
function videoMime(src) {
    const ext = extOf(src);
    if (ext === 'mp4') return 'video/mp4';
    if (ext === 'webm') return 'video/webm';
    if (ext === 'ogg') return 'video/ogg';
    return '';
}

const slidesRef = ref(null);
const scrollbarRef = ref(null);
const scrollbarThumbRef = ref(null);


const visibleHeight = ref(props.visibleHeightPx);
const totalHeight = ref(0);


const updateSizes = () => {
    if (!slidesRef.value) return;
    visibleHeight.value = slidesRef.value.clientHeight || props.visibleHeightPx;
    totalHeight.value = slidesRef.value.scrollHeight || 0;
    if (scrollbarRef.value) {
        scrollbarRef.value.style.height = `${visibleHeight.value}px`;
    }
    updateThumbnail();
};


const updateThumbnail = () => {
    if (!slidesRef.value || !scrollbarThumbRef.value) return;
    const v = visibleHeight.value;
    const t = totalHeight.value || 1;
    const containerH = visibleHeight.value;
    const thumbH = Math.max((v / t) * containerH, 20);
    const maxScroll = t - v;
    const scrollTop = slidesRef.value.scrollTop;
    const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
    const top = ratio * (containerH - thumbH);
    scrollbarThumbRef.value.style.height = `${thumbH}px`;
    scrollbarThumbRef.value.style.transform = `translateY(${top}px)`;
};


const scrollToIndex = (idx) => {
    if (!slidesRef.value) return;
    const child = slidesRef.value.children[idx];
    if (!child) return;
    slidesRef.value.scrollTo({ top: child.offsetTop, behavior: 'smooth' });
};


const onSlidesScroll = () => updateThumbnail();


onMounted(async () => {
    await nextTick();
    updateSizes();
    window.addEventListener('resize', updateSizes);
    setTimeout(updateSizes, 200);
});


watch(() => props.images, async () => {
    await nextTick();
    updateSizes();
});


</script>

<template>
    <!-- This gallery has been created by taking inspiration from an open-source project. Original creator: https://codepen.io/chalarangelo -->
    <!-- There have been modifications to fit the current project -->
    <div class="gallery-container">
        <!-- A list of all media thumbnails -->
        <div class="thumbnails">
            <button v-for="(src, i) in images" :key="i" class="thumb-btn" @click="scrollToIndex(i)"
                :aria-label="`Open media ${i + 1}`">
                <img :src="src" :alt="`thumb ${i + 1}`" />
                <span v-if="isVideo(src)" class="video-icon">▶</span>
            </button>
        </div>


        <div class="scrollbar" ref="scrollbarRef" aria-hidden="true">
            <div class="thumb" ref="scrollbarThumbRef"></div>
        </div>


        <div class="slides" ref="slidesRef" @scroll.passive="onSlidesScroll" :style="{ height: visibleHeight + 'px' }">
            <div v-for="(src, idx) in images" :key="idx" class="slide" :data-id="idx">
                <!-- Show a photo if it's not a video extension, otherwise a video -->
                <a v-if="!isVideo(src)" :href="src" target="_blank" rel="noopener noreferrer"
                    title="Click to open in full view">
                    <img :src="src" alt="project image" />
                </a>


                <div v-else class="video-wrapper">
                    <video controls style="max-width:100%;height:auto;">
                        <source :src="src" :type="videoMime(src)" />
                        Your browser does not support video.
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.gallery-container {
    display: flex;
    gap: 12px;
    align-items: start;
    justify-content: center;
}

.thumbnails {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.thumb-btn {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    position: relative;
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    overflow: hidden;
}

.thumb-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.thumb-btn:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

.video-icon {
    position: absolute;
    right: 4px;
    bottom: 4px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 4px;
}

.scrollbar {
    width: 6px;
    height: 360px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    position: relative;
    margin-left: 6px;
    margin-right: 6px;
}

.thumb {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(180deg, var(--accent-2), var(--accent));
    border-radius: 6px;
    transform: translateY(0);
    transition: transform 120ms linear, height 120ms linear;
}

.slides {
    margin: 0;
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
    width: min(540px, calc(100vw - 220px));
    padding: 0.25rem;
    height: 360px;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.slides::-webkit-scrollbar {
    display: none;
}

.slide {
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 240px;
}

.slides img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
    display: block;
}

.video-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

@media (max-width: 800px) {
    .gallery-container {
        flex-direction: column;
        gap: 8px;
    }

    .thumbnails {
        flex-direction: row;
        overflow-x: auto;
        padding: 4px;
        gap: 6px;
    }

    .scrollbar {
        display: none;
    }

    .slides {
        height: 360px;
        width: 100%;
        scroll-snap-type: x mandatory;
        grid-auto-flow: column;
        overflow-x: auto;
        overflow-y: hidden;
        gap: 12px;
        grid-auto-columns: 100%;
    }

    .slide {
        min-width: 100%;
    }
}
</style>