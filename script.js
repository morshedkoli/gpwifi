// গ্রামীণ-WiFi - Download Center JavaScript
// Simple, compatible with old browsers

(function() {
    'use strict';
    
    // DOM Ready function (compatible with old browsers)
    function domReady(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(callback, 1);
        } else {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                // IE8 fallback
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'complete') {
                        callback();
                    }
                });
            }
        }
    }
    
    // Mobile menu toggle
    function initMobileMenu() {
        var menuToggle = document.getElementById('menuToggle');
        var headerNav = document.getElementById('headerNav');
        
        if (!menuToggle || !headerNav) return;
        
        function toggleMenu() {
            var isActive = headerNav.classList.contains('active');
            
            if (isActive) {
                headerNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                headerNav.classList.add('active');
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        }
        
        // Add click event
        if (menuToggle.addEventListener) {
            menuToggle.addEventListener('click', toggleMenu);
        } else {
            menuToggle.attachEvent('onclick', toggleMenu);
        }
        
        // Close menu when clicking a nav link
        var navLinks = headerNav.getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
            if (navLinks[i].addEventListener) {
                navLinks[i].addEventListener('click', function() {
                    headerNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            } else {
                navLinks[i].attachEvent('onclick', function() {
                    headerNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            }
        }
        
        // Close menu when clicking outside
        if (document.addEventListener) {
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !headerNav.contains(e.target)) {
                    headerNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // Scroll to top button
    function initScrollTop() {
        var scrollTopBtn = document.getElementById('scrollTop');
        
        if (!scrollTopBtn) return;
        
        function toggleScrollTop() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
        
        function scrollToTop() {
            if (window.scrollTo) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for old browsers
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }
        
        // Add scroll event
        if (window.addEventListener) {
            window.addEventListener('scroll', toggleScrollTop);
        } else {
            window.attachEvent('onscroll', toggleScrollTop);
        }
        
        // Add click event
        if (scrollTopBtn.addEventListener) {
            scrollTopBtn.addEventListener('click', scrollToTop);
        } else {
            scrollTopBtn.attachEvent('onclick', scrollToTop);
        }
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        var links = document.getElementsByTagName('a');
        
        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href');
            if (href && href.charAt(0) === '#') {
                (function(link) {
                    if (link.addEventListener) {
                        link.addEventListener('click', function(e) {
                            var targetId = link.getAttribute('href').substring(1);
                            var targetElement = document.getElementById(targetId);
                            
                            if (targetElement) {
                                if (e.preventDefault) {
                                    e.preventDefault();
                                } else {
                                    e.returnValue = false;
                                }
                                
                                var headerHeight = document.querySelector('.header').offsetHeight;
                                var targetPosition = targetElement.offsetTop - headerHeight - 20;
                                
                                if (window.scrollTo) {
                                    window.scrollTo({
                                        top: targetPosition,
                                        behavior: 'smooth'
                                    });
                                } else {
                                    document.documentElement.scrollTop = targetPosition;
                                    document.body.scrollTop = targetPosition;
                                }
                            }
                        });
                    }
                })(links[i]);
            }
        }
    }
    
    // Initialize all functions
    domReady(function() {
        initMobileMenu();
        initScrollTop();
        initSmoothScroll();
    });
    
})();
