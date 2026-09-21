const header = document.querySelector('.site-header');
const githubProjects = document.querySelector('#github-projects');
const journalList = document.querySelector('#journal-list');
const journalDialog = document.querySelector('#journal-dialog');
const dialogClose = document.querySelector('#dialog-close');

const fallbackProjects = [
  {
    name: 'TrainRec - Personal Fitness Tracker',
    type: 'Product Development',
    description: 'TrainRec started from a simple problem: at-home workouts can become difficult to structure and track consistently. I wanted to build something that made the process more organized without making it more complicated. Developing it pushed me to think beyond features and focus on the details that make software feel understandable and complete.',
    html_url: 'https://github.com/OrdazTony',
    site_url: 'https://trainrec.dev',
    language: 'React.js',
    topics: ['Node.js', 'Computer Vision'],
    link_label: 'Explore TrainRec',
    featured: true,
  },
  {
    name: 'Pill Identifier - Mobile App',
    type: 'Healthcare Technology',
    description: 'The Pill Identifier application helps someone narrow down the identity of an unknown medication using the information they can physically see on the pill. It challenged me to make search, filtering, and results feel simple while keeping the information clear.',
    html_url: 'https://github.com/OrdazTony',
    language: 'JavaScript',
    topics: ['Search', 'User-Focused Development'],
    link_label: 'View the project',
  },
  {
    name: 'JCBlinds - E-Commerce Website',
    type: 'Client Project',
    description: 'The JCBlinds website gave me the opportunity to build for a real business. The goal was to create a clean, professional web presence that made the company’s services easier to understand and gave potential customers a straightforward way to get in contact.',
    html_url: 'https://github.com/OrdazTony',
    language: 'HTML / CSS',
    topics: ['Web Development', 'Responsive Design'],
    link_label: 'Visit JCBlinds',
  },
];

const journalEntries = [
  {
    date: 'Mar 2026',
    category: 'Building',
    title: 'Stepping up',
    excerpt: 'Leadership can mean helping everyone stay focused and taking responsibility when something needs to change.',
    body: '<p>I’m working on TrainRec with my team, and as we keep building it, I’m realizing that the project is teaching me much more than just programming. I’m still learning as I go, but there are moments when the project needs more direction, clearer decisions, and someone willing to take ownership of what happens next.</p><p>I’m learning that collaboration does not always mean waiting for everyone to agree. Sometimes it means listening to the team, understanding what needs to get done, and being willing to step forward when the project starts to lose momentum. I’m becoming more comfortable giving direction, organizing work, and making decisions when they are needed. I’m starting to understand that leadership can be as simple as helping everyone stay focused on the goal and being willing to take responsibility when something needs to change.</p>',
  },
  {
    date: 'Aug 2026',
    category: 'Purpose',
    title: 'Building things that can actually help someone',
    excerpt: 'Software can be useful, accessible, and genuinely helpful to the person using it.',
    body: '<p>I’m working on my Pill Identifier app, and it is changing the way I think about the kind of software I want to build. Technology is everywhere, but I don’t think everything we create needs to become more virtual noise. I’m becoming much more interested in building tools that solve a real problem for someone.</p><p>That matters even more to me when technology can give someone greater independence. People with disabilities often rely on technological tools to access information, complete everyday tasks, or navigate situations that others may take for granted. As I work on this project, I’m realizing that software can be more than something impressive to look at. It can be useful, accessible, and genuinely helpful to the person using it.</p>',
  },
  {
    date: 'Nov 2025',
    category: 'Perspective',
    title: 'Staying true to myself while I figure it out',
    excerpt: 'Progress looks different for everyone, and continuing to move forward matters.',
    body: '<p>School is not always easy, and there are plenty of moments when I catch myself comparing my path to someone else’s or feeling like I should be further ahead. I’m learning that progress looks different for everyone, and right now I’m trying to focus more on continuing to move forward without losing sight of who I am.</p><p>I want to keep learning, building, drawing, working, and creating in a way that still feels like me. The difficult parts of my studies are teaching me persistence, but they are also teaching me not to let pressure change who I am or what I value. My path may not always be the most direct one, but I’m continuing to show up, adjust, and push through the harder parts.</p>',
  },
];

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));

const renderProject = (project, index) => {
  const tags = [project.language, ...(project.topics || [])].filter(Boolean).slice(0, 3);
    const preview = project.site_url ? `<div class="project-preview">
      <iframe src="${escapeHtml(project.site_url)}" title="${escapeHtml(project.name)} live preview" loading="lazy" scrolling="no" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts allow-same-origin"></iframe>
      <a class="project-preview-link" href="${project.site_url}" target="_blank" rel="noreferrer">Open live site <span aria-hidden="true">↗</span></a>
    </div>` : '';
  return `<article class="github-card${project.featured ? ' featured' : ''}">
    <div class="project-meta"><span>${String(index + 1).padStart(2, '0')} — ${escapeHtml(project.type || 'Project')}</span></div>
    ${preview}
    <h3>${escapeHtml(project.name)}</h3>
    <p class="github-description">${escapeHtml(project.description || 'A project in progress. More details coming soon.')}</p>
    <div class="github-tags">${tags.map((tag) => `<span class="github-tag">${escapeHtml(tag)}</span>`).join('')}</div>
    <a class="text-link" href="${project.html_url}" target="_blank" rel="noreferrer">${escapeHtml(project.link_label || 'View repository')} <span aria-hidden="true">↗</span></a>
  </article>`;
};

const renderProjects = (projects) => {
  const featuredIndex = projects.findIndex((project) => project.featured);
  const featuredProject = featuredIndex >= 0 ? projects[featuredIndex] : projects[0];
  const remainingProjects = projects.filter((project, index) => index !== featuredIndex && project !== featuredProject);
  const featuredMarkup = featuredProject ? renderProject(featuredProject, 0) : '';
  const remainingMarkup = remainingProjects.map((project, index) => renderProject(project, index + 1)).join('');

  githubProjects.innerHTML = `${featuredMarkup}${remainingMarkup}`;
};

// Add future public repositories to this curated list when they are ready to share.
renderProjects(fallbackProjects);

const renderJournal = () => {
  journalList.innerHTML = journalEntries.map((entry, index) => `<article class="journal-entry">
    <div class="journal-date">${escapeHtml(entry.date)}<br />${escapeHtml(entry.category)}</div>
    <div><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.excerpt)}</p></div>
    <button class="journal-read" type="button" data-entry="${index}">Read note ↗</button>
  </article>`).join('');
};

const openJournalEntry = (entry) => {
  document.querySelector('#dialog-meta').innerHTML = `<span class="eyebrow-dot"></span> ${escapeHtml(entry.date)} · ${escapeHtml(entry.category)}`;
  document.querySelector('#dialog-title').textContent = entry.title;
  document.querySelector('#dialog-body').innerHTML = entry.body;
  journalDialog.showModal();
};

journalList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-entry]');
  if (button) openJournalEntry(journalEntries[button.dataset.entry]);
});

dialogClose.addEventListener('click', () => journalDialog.close());
journalDialog.addEventListener('click', (event) => {
  if (event.target === journalDialog) journalDialog.close();
});

renderJournal();
