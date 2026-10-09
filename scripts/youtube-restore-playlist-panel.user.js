// ==UserScript==
// @name         YouTube Mix Playlist Restorer
// @namespace    https://github.com/BetterYoutube
// @version      1.2.0
// @description  Restores the playlist panel (ytd-playlist-panel-renderer) by removing the 'hidden' attribute when watching YouTube Mixes or playlists with an active account, and hides it back when 'list' is missing.
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
     * Проверяет наличие query-параметра "list" в URL.
     * @returns {boolean}
     */
    function hasListParam() {
        return new URLSearchParams(window.location.search).has('list');
    }

    /**
     * Синхронизирует видимость панели со статусом параметра 'list'.
     * @param {Element} panel
     */
    function updatePanelVisibility(panel) {
        if (!panel) return;

        if (hasListParam()) {
            if (panel.hasAttribute('hidden')) {
                panel.removeAttribute('hidden');
            }
        } else {
            if (!panel.hasAttribute('hidden')) {
                panel.setAttribute('hidden', '');
            }
        }
    }

    /**
     * Наблюдает за изменениями атрибута hidden у конкретной панели.
     * @param {Element} panel
     */
    function attachPanelObserver(panel) {
        if (!panel || observedPanels.has(panel)) return;
        observedPanels.add(panel);

        updatePanelVisibility(panel);

        const panelObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'hidden') {
                    updatePanelVisibility(panel);
                }
            }
        });

        panelObserver.observe(panel, {
            attributes: true,
            attributeFilter: ['hidden']
        });
    }

    /**
     * Проверяет все найденные панели в DOM.
     */
    function scanAndUpdate() {
        const panels = document.querySelectorAll(PANEL_TAG);
        panels.forEach(attachPanelObserver);
    }

    /**
     * Следит за добавлением панелей в DOM.
     */
    function initDOMWatcher() {
        scanAndUpdate();

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

    // Инициализация при готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDOMWatcher);
    } else {
        initDOMWatcher();
    }

    // Срабатывает при каждом переходе внутри SPA YouTube
    window.addEventListener('yt-navigate-finish', scanAndUpdate);
})();
