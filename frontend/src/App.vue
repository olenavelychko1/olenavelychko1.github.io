<script setup>
import TimelineItem from './components/TimelineItem.vue';
import TechBadgeList from './components/TechBadgeList.vue';
import ThemeToggle from './components/ThemeToggle.vue';


const projects = [
  {
    title: "Election Results Website",
    date: "September 2025 - now",
    link: "https://github.com/olenavelychko1/blok-5-election-website",
    technologies: ["html5", "css3", "java", "typescript", "vuejs", "springboot", "docker", "chartjs", "tailwindcss", "vite", "postman", "figma", "gitlab", "intellij"],
    images: [
      "/img/blok 5/elections-page1.jpeg",
      "/img/blok 5/elections-page2.jpeg",
      "/img/blok 5/elections-page3.png",
      "/img/blok 5/elections-page4.jpeg"
    ],
    description: `A full-stack web application that visualizes election results using responsive Vue components and a Spring Boot backend. I built the frontend with reusable, mobile-friendly components and implemented the backend with RESTful APIs for constituencies and results. I parsed a part of the official XML election data, mapped it into Java models, designed part of the database, and wrote unit tests. I'm currently expanding the platform with an admin dashboard to manage user actions on the forum and adding security features.`
  },
  {
    title: "Game Webshop Website",
    date: "April 2025 - July 2025",
    link: "https://github.com/olenavelychko1/blok4-game-webshop",
    technologies: ["html5", "css3", "typescript", "express", "vitest", "mysql", "vite", "esbuild", "docker", "postman", "figma", "gitlab", "vscode"],
    images: [
      "/img/blok 4/screenshot2.png",
      "/img/blok 4/screenshot4.png",
      "/img/blok 4/screenshot5.png",
      "/img/blok 4/screenshot1.png",
      "/img/blok 4/screenshot3.png"
    ],
    description: `A web-based game webshop built with TypeScript, Express, MySQL, and modern frontend tooling. I implemented the game details page, review functionality, and navbar, matching Figma design closely. I connected an open-source translation API via Docker to enable multilingual support and deployed it to make the site accessible in multiple languages. The game details page dynamically pulls data from the database, providing users with up-to-date product and review information. I also set up unit tests using Vitest to ensure code reliability and maintainability, with the use of Postman`
  },
  {
    title: "Webgame: The Lost City of Azarath",
    date: "February 2025 - April 2025",
    link: "#",
    technologies: ["html5", "css3", "typescript", "figma", "esbuild", "vite", "express", "postman", "gitlab", "vscode"],
    images: [
      "/img/blok 3/screenshot1.png",
      "/img/blok 3/screenshot2.png",
      "/img/blok 3/video1.mp4"
    ],
    description: `<div class="project-description">
              A web-based game called "The Lost City of Azarath," built with TypeScript, HTML5, CSS3, and Express.
              This has been a huge passion project for me and my team — in fact, it was my favorite project throughout
              the entire study.
              We learned a lot about game development during this period and faced challenges that pushed our skills,
              but in the end we won a school award for "The Most Complete Experience" and were one of the most liked
              games in the first-year classes.
              <br />
              I personally contributed by developing the reading component, creating the dynamic sound system that
              changes room music and ambient sounds,
              implementing the arrow navigation component, designing around 60% of the UI, building most of the game
              rooms,
              and acting as the main bug fixer for the team. This project helped me significantly improve my TypeScript
              and HTML skills,
              strengthened my problem-solving abilities, and deepened my passion for game development.
            </div>`
  },
  {
    title: "Programming Student Forum",
    date: "October 2024 - January 2024",
    link: "#",
    technologies: ["html5", "css3", "typescript", "nodejs", "mysql", "vite", "figma", "gitlab", "vscode",],
    images: [
      "/img/blok 4/screenshot2.png",
      "/img/blok 4/screenshot1.png",
      "/img/blok 4/screenshot3.png"
    ],
    description: `hh`
  },
  {
    title: "Dokkie - Outing Planner WebApp",
    date: "September 2024 - late October 2024",
    link: "#",
    technologies: ["html5", "css3", "typescript", "vite", "figma", "gitlab", "vscode",],
    images: [
      "/img/blok 4/screenshot2.png",
      "/img/blok 4/screenshot1.png",
      "/img/blok 4/screenshot3.png"
    ],
    description: `hh`
  },
];
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
  max-width: 1100px;
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
}

section.card h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}


/* projects / timeline */
.projects-section {
  max-width: 900px;
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

.timeline {
  position: relative;
  padding: 2rem 0;
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

footer {
  text-align: center;
  color: var(--muted);
  margin-top: 1.5rem;
}
</style>
