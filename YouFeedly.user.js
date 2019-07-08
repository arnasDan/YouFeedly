// ==UserScript==
// @name         YouFeedly
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Basic Youtube / Feedly integration
// @author       Arnas D
// @match        https://www.youtube.com/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// ==/UserScript==

var $ = window.jQuery;

GM_addStyle(`
            .feedly-button {
                border-radius: 2px;
                color: #FFFFFF;
                padding: var(--yt-button-padding);
                margin: auto var(--ytd-subscribe-button-margin, 4px);
                white-space: nowrap;
                font-size: 1.4rem;
                font-weight: 500;
                letter-spacing: .007px;
                text-transform: uppercase;
                display: var(--layout-horizontal_-_display);
                -ms-flex-direction: var(--layout-horizontal_-_-ms-flex-direction);
                -webkit-flex-direction: var(--layout-horizontal_-_-webkit-flex-direction);
                flex-direction: var(--layout-horizontal_-_flex-direction);
                background: #1fb446;
                border: none;
                font-family: var(--paper-font-common-base_-_font-family);
                cursor: pointer;
            }
            .feedly-button[subscribed] {
                background-color: var(--yt-spec-10-percent-layer);
                color: var(--yt-spec-text-secondary);
            }
            `);

var addButton = function() {
    if (!$('.feedly-button').length) {
        var subscribeButton = $('#meta #subscribe-button');
        //assume identical subscription status in feedly as in YouTube.
        var attr = subscribeButton.find('paper-button').attr('subscribed') == '' ? 'subscribed=""' : '';
        var feedlyButton = subscribeButton.before(`<button class="feedly-button" ${attr}>Feedly</button>`);
    }
};

window.addEventListener('yt-navigate-start', function() {
        addButton();
    });

//fallback for reloaded page, very ugly, but can't be bothered atm
setTimeout(function() {
        addButton();
    }, 4000);