$(document).ready(function () {
  // подключение карусели (section class="carousel")
  $('.carousel__inner').slick({
    // dots: true, если нужны внизу точки то устанавливаем это свойство
    // infinite: true,
    speed: 1200,
    // slidesToShow: 1, если нужно показывать 1 слайдр то это св-во прописывать нербязательно
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
          variableWidth: false, /* Отключаем variableWidth */
          // adaptiveHeight: true,
          slidesToShow: 1
        }
      }
    ]
    // чтобы слайд переключадся автоматически подключаем свойства autoplay и autoplaySpeed
    // autoplay: true,
    // autoplaySpeed: 2000
  });

  //  подключение табов (section class="catalog")

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // переключение внутри карточки (section class="catalog" --> <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a> и <a href="#" class="catalog-item__back">назад</a>)
  // $('.catalog-item__link').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // });

  // $('.catalog-item__back').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal

  // открытие модального окна для получения консультации или получении звонка
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  // открытие модального окна при заказе товара и замены подзаголовка на нужный
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());/* замены подзаголовка на нужный */
      $('.overlay, #order').fadeIn('slow');/* открытие модального окна  */
    })
  });

  // закрытие подложки и всех модальных окон
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  // $('.button__submit').on('click', function () {
  //   $('.overlay, #thanks').fadeIn('slow');
  // });

  // валидация форм

  function valideForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите имя",
          minlength: jQuery.validator.format("Введите ни менее {0} символа!")
        },
        phone: "Пожалуйста, введите номер телефона",
        email: {
          required: "Пожалуйста, введите адрес почты",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  valideForm('#consultation-form');
  valideForm('#consultation form');
  valideForm('#order form');

  // mask for tel  при подключении mask  нуно убрать type: tel или number в свойствах формы для телефона(html)

  $('input[name=phone]').mask('(+41) 999-999-999');

  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');

      $('form').trigger('reset');
    });
    return false;
  });
});