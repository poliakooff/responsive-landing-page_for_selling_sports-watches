$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 300,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="carousel__prev"><img src="icons/prev_arrow.png"></button>',
        nextArrow: '<button type="button" class="carousel__next"><img src=" icons/next_arrow.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    asNavFor: false,
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active')
    });
    $('a.card-catalog__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $(this)
                .toggleClass('card-catalog__link_active')
            if ($('.card-catalog__link').eq(i).hasClass('card-catalog__link_active')) {
                $('.card-catalog__content')
                    .eq(i).removeClass('card-catalog__content_active')
                $('.card-catalog__list')
                    .eq(i).addClass('card-catalog__list_active')
            } else {
                $('.card-catalog__content')
                    .eq(i).addClass('card-catalog__content_active')
                $('.card-catalog__list')
                    .eq(i).removeClass('card-catalog__list_active')
            }
        });
    });

    // Modal
    $('.modal__close').on('click', function () {
        $('.overlay, #sent, #consultation, #order').fadeOut();
    })
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });

    //Buy from catalog
    $('[data-modal=order]').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.card-catalog__suptitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    //Forms validate
    valideForms("#consultation form")
    valideForms("#order form")
    valideForms("#consultation-form")

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: {
                    required: true,
                    minlength: 9
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Пожалуйста, введите свое имя',
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    minlength: jQuery.validator.format("Необходимо ввести {0} цифр!")
                },
                email: {
                    required: 'Пожалуйста, введите свою почту',
                    email: 'Неправильно введен адрес почты'
                }
            }
        });
    }

    // jQuery Masked Input
    $('input[name=phone]').mask('+380 (99) 999-99-99');

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #sent').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();

        } else {
            $('.pageup').fadeOut();
        }

    });

    new WOW().init();
});