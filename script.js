// Grameen-WiFi minimal landing interactions
// Keep JS small and compatible with older browsers.

(function() {
    'use strict';

    function domReady(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(callback, 1);
            return;
        }

        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback);
        } else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState === 'complete') {
                    callback();
                }
            });
        }
    }

    function hasClass(el, className) {
        if (!el) return false;
        if (el.classList) return el.classList.contains(className);
        return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
    }

    function addClass(el, className) {
        if (!el) return;
        if (el.classList) {
            el.classList.add(className);
            return;
        }
        if (!hasClass(el, className)) {
            el.className += (el.className ? ' ' : '') + className;
        }
    }

    function removeClass(el, className) {
        if (!el) return;
        if (el.classList) {
            el.classList.remove(className);
            return;
        }
        el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'), ' ');
    }

    function addEvent(el, eventName, handler) {
        if (!el) return;
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else if (el.attachEvent) {
            el.attachEvent('on' + eventName, handler);
        }
    }

    function isInside(parent, child) {
        if (!parent || !child) return false;
        if (parent.contains) return parent.contains(child);

        while (child) {
            if (child === parent) return true;
            child = child.parentNode;
        }
        return false;
    }

    function initMobileMenu() {
        var menuToggle = document.getElementById('menuToggle');
        var headerNav = document.getElementById('headerNav');
        if (!menuToggle || !headerNav) return;

        function closeMenu() {
            removeClass(headerNav, 'active');
            removeClass(menuToggle, 'active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        function openMenu() {
            addClass(headerNav, 'active');
            addClass(menuToggle, 'active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }

        function toggleMenu() {
            if (hasClass(headerNav, 'active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        addEvent(menuToggle, 'click', toggleMenu);

        var navLinks = headerNav.getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
            addEvent(navLinks[i], 'click', closeMenu);
        }

        addEvent(document, 'click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;

            if (!isInside(menuToggle, target) && !isInside(headerNav, target)) {
                closeMenu();
            }
        });
    }

    function initAnchorJump() {
        var links = document.getElementsByTagName('a');
        var header = document.getElementsByClassName ? document.getElementsByClassName('header')[0] : null;

        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href');
            if (!href || href.charAt(0) !== '#') continue;

            (function(link) {
                addEvent(link, 'click', function(e) {
                    var targetId = link.getAttribute('href').substring(1);
                    var target = document.getElementById(targetId);
                    var headerHeight = header ? header.offsetHeight : 0;
                    var scrollTop = target ? target.offsetTop - headerHeight - 12 : 0;

                    if (!target) return;

                    if (e && e.preventDefault) {
                        e.preventDefault();
                    } else if (e) {
                        e.returnValue = false;
                    }

                    if (scrollTop < 0) scrollTop = 0;

                    if (window.scrollTo) {
                        window.scrollTo(0, scrollTop);
                    } else {
                        document.documentElement.scrollTop = scrollTop;
                        document.body.scrollTop = scrollTop;
                    }
                });
            })(links[i]);
        }
    }

    domReady(function() {
        initMobileMenu();
        initAnchorJump();
    });
})();
