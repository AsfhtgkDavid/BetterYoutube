// ==UserScript==
// @name         YouTube Anti-Pause (Always Watching)
// @namespace    https://github.com/BetterYoutube
// @version      1.0.0
// @description  Prevents YouTube and YouTube Music from auto-pausing with "Video paused. Continue watching?" prompts by keeping user activity alive.
// @author       David Lishchyshen
// @match        https://www.youtube.com/*
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        unsafeWindow
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Access the page's actual window object (bypassing userscript sandbox if needed)
    const targetWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    // Keep YouTube's last activity timestamp (_lact) updated
    setInterval(() => {
        try {
            // Set current time in milliseconds to simulate active user engagement
            targetWindow._lact = Date.now();
        } catch (e) {
            // Fallback in case YouTube temporarily restricts window access or during page transitions
            console.error('[BetterYoutube: Anti-Pause] Failed to update _lact:', e);
        }
    }, 10000); // 10s interval: optimal balance between battery/resource efficiency and keeping playback uninterrupted
})();
