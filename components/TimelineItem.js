
class TimelineItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const date = this.getAttribute("date") || "";
    const link = this.getAttribute("link") || "#";

    let images = [];
    try {
      images = JSON.parse(this.getAttribute("images") || "[]");
    } catch (err) {
      console.error("Invalid images JSON:", err);
    }

    // Generate carousel ID so multiple carousels don't conflict
    const carouselId = "carousel-" + Math.random().toString(36).slice(2);

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .timeline-item {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 3rem;
        }
        .timeline-marker {
          width: 12px;
          height: 12px;
          background: #007bff;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 0.5rem;
        }
        .project-card {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .project-text {
          flex: 1 1 300px;
        }
        .carousel {
          flex: 1 1 300px;
          max-width: 400px;
        }
      </style>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="project-card">
            <div class="project-text">
              <h3 class="project-title">${title}</h3>
              <p class="project-description">${description}</p>
              <p class="project-date">${date}</p>
              <a href="${link}" class="project-link">View Project →</a>
            </div>

            <div id="${carouselId}" class="carousel slide">
              <div class="carousel-inner">
                ${images
                  .map(
                    (src, index) => `
                  <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <img src="${src}" class="d-block w-100">
                  </div>`
                  )
                  .join("")}
              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
                <span class="visually-hidden">Previous</span>
              </button>

              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("timeline-item", TimelineItem);

