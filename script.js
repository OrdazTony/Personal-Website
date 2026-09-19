const header = document.querySelector('.site-header');
const githubProjects = document.querySelector('#github-projects');
const journalList = document.querySelector('#journal-list');
const journalDialog = document.querySelector('#journal-dialog');
const dialogClose = document.querySelector('#dialog-close');

const fallbackProjects = [
  {
    name: 'TrainRec',
    type: 'Product development',
    description: 'TrainRec started from a simple problem: at-home workouts can become difficult to structure and track consistently. I wanted to build something that made the process more organized without making it more complicated. Developing it pushed me to think beyond features and focus on the details that make software feel understandable and complete.',
    html_url: 'https://github.com/OrdazTony',
    site_url: 'https://trainrec.dev',
    language: 'React.js',
    topics: ['Node.js', 'Computer Vision'],
    link_label: 'Explore TrainRec',
    featured: true,
  },
  {
    name: 'Pill Identifier',
    type: 'Healthcare technology',
    description: 'The Pill Identifier application helps someone narrow down the identity of an unknown medication using the information they can physically see on the pill. It challenged me to make search, filtering, and results feel simple while keeping the information clear.',
    html_url: 'https://github.com/OrdazTony',
    language: 'JavaScript',
    topics: ['Search', 'User-focused development'],
    link_label: 'View the project',
  },
  {
    name: 'JCBlinds Website',
    type: 'Client project',
    description: 'The JCBlinds website gave me the opportunity to build for a real business. The goal was to create a clean, professional web presence that made the company’s services easier to understand and gave potential customers a straightforward way to get in contact.',
    html_url: 'https://github.com/OrdazTony',
    language: 'HTML / CSS',
    topics: ['Web development', 'Responsive design'],
    link_label: 'Visit JCBlinds',
  },
];

const journalEntries = [
  {
    date: 'Sep 2026',
    category: 'Building',
    title: 'What TrainRec taught me about actually finishing',
    excerpt: 'The last part of the work matters just as much as the first part.',
    body: '<p>TrainRec started as a way to bring more structure to at-home workouts. At first, most of my attention went toward the main functionality: what the application needed to do and how I could make it work.</p><p>The longer I worked on it, the more I realized that getting the main feature working is only part of finishing a product. There are dozens of smaller decisions between a good idea and something another person can comfortably use.</p><p>Clear navigation, sensible defaults, useful feedback, error handling, responsive layouts, and the small interactions between screens all matter.</p><p>I’m learning to treat that last ten percent as part of the actual build instead of something I can clean up at the end.</p>',
  },
  {
    date: 'Aug 2026',
    category: 'Learning',
    title: 'I learn faster when I have something real to build',
    excerpt: 'Building forces me to ask better questions and learn what I really understand.',
    body: '<p>Tutorials, documentation, and classes give me a starting point, but I usually understand something much better once I have to use it in an actual project.</p><p>Building forces me to ask better questions. I find out quickly what I really understand, what I only thought I understood, and what I still need to learn.</p><p>That is part of why I started documenting these projects. I want to be able to look back at what I built, the decisions I made, the mistakes I ran into, and how my approach changes over time.</p>',
  },
  {
    date: 'Jul 2026',
    category: 'Perspective',
    title: 'Good software should make the next step obvious',
    excerpt: 'The more I build, the more I notice how much clarity matters.',
    body: '<p>One thing I keep noticing while building is that adding more features does not automatically make a product better. Sometimes the harder part is deciding what does not need to be there.</p><p>I try to look at a screen and ask one question: if I had never seen this before, would I know what to do next? The more I build, the more I realize that good software is not just about what it can do. It is also about how easily someone can understand it.</p>',
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
