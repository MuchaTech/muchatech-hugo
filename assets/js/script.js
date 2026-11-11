"use strict";

jQuery(function ($) {
  const lazyImages = document.querySelectorAll(".lozad");
  if (lazyImages.length && typeof window.lozad === "function") {
    window.lozad().observe();
  }

  const popupImages = $(".image-popup");
  if (popupImages.length && $.fn.magnificPopup) {
    popupImages.magnificPopup({
      type: "image",
      removalDelay: 160,
      callbacks: {
        beforeOpen: function () {
          this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim");
          this.st.mainClass = this.st.el.attr("data-effect");
        },
      },
      closeOnContentClick: true,
      midClick: true,
      fixedContentPos: false,
      fixedBgPos: true,
    });
  }

  const portfolio = document.querySelector(".shuffle-wrapper");
  if (portfolio && window.Shuffle) {
    const shuffle = new window.Shuffle(portfolio, {
      itemSelector: ".shuffle-item",
      buffer: 1,
    });

    document.querySelectorAll('input[name="shuffle-filter"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
          shuffle.filter(event.currentTarget.value);
        }
      });
    });
  }

  const testimonials = $("#testimonials");
  if (testimonials.length && $.fn.slick) {
    testimonials.slick({
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  }

  const counters = $(".count");
  if (!counters.length) {
    return;
  }

  let countersStarted = false;
  const startCounters = () => {
    if (countersStarted || window.scrollY + window.innerHeight < counters.first().offset().top) {
      return;
    }

    countersStarted = true;
    window.removeEventListener("scroll", startCounters);
    counters.each(function () {
      const counter = $(this);
      const target = Number(counter.attr("data-count"));
      $({ value: Number(counter.text()) }).animate(
        { value: target },
        {
          duration: 1000,
          step() {
            counter.text(Math.floor(this.value));
          },
          complete() {
            counter.text(target);
          },
        }
      );
    });
  };

  window.addEventListener("scroll", startCounters, { passive: true });
  startCounters();
});
