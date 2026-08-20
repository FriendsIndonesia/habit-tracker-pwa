# Google Workspace Backend

Backend target: `friendsindonesia28@gmail.com`.

## Setup

1. Open Google Apps Script with the Google Workspace account.
2. Create a new Apps Script project.
3. Copy `backend/google-apps-script/Code.gs` into `Code.gs`.
4. Copy `backend/google-apps-script/appsscript.json` into the manifest file.
5. Run `setupHabitTrackerBackend()` once and approve permissions.
6. Deploy as Web App.
7. Copy the Web App URL into `config.js` as `googleAppsScriptUrl`.

## Data Flow

The PWA saves immediately to browser storage and also sends snapshots to Apps Script when `googleAppsScriptUrl` is filled.

The current backend records snapshots first. In the next backend phase, actions should be expanded into table-specific writes for users, goals, systems, habits, habit logs, reviews, and insights.

## Security Note

This Phase 1 backend is a low-friction sync endpoint for prototype data. Before production, add signed requests, user sessions, row-level ownership checks, and stricter Apps Script deployment access.
