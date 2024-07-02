function injectCSS(rule) {
  const styleElement = document.createElement('style');
  styleElement.textContent = rule;
  document.head.appendChild(styleElement);
}

function applyGridLayout() {
  const playlistVideos = `
    #container.ytd-playlist-video-renderer {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }
  `;

  const playlistVideosThumbnails = `
    #thumbnail.style-scope.ytd-playlist-video-renderer {
      aspect-ratio: 16 / 9;
      width: 100%;
      height: auto;
      margin: 0;
    }
  `;

  const renderResults = document.querySelector('ytd-two-column-browse-results-renderer');
  const sideBar = document.querySelector("ytd-playlist-header-renderer");
  const playlistContainer = document.querySelector('#contents.style-scope.ytd-playlist-video-list-renderer');
  const alert = document.querySelector('#alerts.style-scope.ytd-browse');
  if (playlistContainer) {
    playlistContainer.style.display = 'grid';
    playlistContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    injectCSS(playlistVideos);
    injectCSS(playlistVideosThumbnails);
  }
  if (sideBar) sideBar.style.display = 'none';
  if (renderResults) renderResults.style.padding = '0';
  if (alert) alert.style.padding = '0';
}
  
// Only run the script on playlist pages
if (window.location.href.includes('/playlist?list=')) {
  let hasAppliedGridLayout = false;

  // Observe DOM changes to apply grid layout dynamically
  const observer = new MutationObserver(() => {
    if (!hasAppliedGridLayout) {
      applyGridLayout();
      hasAppliedGridLayout = true;
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Apply the grid layout initially
  applyGridLayout();
  hasAppliedGridLayout = true;
}