// public/scripts/redirect.js
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    if (currentPath === '/uoft-pey-coop-jobs-2023') {
      window.location.replace(`${currentPath}.html`);
    }
  });