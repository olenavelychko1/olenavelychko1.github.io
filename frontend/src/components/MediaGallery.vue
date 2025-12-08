<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

/**
 * Component props
 * @property {string[]} images - List of image or video URLs to display in the gallery
 */
const props = defineProps({
    images: { type: Array, default: () => [] },
});

/**
 * Index of the currently selected media item.
 * -1 means no media is selected / available.
 * @type {import('vue').Ref<number>}
 */
const currentIndex = ref(-1);

// refs used for measuring image size
const mainInnerRef = ref(null); // main media container
const imgRef = ref(null); // currently displayed image element
const imageIsTooTall = ref(false);

const forgiveTolerance = 20; // pixels of tolerance; numbers of pixels allowed, before an image is considered "too tall"

/**
 * Extracts the file extension from a media source URL.
 *
 * @param {string} src - Media source URL
 * @returns {string} File extension (lowercase), or empty string if unavailable
 */
function extOf(src) {
    return (src || '').split('.').pop().toLowerCase();
}
/**
 * Determines whether a media source is a video based on its file extension.
 *
 * @param {string} src - Media source URL
 * @returns {boolean} True if the source is a video file
 */
function isVideo(src) {
    const ext = extOf(src);
    return ['mp4', 'webm', 'ogg'].includes(ext);
}
/**
 * Returns the appropriate MIME type for a video source.
 *
 * @param {string} src - Video source URL
 * @returns {string} Corresponding MIME type, or empty string if unknown
 */
function videoMime(src) {
    const ext = extOf(src);
    if (ext === 'mp4') return 'video/mp4';
    if (ext === 'webm') return 'video/webm';
    if (ext === 'ogg') return 'video/ogg';
    return '';
}

/**
 * Returns the thumbnail source for a media item.
 * Videos use a default thumbnail image, images reuse their own source.
 *
 * @param {string} src - Media source URL
 * @returns {string} Thumbnail image URL
 */
function thumbFor(src) {
  // if it's a video, use default thumbnail; otherwise use the original src
  return isVideo(src) ? '/img/video-thumb.svg' : src;
}

/**
 * Selects a media item by index.
 * Safely clamps the index within array bounds.
 *
 * @param {number} i - Index of the media to select
 */
function select(i) {
    if (!props.images || props.images.length === 0) {
        currentIndex.value = -1;
        return;
    }
    currentIndex.value = Math.max(0, Math.min(i, props.images.length - 1));
}

/**
 * Detects whether the currently displayed image is taller than its container.
 * Uses rendered DOM sizes (not original image dimensions).
 * Runs after layout settles via nextTick().
 */
async function detectTooTall() {
  // wait for DOM update / image layout
  await nextTick();
  imageIsTooTall.value = false;
  console.log('Detecting too tall image...');

  const img = imgRef.value;
  const container = mainInnerRef.value;
  if (!img || !container) return;

  console.log('Measuring sizes...');

  // If the image hasn't loaded yet it may have zero rect; bail until load
  const imgRect = img.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  if (!imgRect.height || !containerRect.height) return;

  console.log('Image height:', imgRect.height, 'Container height:', containerRect.height);
  imageIsTooTall.value = (imgRect.height - containerRect.height) > forgiveTolerance;
}

/**
 * Handler for the image `load` event.
 * Ensures size detection runs only after the image is fully rendered.
 */
function onImageLoad() {
  detectTooTall();
}

/**
 * Initialize the gallery on mount.
 * Automatically selects the first image if available.
 */
onMounted(() => {
    if (props.images && props.images.length > 0) currentIndex.value = 0;
    else currentIndex.value = -1;

  nextTick(() => detectTooTall());
});

// re-check after switching images
watch(currentIndex, async () => {
  imageIsTooTall.value = false;
  await nextTick();
  detectTooTall();
});

// if images array changes, reset selection & re-check
watch(() => props.images, async (newImgs) => {
  await nextTick();
  if (newImgs && newImgs.length && currentIndex.value === -1) currentIndex.value = 0;
  detectTooTall();
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
                <img :src="thumbFor(src)" :alt="isVideo(src) ? `video thumb ${i + 1}` : `thumb ${i + 1}`" />
                <span v-if="isVideo(src)" class="video-icon">▶</span>
            </button>
        </div>

        <div class="main-media">
            <!-- Show a photo if it's not a video extension, otherwise a video -->
            <div class="main-frame" v-if="currentIndex >= 0">
                <div class="main-inner" ref="mainInnerRef">
                    <a :href="images[currentIndex]" target="_blank" rel="noopener noreferrer"
                        v-if="!isVideo(images[currentIndex])" title="Open media in full view">
                        <img ref="imgRef" class="main-img" :src="images[currentIndex]" alt="project image" @load="onImageLoad" />
                        <div v-if="imageIsTooTall" class="click-overlay" aria-hidden="true">
                            The image doesn't fit in properly. Click to view full image
                        </div>
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
    overflow: auto;
    /* keep scrolling behavior */
    padding-bottom: 8px;
    /* buffer so last item won't touch bottom */
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
    width: 54px;
    /* slightly bigger */
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
    width: 100%;
    height: auto;
    object-fit: contain;

}

.main-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

/* Semi-transparent overlay to tell that the image is too tall */
.click-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    pointer-events: none;
    border-radius: 12px;
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

        box-sizing: content-box;
        padding: 0.15rem 0;
        /* to prevent weird scroll on scale up */

        gap: 6px;
        justify-content: flex-start;
        max-height: none;
    }

    .main-media {
        max-height: 60vh;
        /* small-screen fixed media height */
    }

    /* allow internal vertical scroll when the image is taller than the area */
    .main-inner {
        align-items: flex-start;
        /* show top of long images first */
        padding: 8px;
    }

    /* for very tall images keep natural height so user can scroll them inside .main-inner */
    .main-img {
        width: auto;
        max-width: 100%;
        height: auto;
        /* let it be taller than container when needed */
        display: block;
    }


}
</style>