jQuery ->


  $('.intro-button').click (event) ->
    event.preventDefault()
    $('html, body').animate(
      scrollTop: $('#intro').offset().top, 500
    )

  $('.continue-button').click (event) ->
    event.preventDefault()
    $('html, body').animate(
      scrollTop: $('#projects').offset().top, 500
    )

  $('.projects-button').click (event) ->
    event.preventDefault()
    $('html, body').animate(
      scrollTop: $('#projects').offset().top, 500
    )

  $('.about_me-button').click (event) ->
    event.preventDefault()
    $('html, body').animate(
      scrollTop: $('#about_me').offset().top, 500
    )

  $('.contact-button').click (event) ->
    event.preventDefault()
    $('html, body').animate(
      scrollTop: $('#contact').offset().top, 500
    )