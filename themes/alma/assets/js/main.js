const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  // { value: 'solarized', label: 'Solarized' },
  // { value: 'midnight', label: 'Midnight' },
];

document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.getElementById('theme-selector');

  // Dynamically populate the theme selector
  function populateThemeSelector() {
    themes.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.value;
      option.textContent = theme.label;
      themeSelector.appendChild(option);
    });
  }

  // Applies a theme class and stores it
  function applyTheme(theme) {
    const html = document.documentElement;
    const themeClassList = themes.map(t => t.value).filter(Boolean);

    // Remove all theme classes
    html.classList.remove(...themeClassList);

    if (theme) {
      html.classList.add(theme);
    }

    localStorage.setItem('theme', theme || '');
    themeSelector.value = theme || '';
  }

  // Load stored theme or system preference
  function loadTheme() {
    const stored = localStorage.getItem('theme');

    if (stored) {
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        applyTheme('dark');
      }
    }
  }

  function highlightCurrentAnchor() {
    const currentHash = window.location.hash;

    document.querySelectorAll('#generated-navbar-toc a.highlighted')
            .forEach(link => link.classList.remove('highlighted'));

    if (currentHash) {
      const targetLink = document.querySelector(`#generated-navbar-toc a[href$="${CSS.escape(currentHash)}"]`);
      if (targetLink) {
        targetLink.classList.add('highlighted');
      }
    }
  }

  // Initialize
  populateThemeSelector();
  loadTheme();
  highlightCurrentAnchor();

  themeSelector.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });

  window.addEventListener('hashchange', highlightCurrentAnchor);
});
