<script setup>
import TimelineItem from './components/TimelineItem.vue';
import TechBadgeList from './components/TechBadgeList.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { projects } from './data/projects.js';






</script>

<template>
  <div>
    <header class="topbar" role="banner">
      <div class="brand">
        <div class="avatar">L</div>
        <div>
          <p class="title theme-default-text">Olena Velychko</p>
          <p class="subtitle">HBO-ICT — Software Engineering</p>
        </div>
      </div>

      <div class="theme-toggle">
        <ThemeToggle />
      </div>
    </header>

    <main>
      <section class="description card">
        <div class="intro">
          <div class="bio">
            <h2 class="theme-default-text">About me</h2>
            <p class="theme-default-text">
              Hi! I'm Lena, a second-year HBO-ICT Software Engineering student at Amsterdam University of Applied
              Sciences
              <b>(Hogeschool van Amsterdam)</b>, Dutch language course. I love building interactive web projects, experimenting across
              front-end and back-end, learning new skills and improving with every project I work on. I enjoy
              collaborating and get a lot of energy from turning ideas into something real.
            </p>
          </div>
          <aside class="meta">
            <h3 style="margin-top:0" class="theme-default-text">Short info about me</h3>
            <ul style="padding-left:1rem; color:var(--muted)">
              <li>Currently building an Election Results Website (Vue / Spring Boot)</li>
              <li>HBO-ICT Software Engineering student (2nd year)</li>
              <li>Based in Zaandam, the Netherlands</li>
              <li>Very fluent in English, native in Russian and Ukrainian; mostly fluent in Dutch (B2-C1)</li>
              <li>Enjoy drawing, gaming and exploring new tech</li>
              <li>Plans for future: to live and work in the Netherlands upon graduation, full integration into the
                society</li>
            </ul>
          </aside>
        </div>
      </section>

      <section class="projects-section">
        <h2 class="projects-title">Projects Timeline</h2>
        <h5 class="theme-default-text">A selection of my recent projects showcasing my skills and experience. NOTE: some
          of the screenshots have varying height, so I advise you to click on the pictures to view them in full view!
        </h5>

        <div class="timeline" id="timeline-container">
          <TimelineItem v-for="(p, idx) in projects" :key="idx" :title="p.title" :date="p.date" :link="p.link"
            :technologies="p.technologies" :images="p.images">
            <template #default>
              <div v-html="p.description"></div>
            </template>
          </TimelineItem>
        </div>
      </section>

      <section class="card">
        <h2 class="theme-default-text">Tech stack</h2>
        <TechBadgeList />
      </section>

      <footer>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:olenavelychko12@gmail.com">olenavelychko12@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/olena-velychko-945932391/" target="_blank"
            rel="noreferrer">Olena
            Velychko</a></p>
        <p>&copy; 2025 Olena Velychko</p>
      </footer>
    </main>
  </div>
</template>

<style>
/* reuse your css/style.css for main styling; minimal local tweaks here */
main {
  padding: 1rem;

  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(6px) saturate(120%);
  box-shadow: var(--shadow);
}
.brand {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.avatar {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-2), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-default);
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 6px 18px rgba(3, 10, 30, 0.6);
}

.title {
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0;
}
.subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 1.3rem;
  font-style: italic;
  letter-spacing: 1px;
  color: var(--muted);
}

/* Theme toggle */
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--panel);
  border-radius: 10px;
  padding: 6px;
  border: 1px solid var(--glass-border);
}

/* ---------- Intro / About me ---------- */
.description {
  max-width: 1100px;
  margin: 0 auto ;
}

.intro {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
}

.intro .bio {
  flex: 1;
}

.meta {
  max-width: 30rem;

  li {
    
    white-space: normal;
  overflow-wrap: anywhere;
  }
}


/* ---------- Sections ---------- */
section.card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
  border-radius: var(--radius);
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
  max-width: 1100px;
  margin: 1.25rem auto;
}

section.card h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

/* projects / timeline */
.timeline {
  position: relative;
  padding: 2rem 0;
  max-width: 100%;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 20px;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, var(--accent-2), var(--accent));
  border-radius: 4px;
}

.projects-section {
  max-width: 100%;
  margin: 2rem auto;
  padding: 0;
  background: transparent;
}
.projects-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: var(--accent-2);
}



footer {
  text-align: center;
  color: var(--muted);
  margin-top: 1.5rem;
}
</style>
