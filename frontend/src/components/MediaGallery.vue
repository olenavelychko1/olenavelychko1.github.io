<script setup>
import { ref, onMounted, watch } from 'vue';


const props = defineProps({
    images: { type: Array, default: () => [] },
});

const currentIndex = ref(-1);

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

function select(i) {
    if (!props.images || props.images.length === 0) {
        currentIndex.value = -1;
        return;
    }
    currentIndex.value = Math.max(0, Math.min(i, props.images.length - 1));
}

onMounted(() => {
    if (props.images && props.images.length > 0) currentIndex.value = 0;
    else currentIndex.value = -1;
});

watch(() => props.images, (newImgs) => {
    if (!newImgs || newImgs.length === 0) currentIndex.value = -1;
    else if (currentIndex.value < 0 || currentIndex.value >= newImgs.length) currentIndex.value = 0;
});

</script>

<template>
    <!-- This gallery has been created by taking inspiration from an open-source project. Original creator: https://codepen.io/chalarangelo -->
    <!-- There have been modifications to fit the current project -->
    <div class="gallery-container" :class="{ 'no-media': currentIndex === -1 }">
        <!-- A list of all media thumbnails -->
        <div class="thumbnails" aria-hidden="false">
            <button v-for="(src, i) in images" :key="i" :class="['thumb-btn', { active: i === currentIndex }]"
                @click="select(i)" :aria-label="`Open media ${i + 1}`" title="Show media">
                <img :src="src" :alt="`thumb ${i + 1}`" />
                <span v-if="isVideo(src)" class="video-icon">▶</span>
            </button>
        </div>

        <div class="main-media">
            <!-- Show a photo if it's not a video extension, otherwise a video -->
            <div class="main-frame" v-if="currentIndex >= 0">
                <div class="main-inner">
                    <a :href="images[currentIndex]" target="_blank" rel="noopener noreferrer"
                        v-if="!isVideo(images[currentIndex])" title="Open media in full view">
                        <img class="main-img" :src="images[currentIndex]" alt="project image" />
                    </a>

                    <div v-else class="video-wrapper">
                        <video class="main-video" controls :key="images[currentIndex]">
                            <source :src="images[currentIndex]" :type="videoMime(images[currentIndex])" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
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
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.thumbnails {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    flex: 0 0 56px;
    padding-top: 4px;
    box-sizing: border-box;
    max-height: 100%;
    /* constrain thumbnails to container height */
    overflow: auto; /* keep scrolling behavior */
    padding-bottom: 8px; /* buffer so last item won't touch bottom */
}

.thumb-btn {
    width: 48px;
    height: 48px;
    cursor: pointer;
    padding: 0;
    border: none;
    background: transparent;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    transition: width 0.15s ease, height 0.15s ease;
}

.thumb-btn.active {
    position: relative;
    z-index: 1;
}

/* I put a pseudo-element on top of the picture (hence the "after"),
to simulate a rounded border with a gradient,
as it normally can't be round with a gradient */
.thumb-btn.active::after {
    content: "";
    position: absolute;
    inset: 0;
    /* covers entire button */
    border-radius: 8px;
    padding: 3px;
    /* border thickness */
    background: linear-gradient(180deg, var(--accent-2), var(--accent));

    /* Create hole in the middle (standard + webkit) */
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0); 
    mask-composite: exclude;
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;

    pointer-events: none;
}

/* Hover: gentle scale-up */
.thumb-btn:hover {
    width: 54px;   /* slightly bigger */
    height: 54px;
}

/* If it's active AND hover, combine both transforms */
/* .thumb-btn.active:hover {
    transform: translateY(-2px) scale(1.05);
} */

/* Keep the default active state unchanged */
/* .thumb-btn.active {
    transform: translateY(-2px);
} */

.thumb-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    
}

.video-icon {
    position: absolute;
    right: 4px;
    bottom: 4px;
    background: rgba(0, 0, 0, 0.4);
    padding: 2px 5px;
    border-radius: 4px;
    color: white;
    font-size: 10px;
}


/* main media viewer */
.main-media {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--card);
    border-radius: 12px;
    padding: 0.5rem;
    box-sizing: border-box;

}

/* gradient/inner frame should also fill */
.main-frame {
    width: 100%;
    height: 100%;
    /* padding: 6px;
  border-radius: 12px; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-img,
.main-video {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
}

@media (max-width: 900px) {
    .gallery-container {
        flex-direction: column;
        gap: 8px;
        height: auto;
    }

    .thumbnails {
        flex-direction: row;
        overflow-x: auto;
        padding: 4px;
        overflow-x: auto;
        gap: 6px;
        justify-content: flex-start;
        max-height: none;
    }

    .main-media {
        height: 60vh;
        /* small-screen fixed media height */
    }
}
</style>