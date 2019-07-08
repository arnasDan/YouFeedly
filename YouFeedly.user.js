// ==UserScript==
// @name         YouFeedly
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Basic Youtube / Feedly integration
// @author       Arnas D
// @match        https://www.youtube.com/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// @run-at       document_start
// ==/UserScript==

var $ = window.jQuery;

const subscribeSelector = '#meta-contents #subscribe-button';

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
                text-decoration: none;
            }
            .feedly-button[subscribed] {
                background-color: var(--yt-spec-10-percent-layer);
                color: var(--yt-spec-text-secondary);
            }
            `);

var addButton = () => {
    if (!$('.feedly-button').length) {
        var subscribeButton = $(subscribeSelector);
        subscribeButton.before('<a class="feedly-button" target="_blank" href="#" >Feedly</a>');
    }
};

var updateButton = () => {
    var feedlyButton = $('.feedly-button');
    //assume identical subscription status in feedly as in YouTube.
    var subscribed = $(subscribeSelector).find('paper-button').attr('subscribed') === '';
    if (subscribed) {
        feedlyButton.attr('subscribed', '');
    }
    else {
        feedlyButton.removeAttr('subscribed');
    }

    var searchTerm = 'youtube.com' + encodeURIComponent($('#owner-name a').attr('href'));
    var baseUrl = 'https://feedly.com/i/discover/sources/search/feed/';

    feedlyButton.attr('href', baseUrl + searchTerm);

};

window.addEventListener('yt-navigate-finish', () => {
        console.log('run');
        addButton();
        updateButton();
    });

//fallback for reloaded page, very ugly, but can't be bothered atm
setTimeout(function() {
        addButton();
        updateButton();
    }, 4000);