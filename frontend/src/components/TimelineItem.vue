<script setup>
import { computed } from 'vue';
import { TECH_BADGES } from '../data/techBadges';
import MediaGallery from './MediaGallery.vue';

const props = defineProps({
    title: { type: String, default: '' },
    date: { type: String, default: '' },
    link: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: { type: [String, Array], default: () => [] }, // comma separated or array
    images: { type: Array, default: () => [] } // array of src strings (images or videos)
});


const techBadgesHtml = computed(() => {
    let techList = [];
    if (Array.isArray(props.technologies)) techList = props.technologies;
    else if (typeof props.technologies === 'string') techList = props.technologies.split(',').map(t => t.trim()).filter(Boolean);

    return techList.map(t => TECH_BADGES[t.toLowerCase()]).filter(Boolean);
});
</script>

<template>
    <div class="timeline-item">
        <div class="timeline-marker"></div>

        <div class="timeline-content">


            

                <!-- On the left, the project information -->
                <div class="project-text card-block">
                    <h3 class="project-title">{{ title }}</h3>
                    <div class="project-description">
                        <slot>{{ description }}</slot>
                    </div>
                    <p class="project-date">{{ date }}</p>

                    <a v-if="link" :href="link" class="project-link" target="_blank" rel="noreferrer">View Project &
                        Code Snippets on
                        GitHub →</a>

                    <h6 style="margin-top: 1rem; color: var(--muted)">Technologies Used: </h6>
                    <div v-if="techBadgesHtml.length" class="project-tech">
                        <a v-for="(badge, i) in techBadgesHtml" :key="i" class="tech-badge" :href="badge.link"
                            target="_blank" rel="noreferrer">
                            <img :src="badge.src" :alt="badge.alt" />
                        </a>
                    </div>
                </div>

                <!-- On the right, the project media gallery -->
                <div v-if="images && images.length" class="project-media card-block">
                    <MediaGallery :images="images" />
                </div>
            
        </div>
    </div>
</template>

<style scoped>

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: 0;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.6rem;
}
.timeline-marker {
  position: absolute;
  left: 6px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--card-strong);
  border: 2px solid var(--accent-2);
  color: var(--text-default);
  z-index: 10;
  box-shadow: 0 0 0 5px #f5f8fa;
}

.timeline-content {
  max-width: 100%;
  padding-left: 60px;
  display: flex;
  flex-direction: row;
  gap: 1rem; /* visible separation between text and media */

  /* margin-left: 0; */
}

.card-block {
  background: var(--card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(30, 30, 30, 0.1);
  flex: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-block:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(30, 30, 30, 0.15);
}

/* On the left, the project information */
.project-text {
  min-width: 260px;
}
.project-title {
  font-size: 1.3rem;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  color: var(--accent-2);
}
.project-description {
  margin: 0.4rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--muted);
}
.project-date {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.4rem;
  font-style: italic;
}
.project-link {
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}
.project-tech {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
}
.project-tech img {
  height: 26px;
  border-radius: 6px;
  background: transparent;
  padding: 2px;
}

/* On the right, the project media gallery */
.project-media {
  max-width: 420px; /* optional limit */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* stack on small screens */
@media (max-width: 900px) {
  .timeline-content {
    flex-direction: column;
  }

  .project-media {
    max-width: 100%;
  }
}
</style>
