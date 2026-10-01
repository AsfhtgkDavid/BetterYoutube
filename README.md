# BetterYoutube

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A curated collection of lightweight, open-source userscripts (monkey scripts) crafted to improve and declutter your YouTube and YouTube Music browsing experience.

---

## 📜 Available Scripts

| Script | Description | Version | Quick Install |
| :--- | :--- | :--- | :--- |
| **[YouTube Anti-Pause](#youtube-anti-pause-always-watching)** | Prevents "Video paused. Continue watching?" popups by keeping activity timestamps updated. | `1.0.0` | [Install (`.user.js`)](scripts/youtube-anti-pause.user.js) |
| **[YouTube Mix Playlist Restorer](#youtube-mix-playlist-restorer)** | Fixes the hidden queue in Mixes & playlists by removing the `hidden` attribute from `<ytd-playlist-panel-renderer>`. | `1.0.0` | [Install (`.user.js`)](scripts/youtube-restore-playlist-panel.user.js) |

*(More scripts coming soon! Feel free to suggest or contribute).*

---

## ⚡ Script Details

### YouTube Anti-Pause (Always Watching)
- **File:** [`scripts/youtube-anti-pause.user.js`](scripts/youtube-anti-pause.user.js)
- **What it does:**
  - YouTube automatically pauses playback after a period of inactivity in background tabs or long listening sessions, prompting: *"Video paused. Continue watching?"*.
  - This script keeps YouTube's internal user activity tracker (`_lact`) fresh by updating it every 10 seconds.
- **Why this approach?**
  - **Zero CPU/Battery Drain:** Instead of constantly simulating mouse clicks or keyboard events that cause layout re-renders, it directly updates the timestamp in memory.
  - **Background Friendly:** Works flawlessly in pinned or background tabs and when listening to YouTube Music.

### YouTube Mix Playlist Restorer
- **Platforms:** `youtube.com`
- **What it does:**
  - In recent YouTube updates, logged-in accounts watching "My Mix" or auto-generated mixes often suffer from an empty/missing queue sidebar because YouTube marks `<ytd-playlist-panel-renderer>` with the `hidden` attribute.
  - This script observes the playlist panel and strips the `hidden` attribute instantly, restoring visibility of the upcoming songs/videos in the mix.
- **Why this approach?**
  - **MutationObserver-based:** Uses efficient targeted observers (`attributeFilter: ['hidden']`) instead of polling with `setInterval`. Zero performance impact.
  - **SPA Compatible:** Hooks into YouTube's `yt-navigate-finish` event to maintain visibility when moving between songs or playlists.

---

## 📥 Installation

To use these scripts, you need a browser extension that supports userscripts:

1. **Install a Userscript Manager:**
   - [Violentmonkey](https://violentmonkey.github.io/) *(Recommended: open-source & lightweight)*
   - [Tampermonkey](https://www.tampermonkey.net/)
2. **Install a Script:**
   - Click on any script link above, or open the `scripts/*.user.js` file directly in your browser.
   - Your userscript manager will detect the script and prompt you with an **Install** button.
   - Confirm the installation and refresh YouTube.

---

## 🛠️ Project Structure

```text
BetterYoutube/
├── scripts/
│   ├── youtube-anti-pause.user.js              # Anti-pause script
│   ├── youtube-restore-playlist-panel.user.js  # Mix playlist queue restorer
│   └── _template.user.js                       # Boilerplate for new scripts
├── .gitignore
├── CONTRIBUTING.md                             # Contribution guidelines
├── LICENSE                                     # MIT License
└── README.md
```

---

## 🤝 Contributing

Contributions, bug reports, and new script ideas are welcome!

1. Check out [CONTRIBUTING.md](CONTRIBUTING.md) for metadata conventions and guidelines.
2. Duplicate [`scripts/_template.user.js`](scripts/_template.user.js) to start writing your script.
3. Open a Pull Request with a clear description of the feature or fix.

---

## ⚖️ License & Disclaimer

- Distributed under the **[MIT License](LICENSE)**.
- **Disclaimer:** YouTube is a trademark of Google LLC. This project is an independent community effort and is not affiliated with, endorsed by, or sponsored by Google or YouTube.
