# GitHub PWA Deployment

This app is ready to be hosted as a static PWA with GitHub Pages.

## Setup

1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Keep `.github/workflows/deploy-pwa.yml`.
4. In GitHub, open Settings -> Pages.
5. Set Source to GitHub Actions.
6. Push to `main`.

After the workflow finishes, GitHub Pages will serve the Habit Tracker PWA with `manifest.webmanifest`, icon, and service worker.

## Backend Config

After deploying Google Apps Script, update:

```js
window.HABIT_TRACKER_CONFIG.googleAppsScriptUrl = "YOUR_APPS_SCRIPT_WEB_APP_URL";
```

Use the same repository for future app development and PWA releases.
