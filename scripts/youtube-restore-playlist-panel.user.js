// ==UserScript==
// @name         YouTube Mix Playlist Restorer
// @namespace    https://github.com/BetterYoutube
// @version      1.0.0
// @description  Restores the playlist panel (ytd-playlist-panel-renderer) by removing the 'hidden' attribute when watching YouTube Mixes or playlists with an active account.
// @author       David Lishchyshen
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const PANEL_TAG = 'ytd-playlist-panel-renderer';
    const observedPanels = new WeakSet();

    /**
     * Removes the 'hidden' attribute from the playlist panel element.
     * @param {Element} panel
     */
    function unhidePanel(panel) {
        if (!panel) return;
        if (panel.hasAttribute('hidden')) {
            panel.removeAttribute('hidden');
        }
    }

    /**
     * Attaches a targeted MutationObserver to watch and remove the 'hidden' attribute
     * if YouTube re-applies it during playback or track changes.
     * @param {Element} panel
     */
    function attachPanelObserver(panel) {
        if (!panel || observedPanels.has(panel)) return;
        observedPanels.add(panel);

        // Unhide immediately
        unhidePanel(panel);

        // Dedicated observer specifically for this panel's attributes
        const panelObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'hidden') {
                    unhidePanel(panel);
                }
            }
        });

        panelObserver.observe(panel, {
            attributes: true,
            attributeFilter: ['hidden']
        });
    }

    /**
     * Scans the document for any existing playlist panels.
     */
    function scanAndUnhide() {
        const panels = document.querySelectorAll(PANEL_TAG);
        panels.forEach(attachPanelObserver);
    }

    /**
     * Monitors the DOM for when ytd-playlist-panel-renderer is added to the page.
     */
    function initDOMWatcher() {
        scanAndUnhide();

        const bodyObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName && node.tagName.toLowerCase() === PANEL_TAG) {
                            attachPanelObserver(node);
                        } else if (node.firstElementChild) {
                            const panel = node.querySelector(PANEL_TAG);
                            if (panel) attachPanelObserver(panel);
                        }
                    }
                }
            }
        });

        const target = document.body || document.documentElement;
        if (target) {
            bodyObserver.observe(target, {
                childList: true,
                subtree: true
            });
        }
    }

    // Initialize as soon as DOM is interactive
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDOMWatcher);
    } else {
        initDOMWatcher();
    }

    // YouTube SPA navigation handler: re-scan when moving between videos/playlists
    window.addEventListener('yt-navigate-finish', scanAndUnhide);
})();
