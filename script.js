const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');
const projectList = document.querySelector('#project-list');
const journalList = document.querySelector('#journal-list');
const journalDialog = document.querySelector('#journal-dialog');
const dialogClose = document.querySelector('#dialog-close');

// Add future projects to this curated list when they are ready to share.
const projects = [
  {
    name: 'TrainRec',
    type: 'Personal fitness tracker',
    description: 'TrainRec started from a simple problem: at-home workouts can become difficult to structure and track consistently. I wanted to build something that made the process more organized without making it more complicated. Developing it pushed me to think beyond features and focus on the details that make software feel understandable and complete.',
    tags: ['React', 'Node.js', 'Computer vision'],
    preview: { site: 'https://trainrec.dev' },
    links: [
      { label: 'Open TrainRec', url: 'https://trainrec.dev' },
      { label: 'Source on GitHub', url: 'https://github.com/OrdazTony/TrainRec1' },
    ],
  },
  {
    name: 'DVPSTA',
    type: 'Software and curriculum development',
    description: 'DVPSTA is a Florida security training school that teaches state licensing courses live online in English and Spanish. I redesigned the curriculum for its Class D and Class G license courses: the slide decks, narrated self-paced modules packaged for the school’s learning platform, and textbooks in both languages. I also built the tooling that generates and checks it all, so every legal passage matches the Florida statute it cites and each update ships the same way.',
    tags: ['Instructional design', 'SCORM', 'English and Spanish'],
    preview: { image: '/assets/dvpsta-home.jpg', alt: 'The DVPSTA homepage, offering Florida security training in English and Spanish', url: 'https://dvpsta.com' },
    links: [{ label: 'Visit dvpsta.com', url: 'https://dvpsta.com' }],
  },
  {
    name: 'Pill Identifier',
    type: 'Mobile app',
    description: 'The Pill Identifier application helps someone narrow down the identity of an unknown medication using the information they can physically see on the pill. It challenged me to make search, filtering, and results feel simple while keeping the information clear.',
    tags: ['JavaScript', 'Search', 'User-focused development'],
    links: [{ label: 'Source on GitHub', url: 'https://github.com/OrdazTony/pill-identifier' }],
  },
];

// Newest first.
const journalEntries = [
  {
    date: 'Aug 2026',
    category: 'Purpose',
    title: 'Building things that can actually help someone',
    body: '<p>I’m working on my Pill Identifier app, and it is changing the way I think about the kind of software I want to build. Technology is everywhere, but I don’t think everything we create needs to become more virtual noise. I’m becoming much more interested in building tools that solve a real problem for someone.</p><p>That matters even more to me when technology can give someone greater independence. People with disabilities often rely on technological tools to access information, complete everyday tasks, or navigate situations that others may take for granted. As I work on this project, I’m realizing that software can be more than something impressive to look at. It can be useful, accessible, and genuinely helpful to the person using it.</p>',
  },
  {
    date: 'Mar 2026',
    category: 'Building',
    title: 'Stepping up',
    body: '<p>I’m working on TrainRec with my team, and as we keep building it, I’m realizing that the project is teaching me much more than just programming. I’m still learning as I go, but there are moments when the project needs more direction, clearer decisions, and someone willing to take ownership of what happens next.</p><p>I’m learning that collaboration does not always mean waiting for everyone to agree. Sometimes it means listening to the team, understanding what needs to get done, and being willing to step forward when the project starts to lose momentum. I’m becoming more comfortable giving direction, organizing work, and making decisions when they are needed. I’m starting to understand that leadership can be as simple as helping everyone stay focused on the goal and being willing to take responsibility when something needs to change.</p>',
  },
  {
    date: 'Nov 2025',
    category: 'Perspective',
    title: 'Staying true to myself while I figure it out',
    body: '<p>School is not always easy, and there are plenty of moments when I catch myself comparing my path to someone else’s or feeling like I should be further ahead. I’m learning that progress looks different for everyone, and right now I’m trying to focus more on continuing to move forward without losing sight of who I am.</p><p>I want to keep learning, building, drawing, working, and creating in a way that still feels like me. The difficult parts of my studies are teaching me persistence, but they are also teaching me not to let pressure change who I am or what I value. My path may not always be the most direct one, but I’m continuing to show up, adjust, and push through the harder parts.</p>',
  },
];

