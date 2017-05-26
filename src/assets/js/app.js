/*
 * Module: App
 */
 
(function () {
    'use strict';
    /* global window, document, $*/

    var teamguidelines = window.teamguidelines || {};

    teamguidelines = {
        
        init: function () {
          
            this.nav(); //function initiated here
            this.pagination.init();
            this.slider();
            this.goToSection();
            this.iframe();
        },

        nav: function () {

            var $toggleNav = $('#team-navigation_toggle'),
                $toggleSubNav = $('.has-subnav'),
                $submenuItem = $('.team-menu--sub').find('a'),
                target,
                activeClass = 'is-active',
                breakpoint = window.matchMedia('(max-width:1023px)');

            // nav toggle

            $toggleNav.on('click', function (e) {
                e.preventDefault();
                target = $(this).attr('data-menu-target');
                $('#' + target).toggleClass(activeClass);
            });

            //subnav toggle

            $toggleSubNav.on('click', function (e) {

                if (breakpoint.matches) {
                    e.preventDefault();
                    $toggleSubNav.not(this).removeClass(activeClass);
                    $(this).toggleClass(activeClass);
                }

            });

            //submenu item smooth scroll to target

            $submenuItem.on('click', function (e) {
                e.preventDefault();

                var $this = $(this),
                    $target = $('#' + $this.attr('data-section-target')),
                    currentLocation = window.location.pathname,
                    targetLocation = $this.attr('href'),
                    isActive = currentLocation.indexOf(targetLocation.split("#")[0]);

                if (isActive !== -1) {
                    // if target is on current page scroll to
                    teamguidelines.scrollToSection($target.offset().top, targetLocation);
                } else {
                    window.location = targetLocation;
                }                

            });

            //remove active classes

            breakpoint.addListener(function(data) {
                //console.log('matches: ' + data.matches);

                if (data.matches === false) {
                    $toggleSubNav.removeClass('is-active');
                }
            });

        },
        pagination: {
            current: 0,
            currentTheme: '',
            init: function () {

                var navStr = '',
                    $navContainer,
                    config = {
                    sections: $('.team-section'),
                    sectionContainer: $('.team-main-content'),
                    navItemTemplateObject: $('#section-item-template')
                };

                // only create nav if more than 1 section

                if (config.sections.length > 1) {                

                    // generate side pagination links
                    $navContainer = $('<nav>').attr({
                        'class': 'team-pagination',
                        'id': 'team-pagination'
                    });
                    $navContainer.insertBefore(config.sectionContainer);                

                    navStr = '<ul class="team-pagination_menu">';

                    // loop through sections
                    config.sections.each(function () {

                        var $section = $(this),
                            sectionId = $section.attr('id'),
                            sectionTitle = $section.attr('data-section-title'),
                            hasSubsection = $section.next('.team-section').hasClass('team-section--sub');

                        navStr += '<li>';
                        navStr += '<a class="team-pagination_item" href="#' + sectionId + '" data-section-target="' + sectionId + '"><span>' + sectionTitle + '</span></a>';
                        
                        if (hasSubsection && !$section.hasClass('team-section--sub')) {

                            // open sub menu
                            navStr += '<ul class="team-pagination_menu team-pagination_menu_sub">';

                        } else if (!hasSubsection && $section.hasClass('team-section--sub')) {

                            // last sub menu item
                            navStr += '</li></ul></li>';

                        } else {

                            // close menu item
                            navStr += '</li>';
                        }

                    });

                    navStr += '</ul>';

                    // append nav to container
                    $('#team-pagination').append(navStr);

                }

                // pagination nav event
                $('.team-pagination_item').on('click', function (e) {
                    e.preventDefault();
                    var $target = $('#' + $(this).attr('data-section-target'));

                    teamguidelines.scrollToSection($target.offset().top);
                });

                // waypoints
                config.sections.waypoint(function(direction) {
                    if ( direction === 'down' ) {
                        teamguidelines.pagination.updateNav($(this).get(0));
                    }
                }, {
                    offset: '40%'
                });

                config.sections.waypoint(function(direction) {
                    if( direction === 'up' ) {
                        teamguidelines.pagination.updateNav($(this).get(0));
                    }
                }, {
                    offset: '-40%'
                });

            },
            updateNav: function (section) {

                var $paginationContainer = $('.team-pagination'),
                    $navLinks = $('.team-pagination_item'),
                    $targetSection = $('#' + section.element.id),
                    $sectionLink,
                    targetSectionTheme = $targetSection.attr('data-section-theme'),                    
                    hasSubMenu,
                    index = $targetSection.index();

                // update menu item
                $navLinks.eq(this.current).removeClass('is-active');
                this.current = index;
                $navLinks.eq(this.current).addClass('is-active');

                // check if submenu present
                $sectionLink = $navLinks.eq(this.current).parents('li').last();
                hasSubMenu = $sectionLink.find('.team-pagination_menu_sub').length;

                if (hasSubMenu) {
                    $sectionLink.addClass('sub-menu-active');
                } else {
                    $('.sub-menu-active').removeClass('sub-menu-active');
                }

                // set pagination color theme
                $paginationContainer.removeClass(teamguidelines.pagination.currentTheme);

                if (targetSectionTheme !== '' && targetSectionTheme !== undefined) {
                    teamguidelines.pagination.currentTheme = targetSectionTheme;
                    $paginationContainer.addClass(teamguidelines.pagination.currentTheme);  
                }
            }            
        },
        iframe: function () {

            var $iframeControl = $('.team-bp-selector_item'),
                $iframeTarget = $('.team-iframe'),
                targetWidth;

            $iframeControl.on('click', function (e) {
                e.preventDefault();
                targetWidth = $(this).attr('data-breakpoint');

                $iframeTarget.css({
                    'width': targetWidth
                });

            });

        },
        goToSection: function () {
            var hash = window.location.hash,
                hashOffset,
                headerHeight = 0;

            if (!$('body').hasClass('no-header')) {
                headerHeight = 60;
            }

            if (hash) {
                hashOffset = $(hash).offset().top - headerHeight;
                $('html, body').stop().animate( { scrollTop : hashOffset}, 650, 'easeInOutExpo' ); //60 = header height
            }
        },
        scrollToSection: function (offsetTop, url) {

            var headerHeight = 0;

            if (!$('body').hasClass('no-header')) {
                headerHeight = 60;
            }

            $('html, body').stop().animate( { scrollTop : offsetTop - headerHeight }, 650, 'easeInOutExpo' ); //60 = header height

            // update location            
            if (history.pushState) {
                history.pushState(null, null, url);
            }            
        },
        slider: function () {

            $('.team-slider').slick({
                'dots' : true,
                'arrows' : false
            });
        }

    };

    window.teamguidelines = teamguidelines;

    $(document).ready(function () {
        teamguidelines.init();        
    });

}());