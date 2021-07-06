/*

*/

jQuery(function ($) {
  'use strict'

  /* ======= Preloader ======= */
  ;(function () {
    $('#status').fadeOut()
    $('#preloader').delay(200).fadeOut('slow')
  })()

  /* === jQuery for page scrolling feature - requires jQuery Easing plugin === */
  ;(function () {
    $('a.scroll').on('click', function (event) {
      var $anchor = $(this)
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr('href')).offset().top
          },
          1500,
          'easeInOutExpo'
        )
      event.preventDefault()
    })
  })()

  /* ======= Full Screen BG ======= */
  ;(function () {
    $('.full-height').height($(window).height())
    $(window).resize(function () {
      $('.full-height').height($(window).height())
    })
  })()

  /* ======= Countdown ======= */
  ;(function () {
    $('#countdown').countdown({
      date: '10 Jul 2021 19:02:00',
      format: 'on'
    })
  })()

  /* === Progress Bar === */
  ;(function () {
    $('.progress').on(
      'inview',
      function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
          $.each($('div.progress-bar'), function () {
            $(this).css('width', $(this).attr('aria-valuenow') + '%')
          })
          $(this).off('inview')
        }
      }
    )
  })()

  /* === Mail Chimp subscription form settings === */
  ;(function () {
    $('.mailchimp').ajaxChimp({
      callback: mailchimpCallback,
      //replace bellow url with your own mailchimp form post url inside the url: "---".
      //to learn how to get your own URL, please check documentation file.
      url: 'http://trendytheme.us9.list-manage.com/subscribe/post?u=85ba3666ffb519396fbe64dc5&amp;id=6a5ead803c'
    })
    function mailchimpCallback(resp) {
      if (resp.result === 'success') {
        $('.subscription-success')
          .html('<i class="fa fa-check"></i>' + resp.msg)
          .fadeIn(1000)
        $('.subscription-error').fadeOut(500)
      } else if (resp.result === 'error') {
        $('.subscription-error')
          .html('<i class="fa fa-times"></i>' + resp.msg)
          .fadeIn(1000)
      }
    }
  })()

  /* ======= Contact Form ======= */
  ;(function () {
    $('#contactForm').on('submit', function (e) {
      e.preventDefault()
      var $action = $(this).prop('action')
      var $data = $(this).serialize()
      var $this = $(this)

      $this.prevAll('.alert').remove()

      $.post(
        $action,
        $data,
        function (data) {
          if (data.response == 'error') {
            $this.before(
              '<div class="alert alert-danger">' + data.message + '</div>'
            )
          }
          if (data.response == 'success') {
            $this.before(
              '<div class="alert alert-success">' + data.message + '</div>'
            )
            $this.find('input, textarea').val('')
          }
        },
        'json'
      )
    })
  })()
}) // JQuery end