const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const setMenu = (open) => {
  menuToggle.setAttribute('aria-expanded', String(open));
  siteNav.classList.toggle('is-open', open);
};

menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const navLinks = [...siteNav.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = navLinks.find((navLink) => navLink.hash === `#${entry.target.id}`);
    link?.classList.toggle('is-current', entry.isIntersecting);
  });
}, { rootMargin: '-45% 0px -54% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const renderPreview = (project) => {
  const { preview } = project;
  if (!preview) return '';

  if (preview.site) {
    return `<figure class="project-media">
      <iframe src="${escapeHtml(preview.site)}" title="${escapeHtml(project.name)} live preview" loading="lazy" scrolling="no" tabindex="-1" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts allow-same-origin"></iframe>
      <a class="project-media-link" href="${escapeHtml(preview.site)}" target="_blank" rel="noreferrer" aria-label="Open the ${escapeHtml(project.name)} live site"><span>Live site <span aria-hidden="true">↗</span></span></a>
    </figure>`;
  }

  return `<figure class="project-media">
    <img src="${escapeHtml(preview.image)}" alt="${escapeHtml(preview.alt)}" width="1280" height="800" loading="lazy" decoding="async" />
    <a class="project-media-link" href="${escapeHtml(preview.url)}" target="_blank" rel="noreferrer" aria-label="Visit ${escapeHtml(project.name)}"><span>Visit site <span aria-hidden="true">↗</span></span></a>
  </figure>`;
};

const renderProject = (project) => `<article class="project${project.preview ? ' has-media' : ''}">
    <header class="project-head">
      <p class="project-type">${escapeHtml(project.type)}</p>
      <h3>${escapeHtml(project.name)}</h3>
    </header>
    ${renderPreview(project)}
    <p class="project-description">${escapeHtml(project.description)}</p>
    <div class="project-meta">
      <ul class="project-tags" aria-label="Built with">${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
      <div class="project-links">${project.links.map((link) => `<a class="text-link" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>
    </div>
  </article>`;

projectList.innerHTML = projects.map(renderProject).join('');

const getJournalExcerpt = (entry, maxLength = 190) => {
  const body = document.createElement('div');
  body.innerHTML = entry.body;
  const text = body.textContent.replace(/\s+/g, ' ').trim();

  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength).replace(/\s+\S*$/, '');
  return `${shortened}…`;
};

const renderJournal = () => {
  journalList.innerHTML = journalEntries.map((entry, index) => `<article class="journal-entry">
    <p class="journal-date"><span>${escapeHtml(entry.date)}</span>${escapeHtml(entry.category)}</p>
    <div class="journal-text">
      <h3>${escapeHtml(entry.title)}</h3>
      <p>${escapeHtml(getJournalExcerpt(entry))}</p>
    </div>
    <button class="journal-read" type="button" data-entry="${index}" aria-label="Read note: ${escapeHtml(entry.title)}">Read note</button>
  </article>`).join('');
};

const openJournalEntry = (entry) => {
  document.querySelector('#dialog-meta').textContent = `${entry.date}, ${entry.category}`;
  document.querySelector('#dialog-title').textContent = entry.title;
  document.querySelector('#dialog-body').innerHTML = entry.body;
  journalDialog.showModal();
};

journalList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-entry]');
  if (button) openJournalEntry(journalEntries[button.dataset.entry]);
});

dialogClose.addEventListener('click', () => journalDialog.close());
// Close on backdrop clicks only; clicks on the dialog's own padding also target the dialog.
journalDialog.addEventListener('click', (event) => {
  if (event.target !== journalDialog) return;
  const box = journalDialog.getBoundingClientRect();
  const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  if (!inside) journalDialog.close();
});

renderJournal();
