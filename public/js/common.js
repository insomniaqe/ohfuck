/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();


/**
 * Анонимная самовызывающаяся функция-обертка
 * @param {document} d - получает документ
 */
!function(d) {

	"use strict";

	/**
	 * Полифилл для Object.assign()
	 */
	Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,r){"use strict";if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var a=Object.keys(Object(o)),c=0,b=a.length;c<b;c++){var i=a[c],l=Object.getOwnPropertyDescriptor(o,i);void 0!==l&&l.enumerable&&(t[i]=o[i])}}return t}});


	/**
	 * Главный объект
	 */
	var lazy = {};


	/**
	 * Функция проверки нахождения элемента во viewport
	 * @param {Object} el - элемент DOM
	 */
	lazy.isVisible = function(el) {
		var coords = el.getBoundingClientRect();
		return (coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || d.documentElement.clientHeight);
	};

	/**
	 * Функция загрузки элемента
	 * @param {Event|Object} e - событие получаемое при click/hover или элемент, если используется "view"
	 * @param {Function|false} [callback] - функция, выполняемая после загрузки элемента
	 */
	lazy.get = function(e, callback) {
		var item = e.target || e;
		var event = e.type || false;
		if (event) item.removeEventListener(event, lazy.get); // удаление обработчика события
		if (!item.src) { // проверка элемента на наличие атрибута src
			console.error("lazy-load не поддерживается для этого элемента (" + item.tagName + ")");
			return;
		}
		if (!item.hasAttribute("data-js-loaded")) {
			var src = item.getAttribute("data-src");
			if (src) { // если атрибут data-source присутствует
				item.src = src;
				item.setAttribute("data-js-loaded", "");
				item.removeAttribute("data-src");
				item.onerror = function() { // обработка ошибок загрузки
					console.error("загрузка источника не удалась (элемент: " + item.tagName + ", путь: " + item.src + ")");
				};
				setTimeout(function() { // удаление обработчика ошибок
					item.onerror = null;
				}, 3000);
			} else console.error("отсутствует оригинальный источник (элемент: " + item.tagName + ", путь: " + item.src + ")");
			if (callback) callback(item); // вызов callback, если необходимо
		}
	};




	/**
	 * Функция инициализации lazy-load
	 * @param {Object} settings - объект с предварительными настройками
	 */
	lazy.init = function(settings) {

		// настройки по умолчанию
		settings = Object.assign({}, {
			items:    "[data-src]", // селектор элементов lazy-load
			on:       "click",         // click, view, hover
			callback: false,           // функция, вызываемая после загрузки источника
		}, settings);

		// поиск всех lazy-элементов
		var els = d.querySelectorAll(settings.items);


		// обработчики событий
		if (settings.on === "view") { // для события с условным наимнованием "view"
			var onviewLoad = function() {
				Array.prototype.slice.call(els, 0).forEach(function(el) {
					if (lazy.isVisible(el)) lazy.get(el, settings.callback); // проверка на видимость во viewport, lazy.get() принимает элемент
				});
			};

			// обработка событий для "view"
			window.addEventListener("scroll", onviewLoad);
			window.addEventListener("resize", onviewLoad);
            document.addEventListener("DOMContentLoaded", onviewLoad);
            if (screen.msOrientation || (screen.orientation || screen.mozOrientation || { type: false }).type) 
                window.addEventListener("orientationchange", onviewLoad);
        } else { // обработка событий "hover" и "click"
            var eventName = (settings.on === "hover") ? "mouseover" : settings.on;
            Array.prototype.slice.call(els, 0).forEach(function(el) {
				el.addEventListener(eventName, function(e) {
				  lazy.get(e, settings.callback);
				}); // lazy.get() принимает событие
			});
		}
	};

	window.lazy = lazy;

}(document);

// инициализация lazy load
lazy.init({
    on: "view", // при попадании во viewport
    callback: function(el) { // функция при загрузке
        el.classList.add("loading");
        el.onload = function() {
            el.classList.remove("loading");
            el.classList.add("loaded");
            el.onload = null;
        }
    }
});

