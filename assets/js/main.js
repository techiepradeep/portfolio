/* ===================================================================
    Author          : ModinaTheme
    Version         : 1.0
* ================================================================= */

(function ($) {
    "use strict";

    $(document).ready(function () {

        //>> Gsap Aniamtion Start <<//

        // Register GSAP Plugins
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);

        //Smooth Scroll
        gsap.config({
            nullTargetWarn: false,
        });
        let smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });

        // Image Reveal Animation
        let tp_img_reveal = document.querySelectorAll(".tp_img_reveal");

        tp_img_reveal.forEach((img_reveal) => {
            let image = img_reveal.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: img_reveal,
                    start: "top 10%",
                }
            });

            tl.set(img_reveal, { autoAlpha: 1 });
            tl.from(img_reveal, 1.5, {
                yPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                yPercent: 100,
                scale: 1.5,
                delay: -1.5,
                ease: Power2.out
            });
        });

        // Image Reveal 2 Animation
        let tp_img_reveal_2 = document.querySelectorAll(".tp_img_reveal_2");

        tp_img_reveal_2.forEach((img_reveal) => {
            let image = img_reveal.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: img_reveal,
                    start: "top 10%",
                }
            });

            tl.set(img_reveal, { autoAlpha: 1 });
            tl.from(img_reveal, 1.5, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                xPercent: 100,
                scale: 1.5,
                delay: -1.5,
                ease: Power2.out
            });
        });

        // Text Up Scroll 
        if ($('.text-splite-up').length > 0) {
            let splitTitleLines = gsap.utils.toArray(".text-splite-up");
            splitTitleLines.forEach(splitTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 80%',
                        scrub: 1,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });

                const itemSplitted = new SplitText(splitTextLine, {
                    type: "words, lines"
                });
                gsap.set(splitTextLine, {
                    perspective: 400
                });
                itemSplitted.split({
                    type: "lines"
                })
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: 0.3,
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
                    stagger: 0.1
                });
            });
        }

        // hover reveal start
        const hoverItem = document.querySelectorAll(".bw-hover-image");

        function moveImage(e, hoverItem, index) {
            const item = hoverItem.getBoundingClientRect();
            const x = e.clientX - item.x;
            const y = e.clientY - item.y;
            if (hoverItem.children[index]) {
                hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
            }
        }
        hoverItem.forEach((item, i) => {
            item.addEventListener("mousemove", (e) => {
                setInterval(moveImage(e, item, 1), 50);
            });
        });
        $("[data-background").each(function () {
            $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
        });

        // Tp Char Animation
        if ($('.tp-char-animation').length > 0) {
            // 25. Title Animation
            let char_come = gsap.utils.toArray(".tp-char-animation");
            char_come.forEach(splitTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });

                const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
                gsap.set(splitTextLine, { perspective: 300 });
                itemSplitted.split({ type: "chars, words" })
                tl.from(itemSplitted.chars,
                    {
                        duration: 1,
                        delay: 0.5,
                        x: 100,
                        autoAlpha: 0,
                        stagger: 0.05
                    });
            });
        }

        // Text Move Anim
        let text_animation = gsap.utils.toArray(".has_text_move_anim");

        text_animation.forEach(splitTextLine => {
            var delay_value = 0.5
            if (splitTextLine.getAttribute("data-delay")) {
                delay_value = splitTextLine.getAttribute("data-delay");
            }
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 85%',
                    duration: 1.5,
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none'
                }
            });

            const itemSplitted = new SplitText(splitTextLine, {
                type: "lines"
            });
            gsap.set(splitTextLine, {
                perspective: 400
            });
            itemSplitted.split({
                type: "lines"
            })
            tl.from(itemSplitted.lines, {
                duration: 1,
                delay: delay_value,
                opacity: 0,
                rotationX: -80,
                force3D: true,
                transformOrigin: "top center -50",
                stagger: 0.1
            });
        });

        // 04. Type JS
        var type_list = document.querySelector('#typed_list');

        if (type_list) {
            var aboutsocial = new Typed('#typed', {
                stringsElement: '#typed_list',
                typeSpeed: 60,
                backSpeed: 60,
                cursorChar: "|",
                loop: true,
            });
        };

        // Prallax Img
        if ($('.tp-full-img-wrap').length > 0) {
            ScrollTrigger.create({
                trigger: ".tp-full-img-wrap",
                start: "top 65",
                end: "bottom 0%",
                pin: ".tp-full-img",
                pinSpacing: false,
            });
        }

        // Text Invert With Scroll 
        const split = new SplitText(".text_invert", { type: "lines" });

        split.lines.forEach((target) => {
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: 1,
                    start: 'top 85%',
                    end: "bottom center",
                }
            });
        });

        const split2 = new SplitText(".text_invert-2", { type: "lines" });

        split2.lines.forEach((target) => {
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: 1,
                    start: 'top 85%',
                    end: "bottom center",
                }
            });
        });

        const split3 = new SplitText(".text_invert-3", { type: "lines" });

        split3.lines.forEach((target) => {
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: 1,
                    start: 'top 85%',
                    end: "bottom center",
                }
            });
        });


        // Has Fade Anim
        const fadeArray = gsap.utils.toArray(".has_fade_anim")
        // gsap.set(fadeArray, {opacity:0})
        fadeArray.forEach((item, i) => {

            var fade_direction = "bottom"
            var onscroll_value = 1
            var duration_value = 1.5
            var fade_offset = 50
            var delay_value = 0.5
            var ease_value = "power2.out"

            if (item.getAttribute("data-fade-offset")) {
                fade_offset = item.getAttribute("data-fade-offset");
            }
            if (item.getAttribute("data-duration")) {
                duration_value = item.getAttribute("data-duration");
            }

            if (item.getAttribute("data-fade-from")) {
                fade_direction = item.getAttribute("data-fade-from");
            }
            if (item.getAttribute("data-on-scroll")) {
                onscroll_value = item.getAttribute("data-on-scroll");
            }
            if (item.getAttribute("data-delay")) {
                delay_value = item.getAttribute("data-delay");
            }
            if (item.getAttribute("data-ease")) {
                ease_value = item.getAttribute("data-ease");
            }

            if (onscroll_value == 1) {
                if (fade_direction == "top") {
                    gsap.from(item, {
                        y: -fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    })
                }
                if (fade_direction == "left") {
                    gsap.from(item, {
                        x: -fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    })
                }
                if (fade_direction == "bottom") {
                    gsap.from(item, {
                        y: fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    })
                }
                if (fade_direction == "right") {
                    gsap.from(item, {
                        x: fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    })
                }
                if (fade_direction == "in") {
                    gsap.from(item, {
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    })
                }
            }
            else {
                if (fade_direction == "top") {
                    gsap.from(item, {
                        y: -fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                    })
                }
                if (fade_direction == "left") {
                    gsap.from(item, {
                        x: -fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                    })
                }
                if (fade_direction == "bottom") {
                    gsap.from(item, {
                        y: fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                    })
                }
                if (fade_direction == "right") {
                    gsap.from(item, {
                        x: fade_offset,
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                    })
                }
                if (fade_direction == "in") {
                    gsap.from(item, {
                        opacity: 0,
                        ease: ease_value,
                        duration: duration_value,
                        delay: delay_value,
                    })
                }
            }



        })

        // Has Fade Anim 
        if ($('.tp_fade_bottom').length > 0) {
            gsap.set(".tp_fade_bottom", { y: 100, opacity: 0 });
            const fadeArray = gsap.utils.toArray(".tp_fade_bottom")
            fadeArray.forEach((item, i) => {
                let fadeTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top center+=400",
                    }
                })
                fadeTl.to(item, {
                    y: 0,
                    opacity: 1,
                    ease: "power2.out",
                    duration: 1.5,
                })
            })
        }

        // Has Text Reveal Animation 
        const anim_reveal = document.querySelectorAll(".has_text_reveal_anim");

        anim_reveal.forEach(areveal => {

            var duration_value = 1.5
            var onscroll_value = 1
            var stagger_value = 0.02
            var data_delay = 0.05

            if (areveal.getAttribute("data-duration")) {
                duration_value = areveal.getAttribute("data-duration");
            }
            if (areveal.getAttribute("data-on-scroll")) {
                onscroll_value = areveal.getAttribute("data-on-scroll");
            }
            if (areveal.getAttribute("data-stagger")) {
                stagger_value = areveal.getAttribute("data-stagger");
            }
            if (areveal.getAttribute("data-delay")) {
                data_delay = areveal.getAttribute("data-delay");
            }


            areveal.split = new SplitText(areveal, {
                type: "lines,words,chars",
                linesClass: "anim-reveal-line"
            });

            if (onscroll_value == 1) {
                areveal.anim = gsap.from(areveal.split.chars, {
                    scrollTrigger: {
                        trigger: areveal,
                        start: 'top 85%',

                    },
                    duration: duration_value,
                    delay: data_delay,
                    ease: "circ.out",
                    y: 80,
                    stagger: stagger_value,
                    opacity: 0,
                });
            } else {
                areveal.anim = gsap.from(areveal.split.chars, {
                    duration: duration_value,
                    delay: data_delay,
                    ease: "circ.out",
                    y: 80,
                    stagger: stagger_value,
                    opacity: 0,
                });
            }

        });

        if ($('.tp-project-3-wrap').length > 0) {

            let pw = gsap.matchMedia();
            pw.add("(min-width: 1200px)", () => {

                gsap.set('.tp-project-3-wrap .pro-img-1 img', {
                    x: '500',
                })
                gsap.set('.tp-project-3-wrap .pro-img-2 img', {
                    x: '-500',
                })

                let projects = gsap.utils.toArray(".tp-project-3-wrap");

                projects.forEach((item) => {
                    var $this = $(item);

                    gsap.to($this.find('.pro-img-1 img'), {
                        x: '0',
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top 18%',
                            end: 'bottom 10%',
                            scrub: 1,
                            pin: true,
                            transformOrigin: "50% 50%"
                        },
                    })

                    gsap.to($this.find('.pro-img-2 img'), {
                        x: '0',
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top 18%',
                            end: 'bottom 10%',
                            scrub: 1,
                            pin: false,
                            transformOrigin: "50% 50%"
                        },
                    })
                });

            });
        }

        // Photographer Galary Image
        var photo_gallary = document.querySelectorAll(".img_anim_group_scale img")
        gsap.set(".img_anim_group_scale img", {
            scale: 0.7
        })
        photo_gallary.forEach((gallary) => {
            gsap.to(gallary, {
                scrollTrigger: {
                    trigger: gallary,
                    start: "top 90%",
                    scrub: true
                },
                scale: 1,
            });
        });

        let zm = gsap.matchMedia();
        zm.add("(min-width: 1200px)", () => {
            if ($('.tp-hero-area').length > 0) {
                gsap.set(".tp-zoom-img", { scale: 0, opacity: 0 });

                gsap.to(".tp-zoom-img", {
                    scrollTrigger: {
                        trigger: ".tp-hero-area",
                        start: "top center",
                        markers: false,
                    },
                    duration: 1.5,
                    ease: "none",
                    scale: 1,
                    opacity: 1,
                })

            }
        });


        var hoverBtns = gsap.utils.toArray(".tp-hover-btn-wrapper");

        const hoverBtnItem = gsap.utils.toArray(".tp-hover-btn-item");
        hoverBtns.forEach((btn, i) => {
            $(btn).mousemove(function (e) {
                callParallax(e);
            });
            function callParallax(e) {
                parallaxIt(e, hoverBtnItem[i], 20);
            }

            function parallaxIt(e, target, movement) {
                var $this = $(btn);
                var relX = e.pageX - $this.offset().left;
                var relY = e.pageY - $this.offset().top;

                gsap.to(target, 1, {
                    x: ((relX - $this.width() / 2.5) / $this.width()) * movement,
                    y: ((relY - $this.height() / 2.5) / $this.height()) * movement,
                    ease: Power2.easeOut,
                });
            }
            $(btn).mouseleave(function (e) {
                gsap.to(hoverBtnItem[i], 1, {
                    x: 0,
                    y: 0,
                    ease: Power2.easeOut,
                });
            });
        });

        //>> Gsap Aniamtion End <<// 

        //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });
        $('#mobile-menu-2').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1920",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });
        //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function () {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function () {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//

        $(window).scroll(function () {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        if ($(".masonry-layout").length) {
            $(".masonry-layout").imagesLoaded(function () {
                $(".masonry-layout").isotope({
                    layoutMode: "masonry"
                });
            });
        }

        if ($(".post-filter").length) {
            var postFilterList = $(".post-filter li");
            // for first init
            $(".filter-layout").isotope({
                filter: ".filter-item",
                animationOptions: {
                    duration: 500,
                    easing: "linear",
                    queue: false
                }
            });
            // on click filter links
            postFilterList.on("click", function () {
                var Self = $(this);
                var selector = Self.attr("data-filter");
                postFilterList.removeClass("active");
                Self.addClass("active");

                $(".filter-layout").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: "linear",
                        queue: false
                    }
                });
                return false;
            });
        }

        if ($(".post-filter.has-dynamic-filter-counter").length) {
            // var allItem = $('.single-filter-item').length;

            var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
                "li"
            );

            activeFilterItem.each(function () {
                var filterElement = $(this).data("filter");
                var count = $(".filter-layout").find(filterElement).length;
                $(this).append("<sup>[" + count + "]</sup>");
            });
        }
        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Nice Select Start <<//
        $('select').niceSelect();

        // Popular Causes Progress Bar
        if ($(".count-bar").length) {
            $(".count-bar").appear(
                function () {
                    var el = $(this);
                    var percent = el.data("percent");
                    $(el).css("width", percent).addClass("counted");
                }, {
                accY: -50
            }
            );
        }

        function animateProgress(percent, circle, text) {
            const radius = 100;
            const circ = 2 * Math.PI * radius;
            const offset = circ - (percent / 100) * circ;

            circle.style.strokeDasharray = circ;
            circle.style.strokeDashoffset = circ;
            text.textContent = "0%";

            // Animate circle
            setTimeout(() => {
                circle.style.transition = "stroke-dashoffset 1s ease";
                circle.style.strokeDashoffset = offset;
            }, 100);

            // Animate number
            let val = 0;
            const interval = setInterval(() => {
                text.textContent = `${val}%`;
                if (val >= percent) clearInterval(interval);
                val++;
            }, 15);
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const circle = container.querySelector('.progress');
                    const text = container.querySelector('.percent');

                    const percent = parseInt(container.dataset.percent, 10) || 0;
                    animateProgress(percent, circle, text);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.circle-progress').forEach(el => observer.observe(el));

        //>> Scroll Js Start <<//
        const scrollPath = document.querySelector(".scroll-up path");
        const pathLength = scrollPath.getTotalLength();
        scrollPath.style.transition = scrollPath.style.WebkitTransition = "none";
        scrollPath.style.strokeDasharray = pathLength + " " + pathLength;
        scrollPath.style.strokeDashoffset = pathLength;
        scrollPath.getBoundingClientRect();
        scrollPath.style.transition = scrollPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

        const updatescroll = function () {
            let scrolltotal = $(window).scrollTop();
            let height = $(document).height() - $(window).height();
            let scrolltotalheight = pathLength - (scrolltotal * pathLength) / height;
            scrollPath.style.strokeDashoffset = scrolltotalheight;
        };
        updatescroll();

        $(window).scroll(updatescroll);
        const offset = 50;
        const duration = 950;

        $(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".scroll-up").addClass("active-scroll");
            } else {
                jQuery(".scroll-up").removeClass("active-scroll");
            }
        });

        /*-- Price Range --*/
        function priceFilter() {
            if ($(".price-ranger").length) {
                $("#slider-range").slider({
                    range: true,
                    min: 56,
                    max: 1578,
                    values: [56, 789], // Default values
                    slide: function (event, ui) {
                        $(".ranger-min-max-block .min").text("$" + ui.values[0]);
                        $(".ranger-min-max-block .max").text("$" + ui.values[1]);
                    }
                });

                $(".ranger-min-max-block .min").text("$" + $("#slider-range").slider("values", 0));
                $(".ranger-min-max-block .max").text("$" + $("#slider-range").slider("values", 1));
            }
        }

        $(document).ready(function () {
            priceFilter();
        });

        //>> Mouse Cursor Start <<//

        if (!document.body.classList.contains("is-mobile") && document.querySelector("#custom-cursor-wrapper.tp-cursor")) {
            $(".tp-magnetic-item").wrap('<div class="tp-magnetic-wrap"></div>');

            if ($("a.tp-magnetic-item").length) {
                $("a.tp-magnetic-item").addClass("not-hide-cursor");
            }

            var $mouse = { x: 0, y: 0 };
            var $pos = { x: 0, y: 0 };
            var $ratio = 0.15;
            var $active = false;
            var $cursorDot = $("#cursorDot");

            var $cursorDotWidth = 14;
            var $cursorDotHeight = 14;
            var $cursorDotScale = 1;
            var $cursorDotOpacity = 1;
            var $cursorDotBorderWidth = 1;

            gsap.set($cursorDot, {
                xPercent: -50,
                yPercent: -50,
                width: $cursorDotWidth,
                height: $cursorDotHeight,
                borderWidth: $cursorDotBorderWidth,
                opacity: $cursorDotOpacity
            });

            document.addEventListener("mousemove", mouseMove);

            function mouseMove(e) {
                $mouse.x = e.clientX;
                $mouse.y = e.clientY;
            }

            gsap.ticker.add(updatePosition);

            function updatePosition() {
                if (!$active) {
                    $pos.x += ($mouse.x - $pos.x) * $ratio;
                    $pos.y += ($mouse.y - $pos.y) * $ratio;

                    gsap.set($cursorDot, { x: $pos.x, y: $pos.y });
                }
            }

            $(".tp-magnetic-wrap").mousemove(function (e) {
                parallaxCursor(e, this, 2); // magnetic cursorDot = low number is more attractive
                callParallax(e, this);
            });

            function callParallax(e, parent) {
                parallaxIt(e, parent, parent.querySelector(".tp-magnetic-item"), 25); // magnetic area = higher number is more attractive
            }

            function parallaxIt(e, parent, target, movement) {
                var boundingRect = parent.getBoundingClientRect();
                var relX = e.clientX - boundingRect.left;
                var relY = e.clientY - boundingRect.top;

                gsap.to(target, {
                    duration: 0.3,
                    x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                    y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                    ease: Power2.easeOut
                });
            }

            function parallaxCursor(e, parent, movement) {
                var rect = parent.getBoundingClientRect();
                var relX = e.clientX - rect.left;
                var relY = e.clientY - rect.top;
                $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
                $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
                gsap.to($cursorDot, { duration: 0.3, x: $pos.x, y: $pos.y });
            }


            // Magnetic item hover.
            $(".tp-magnetic-wrap").on("mouseenter", function (e) {
                gsap.to($cursorDot, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $cursorDotOpacity });
                $active = true;
            }).on("mouseleave", function (e) {
                gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, borderWidth: $cursorDotBorderWidth, opacity: $cursorDotOpacity });
                gsap.to(this.querySelector(".tp-magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps: "all" });
                $active = false;
            });

            // Cursor view on hover (data attribute "data-cursor="...").
            $("[data-cursor]").each(function () {
                $(this).on("mouseenter", function () {
                    $("#cursorDot").addClass("with-blur");
                    $cursorDot.append('<div class="cursorDot-view"></div>');
                    $(".cursorDot-view").append($(this).attr("data-cursor"));
                    gsap.to($cursorDot, {
                        duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: 0, zIndex: 1, backdropFilter: "blur(14px)",
                        backgroundColor: "#fff"
                    });
                    gsap.to(".cursorDot-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
                }).on("mouseleave", function () {
                    gsap.to($cursorDot, { duration: 0.3, yPercent: -50, width: $cursorDotWidth, height: $cursorDotHeight, opacity: $cursorDotOpacity, borderWidth: $cursorDotBorderWidth, backgroundColor: "#000" });
                    gsap.to(".cursorDot-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
                    $cursorDot.find(".cursorDot-view").remove();
                });
                $(this).addClass("not-hide-cursor");
            });

            $("[data-cursor2]").each(function () {
                $(this).on("mouseenter", function () {
                    $("#cursorDot").addClass("with-blur");
                    $cursorDot.append('<div class="cursorDot-drag"></div>');
                    $(".cursorDot-drag").append($(this).attr("data-cursor2"));
                    gsap.to($cursorDot, {
                        duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: "1px", borderColor: "rgba(255, 255, 255, 0.22)", zIndex: 1, backdropFilter: "blur(34px)",
                        backgroundColor: "rgba(255, 255, 255, 0.30)", boxShadow: "11px 11px 32.2px 0px rgba(255, 255, 255, 0.12) inset"
                    });
                    gsap.to(".cursorDot-drag", { duration: 0.3, scale: 1, autoAlpha: 1 });
                }).on("mouseleave", function () {
                    gsap.to($cursorDot, { duration: 0.3, yPercent: -50, width: $cursorDotWidth, height: $cursorDotHeight, opacity: $cursorDotOpacity, borderWidth: $cursorDotBorderWidth, backgroundColor: "#000" });
                    gsap.to(".cursorDot-drag", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
                    $cursorDot.find(".cursorDot-drag").remove();
                });
                $(this).addClass("not-hide-cursor2");
            });
            // Show/hide cursor // 

            // Hide on hover//
            $("a, button") // class "hide-cursor" is for global use.
                .not('.cursor-hide') // omit from selection.
                .on("mouseenter", function () {
                    gsap.to($cursorDot, { duration: 0.3, scale: 0, opacity: 0 });
                }).on("mouseleave", function () {
                    gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, opacity: $cursorDotOpacity });
                });

            // Hide on click//
            $("a")
                .not('[target="_blank"]') // omit from selection.
                .not('.cursor-hide') // omit from selection.
                .not('[href^="#"]') // omit from selection.
                .not('[href^="mailto"]') // omit from selection.
                .not('[href^="tel"]') // omit from selection.
                .not(".lg-trigger") // omit from selection.
                .not(".tp-btn-disabled a") // omit from selection.
                .on('click', function () {
                    gsap.to($cursorDot, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
                });

            // Show/hide on document leave/enter//
            $(document).on("mouseleave", function () {
                gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 0 });
            }).on("mouseenter", function () {
                gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
            });

            // Show as the mouse moves//
            $(document).mousemove(function () {
                gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
            });
        }

        function is_rtl() {
            return $('html').attr('dir') == 'rtl' ? true : false;
        }

        //>> Circle Text Start <<//
        const circleTexts = document.querySelectorAll(".circle-text");

        circleTexts.forEach((circletext) => {
            circletext.innerHTML = circletext.innerText
                .split("")
                .map(
                    (char, i) => `<span style="transform:rotate(${i * 9.1}deg)">${char}</span>`
                )
                .join("");
        });

        //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });

        //>> Counterup Start <<//
        $(".count").counterUp({
            delay: 15,
            time: 4000,
        });

        // Add payment amount area start here ***
        $(document).on("click", ".amount-btn", function () {
            // Remove the "active" class from all buttons
            $(".amount-btn").removeClass("active");

            // Add the "active" class to the clicked button
            $(this).addClass("active");

            // Get the text value of the clicked button
            let buttonValue = $(this).text();

            // Update the value attribute of the input element
            $(".addAmount-value").val(buttonValue);
        });
        // Add payment amount area end here ***

        //>> Search Popup Start <<//
        const $searchWrap = $(".search-wrap");
        const $navSearch = $(".nav-search");
        const $searchClose = $("#search-close");

        $(".search-trigger").on("click", function (e) {
            e.preventDefault();
            $searchWrap.animate({ opacity: "toggle" }, 500);
            $navSearch.add($searchClose).addClass("open");
        });

        $(".search-close").on("click", function (e) {
            e.preventDefault();
            $searchWrap.animate({ opacity: "toggle" }, 500);
            $navSearch.add($searchClose).removeClass("open");
        });

        function closeSearch() {
            $searchWrap.fadeOut(200);
            $navSearch.add($searchClose).removeClass("open");
        }

        $(document.body).on("click", function (e) {
            closeSearch();
        });

        $(".search-trigger, .main-search-input").on("click", function (e) {
            e.stopPropagation();
        });


    }); // End Document Ready Function


    //>> Hero-1 Slider Start <<//
    const sliderActive2 = ".hero-slider";
    const sliderInit2 = new Swiper(sliderActive2, {
        loop: true,
        slidesPerView: 1,
        effect: "fade",
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
    });

    const sliderActive3 = ".hero-slider2";
    const sliderInit4 = new Swiper(sliderActive3, {
        loop: true,
        slidesPerView: 1,
        effect: "fade",
        speed: 3000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
    });

    function animated_swiper(selector, init) {
        const animated = function animated() {
            $(selector + " [data-animation]").each(function () {
                let anim = $(this).data("animation");
                let delay = $(this).data("delay");
                let duration = $(this).data("duration");
                $(this)
                    .removeClass("anim" + anim)
                    .addClass(anim + " animated")
                    .css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration,
                    })
                    .one("animationend", function () {
                        $(this).removeClass(anim + " animated");
                    });
            });
        };
        animated();
        init.on("slideChange", function () {
            $(sliderActive2 + " [data-animation]").removeClass("animated");
        });
        init.on("slideChange", animated);
    }

    animated_swiper(sliderActive2, sliderInit2, sliderActive3, sliderInit4);

    //>> Brand Slider Start <<//
    const brandSlider = new Swiper(".brand-slider", {
        spaceBetween: 70,
        loop: true,
        autoplay: true,
        speed: 6000,
        autoplay: {
            delay: 0,
        },
        pagination: {
            el: ".dot",
            clickable: true,
        },
        breakpoints: {
            475: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            1199: {
                slidesPerView: 6,
            },
        },
    });

    // Hero active 
    if ('.hero-active') {
        const swiper = new Swiper('.hero-active', {
            // pass EffectCarousel module to modules
            modules: [EffectCarousel],
            // specify "carousel" effect
            effect: 'carousel',
            // carousel effect parameters
            carouselEffect: {
                // opacity change per side slide
                opacityStep: 0.00,
                // scale change per side slide
                scaleStep: 0.2,
                // amount of side slides visible, can be 1, 2 or 3
                sideSlides: 1,
            },
            loop: true,
            loopAdditionalSlides: 1,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.hero-active-next',
                prevEl: '.hero-active-prev',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //>> testimonial Slider Start <<//
    const testimonialSlide = new Swiper(".testimonial-slide", {
        spaceBetween: 0,
        speed: 1000,
        loop: "true",
        slidesPerView: 1,
        centeredSlides: true,
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
    });


    //>> testimonial Slider 2 Start <<//
    const testimonialSlide2 = new Swiper(".testimonial-slide2", {
        spaceBetween: 30,
        speed: 1000,
        loop: "true",
        autoplay: "false",
        speed: 1000,
        navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
        breakpoints: {
            475: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 2,
            },
            1399: {
                slidesPerView: 3,
            },
        },
    });

    //>> testimonial Slider 3 Start <<//
    const testimonialSlide3 = new Swiper(".testimonial-slide3", {
        spaceBetween: 30,
        speed: 1000,
        loop: "true",
        autoplay: "true",
        slidesPerView: 1,
        centeredSlides: true,
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
    });


    // Developer Testimonial Slider
    if ($('.developer-testimonial__slider').length) {
        var testimonial_slider = new Swiper(".developer-testimonial__slider", {
            spaceBetween: 30,
            speed: 1000,
            loop: "true",
            autoplay: "true",
            slidesPerView: 1,
            centeredSlides: true,
            speed: 1000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
        });
    }

    if ($('.news-slide').length > 0) {
        const newsSlide = new Swiper(".news-slide", {
            spaceBetween: 40,
            speed: 1000,
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            pagination: {
                el: ".dot",
                clickable: true,
            },
            breakpoints: {
                1699: {
                    slidesPerView: 3.6,
                },
                1599: {
                    slidesPerView: 3.6,
                },
                1399: {
                    slidesPerView: 3.6,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    // work slider 
    if ('.portfolio-slider-active') {
        var portfolio_slider_active = new Swiper(".portfolio-slider-active", {
            loop: true,
            autoplay: true,
            spaceBetween: 50,
            speed: 6000,
            autoplay: {
                delay: 0,
            },
            breakpoints: {
                475: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2.5,
                },
                1299: {
                    slidesPerView: 3,
                },
                1440: {
                    slidesPerView: 3.5,
                },
            },
        });
    }

    // work2 slider 
    if ('.work2-slider-active') {
        var work2_slider_active = new Swiper(".work2-slider-active", {
            spaceBetween: 30,
            loop: true,
            autoplay: false,
            speed: 4000,
            breakpoints: {
                475: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1.5,
                },
                1299: {
                    slidesPerView: 2.1,
                },
            },
        });
    }

    //>> Text Slider Start <<//
    if ($('.text-slider').length > 0) {
        const textSlider = new Swiper(".text-slider", {
            slidesPerView: 2.2,
            spaceBetween: 202,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 6000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: true,
            },
        });
    }

    //>> Text Slider Start <<//
    if ($('.text-slider2').length > 0) {
        const textSlider2 = new Swiper(".text-slider2", {
            slidesPerView: 1.5,
            spaceBetween: 280,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 10000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: true,
            },
        });
    }

    //>>blog-post-slider Start <<//
    if ($('.blog-post-slider').length > 0) {
        const textSlider = new Swiper(".blog-post-slider", {
            slidesPerView: 'auto',
            spaceBetween: 35,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 2000,
            allowTouchMove: false,
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: true,
            },
        });
    }


    function loader() {
        $(window).on('load', function () {
            // Animate loader off screen
            $(".preloader").addClass('loaded');
            $(".preloader").delay(600).fadeOut();



            $(".scroll-up").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0,
                },
                    900
                );
                return false;
            });
        });
    }
    loader();

})(jQuery); // End jQuery