$(function() {
    objectFitImages(); // активация полифилла для img object-fit

    var progressRing = `
        <svg
        class="progress-ring"
        width="20"
        height="20">
        <circle
            class="progress-ring__circle slider-circle"
            stroke-width="2"
            fill="transparent"
            r="5"
            cx="10"
            cy="10"/>
        <circle 
            class="progress-ring__bullet"
            r="2"
            cx="10"
            cy="10"/>
        </svg>`;

    var progressRingAutoplay = `
        <svg
        class="progress-ring"
        width="20"
        height="20">
        <circle
            class="progress-ring__circle slider-circle slider-circle__autoplay"
            stroke-width="2"
            fill="transparent"
            r="5"
            cx="10"
            cy="10"/>
        <circle 
            class="progress-ring__bullet"
            r="2"
            cx="10"
            cy="10"/>
        </svg>`;

    var autoplayDelay = 5000;

    function searchHints(inputValue, index, searchArray){
        let inputRegExp = new RegExp(inputValue, 'i'), // создаём регулярное выражение из введённого пользователем значения
            errorMessage = 'Ничего не найдено';
        if(index != searchArray.length && inputValue.length != 0){ // проверяем, не вышли ли мы за пределы массива и заполнена ли строка поиска
            let result = searchArray[index].search(inputRegExp);
            if (result == 0){ // индекс первого вхождения регулярного выражения должен быть 0
                $('.hints_wrapper').append('<div class="hint">'+ searchArray[index] +'</div>');
            }
            index++;
            setTimeout(searchHints(inputValue, index, searchArray), 0); // рекурсивный вызов
        } else {
            if($('.hints_wrapper').is(':empty')){
                $('.hints_wrapper').append('<div class="hint">'+ errorMessage +'</div>');
            }
        }
    }

    
    function initializePhotosSlider () {
        var productPhotosSlidersCollection = document.querySelectorAll('.product-photos__slider'),
            photosPaginationsCollection = document.querySelectorAll('.product-photos__pagination'),
            slidersArray = [];
        productPhotosSlidersCollection.forEach(function(element, index){
            slidersArray[index] = new Swiper(element, {
                navigation: {
                    nextEl: '.product-photos__button--next-' + index,
                    prevEl: '.product-photos__button--prev-' + index,
                },
                nested: true,
                thumbs: {
                    swiper: {
                        el: photosPaginationsCollection[index],
                        navigation: {
                            nextEl: '.product-photos__pagination-button--next-' + index,
                            prevEl: '.product-photos__pagination-button--prev-' + index,
                        },
                        nested: true,
                        slidesPerView: 4,
                        spaceBetween: 15,
                        breakpoints: {
                            1199.98: {
                                spaceBetween: 10,
                            },
                            424.98: {
                                slidesPerView: 3,
                            }
                        }
                    }
                },
            });
        });
    }

    function setProgress(circle, circumference, percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function initDiscountTimer () {
        var $timerRing = $('.discount-timer__circle');
        $timerRing.each(function(){
            var total = $(this).attr('data-total'),
                left = $(this).attr('data-left');
            animateProgress(this, 300, left / total * 100);
        });
    }

    function animate(options) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            const done = options.done || function() {};
            let timeFraction = (time - start) / options.duration;
            if (timeFraction > 1)
                timeFraction = 1;
            const progress = options.timing(timeFraction)
            options.draw(progress);
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                done();
            }
        });
    }
    const linear = (timeFraction) => timeFraction;

    function animateProgress (circle, duration, maxPercent) {
        var radius = circle.r.baseVal.value;
        var circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
        animate({
            duration: duration,
            timing: linear,
            draw: function(progress) {
                setProgress(circle, circumference, progress * maxPercent);
            },
        });
    }

    $(document).ready(function () {
        // отключение кеширования оригинальных картинок
        var images = document.querySelectorAll("[data-src]");
        images.forEach(function(el) {
            var source = el.getAttribute("data-src");
            el.setAttribute("data-src", source + "?" + Math.random());
        });
        // конец инициализации lazy load

        // инициализация всех слайдеров
        try {
            var bannersSlider = new Swiper('.banners-slider__container', {
                navigation: {
                    nextEl: '.banners-slider__button--next',
                    prevEl: '.banners-slider__button--prev',
                },
                pagination: {
                    el: '.banners-slider__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRingAutoplay}
                    </span>`;
                    }
                },
                autoplay: {
                    delay: autoplayDelay,
                },
                on: {
                    slideChange: function () {
                        animateProgress($('.banners-slider__pagination .slider-circle')[this.activeIndex], autoplayDelay, 100);
                    }
                },
            });
            animateProgress($('.banners-slider__pagination .slider-circle')[0], autoplayDelay, 100); // ставил обработчиком события Swiper.init, но к моменту запуска события пагинация не проинициализирована
        } catch (error) {
            console.error(error);
        }

        try {
            var bestOfferSlider = new Swiper('.best-offer__slider', {
                navigation: {
                    nextEl: '.best-offer__button--next',
                    prevEl: '.best-offer__button--prev',
                },
                pagination: {
                    el: '.best-offer__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRingAutoplay}
                    </span>`;
                    }
                },
                slidesPerView: 4,
                spaceBetween: 30,
                autoplay: {
                    delay: autoplayDelay,
                },
                breakpoints: {
                    1199.98: {
                        spaceBetween: 15,
                    },
                    991.98: {
                        slidesPerView: 2,
                    },
                    767.98: {
                        slidesPerView: 1,
                    }
                },
                on: {
                    slideChange: function () {
                        animateProgress($('.best-offer__pagination .slider-circle')[this.activeIndex], autoplayDelay, 100);
                    }
                },
            });
            animateProgress($('.best-offer__pagination .slider-circle')[0], autoplayDelay, 100); // ставил обработчиком события Swiper.init, но к моменту запуска события пагинация не проинициализирована
        } catch (error) {
            console.error(error);
        }

        try {
            var productPreview = new Swiper('.product-slider__slider', {
                navigation: {
                    nextEl: '.product-slider__button--next',
                    prevEl: '.product-slider__button--prev',
                }
            });
        } catch (error) {
            console.error(error);
        }

        try {
            var reviewsPreview = new Swiper('.reviews-preview__slider', {
                navigation: {
                    nextEl: '.reviews-preview__button--next',
                    prevEl: '.reviews-preview__button--prev',
                },
                pagination: {
                    el: '.reviews-preview__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRing}
                    </span>`;
                    }
                },
            });
        } catch (error) {
            console.error(error);
        }

        try {
            var certificatesSlider = new Swiper('.certificates__slider', {
                navigation: {
                    nextEl: '.certificates__button--next',
                    prevEl: '.certificates__button--prev',
                },
                pagination: {
                    el: '.certificates__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRing}
                    </span>`;
                    },
                },
                breakpoints: {
                    991.98: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    424.98: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }

        try {
            initializePhotosSlider();
        } catch (error) {
            console.error(error);
        }

        try {
            var guaranteesSlider = new Swiper('.guarantees__slider', {
                navigation: {
                    nextEl: '.guarantees__button--next',
                    prevEl: '.guarantees__button--prev',
                },
                pagination: {
                    el: '.guarantees__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRing}
                    </span>`;
                    },
                },
                slidesPerView: 4,
                spaceBetween: 30,
                breakpoints: {
                    991.98: {
                        slidesPerView: 3,
                    },
                    424.98: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }

        try {
            var partnersSlider = new Swiper('.partners__slider', {
                navigation: {
                    nextEl: '.partners__button--next',
                    prevEl: '.partners__button--prev',
                },
                pagination: {
                    el: '.partners__pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `
                    <span class="${className}">
                        ${progressRing}
                    </span>`;
                    },
                },
                slidesPerView: 4,
                breakpoints: {
                    991.98: {
                        slidesPerView: 3,
                    },
                    424.98: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }

        try {
            initializePhotosSlider();
        } catch (error) {
            console.error(error);
        }
        // конец инициализации слайдеров

        initDiscountTimer();

        $('.form__select').selectric();

        $('.btn--header-search').click(function () {
            var $form = $(this).parents('.form');
            if($(window).width() < 992) {
                if(!$form.hasClass('active')) {
                    $form.addClass('active');
                    return false;
                }
            }
            return true;
        });

        $(':not(.header__search)').click(function (e) {
            if(!$(e.target).parents('.header__search')[0]) {
                $('.header__search').removeClass('active');
            }
        });

        $('.btn--menu-open').click(function () {
            var $mnu = $('.mnu');
            if(!$mnu.is('.active')) {
                $('body').addClass('modal-open');
                $mnu.show();
                setTimeout(function () {
                    $mnu.addClass('active');
                }, 0);

            } else {
                $('body').removeClass('modal-open');
                $mnu.removeClass('active');
                setTimeout(function () {
                    $mnu.hide();
                }, 300);
            }
        });

        $(window).scroll(function () {
            if($(this).scrollTop() >= 100) {
                $('body').addClass('sticky-top');
            } else {
                $('body').removeClass('sticky-top');
            }
        });

        $('.open-new-modal').click(function () {
            var target = $(this).attr('data-target');
            $('.modal').modal('hide');
            setTimeout(function () {
                $(target).modal('show');
            }, 300);
        });

        $('.checkout__next').click(function () {
            var $activeScreen = $('.checkout__screen.active'),
                $nextScreen = $activeScreen.next();
            if(!$activeScreen.is(':last-child')) {
                $activeScreen.removeClass('active');
                $nextScreen.addClass('active');

                if($nextScreen.is('.final')) {
                    $('.checkout__buttons-wrapper').hide();
                }
                if($activeScreen.is('.contacts')) {
                    $('#smsConfirm').modal('show');
                }
            }
        });

        $('.checkout__prev').click(function () {
            var $activeScreen = $('.checkout__screen.active'),
                $prevScreen = $activeScreen.prev();
            if(!$activeScreen.is(':first-child')) {
                $activeScreen.removeClass('active');
                $prevScreen.addClass('active');
            }
        });

        $('.checkout .btn--sms-confirm').click(function () {
            $('.checkout__next').trigger('click');
        });

        $('.editable').click(function (e) {
            if($(e.target).is('.editable')) {
                $(this).addClass('active');
            }
        });

        $('.edit-btn').click(function () {
            var value = $(this).siblings('input').val();
            $(this).siblings('span').text(value);
            $(this).parents('.editable').removeClass('active');
        });

        $('.mnu__link--categories span').click(function () {
            $(this).toggleClass('active');
            $('.mnu__categories').toggleClass('active')
        });

        $('.models-catalog__toggle').change(function(){
            $('.models-catalog__screen').removeClass('active');
            $('.models-catalog__screen.' + $(this).val()).addClass('active');
        });

        $('.hints-select__input').focus(function () {
            var $input = $(this),
                $dropdown = $input.siblings('.hints-select__dropdown');

            $('.hints-select__input').removeClass('open');
            $('.hints-select__dropdown').removeClass('open');

            $input.addClass('open');
            $dropdown.addClass('open');

            $(':not(.hints-select__item)').on('click', function (e) {
                var $target = $(e.target);
                if(!$target.hasClass('.hints-select') && !$target.parents('.hints-select')[0]) {
                    $input.removeClass('open');
                    $dropdown.removeClass('open');
                }
            });
        });

        $('.hints-select__input').keypress(function () {
            if($(this).val() != '') {
                $(this).siblings('.hints-select__close').addClass('active');
            }
        });
        
        $('.hints-select__item').click(function () {
            var $input = $('.hints-select__input.open'),
                $this = $(this);
            $('.hints-select__input.open').val($this.text());
            $input.removeClass('open');
            $this.parents('.hints-select__dropdown').removeClass('open');
            $input.siblings('.hints-select__close').addClass('active');
        });

        $('.hints-select__close').click(function () {
            var $this = $(this),
                $input = $this.siblings('.hints-select__input'),
                $dropdown = $input.siblings('.hints-select__dropdown');
            $input.val('');
            $input.addClass('open');
            $dropdown.addClass('open');
            $this.removeClass('active');
        });
    });
});