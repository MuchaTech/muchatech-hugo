"use strict";

(() => {
  const $ = window.jQuery;
  const contactForm = document.getElementById("contact-form");
  const contactToast = document.getElementById("contact-toast");
  const contactToastTitle = document.getElementById("contact-toast-title");
  const contactToastMessage = document.getElementById("contact-toast-message");
  const contactToastInstance = contactToast ? $(contactToast) : null;
  let contactToastTimer;

  if (contactToastInstance) {
    contactToastInstance.toast({ autohide: false });
  }

  const showContactToast = (title, message, state, hideAfter) => {
    if (!contactToast || !contactToastInstance || !contactToastTitle || !contactToastMessage) {
      return;
    }

    window.clearTimeout(contactToastTimer);
    contactToast.classList.remove("contact-toast--info", "contact-toast--success", "contact-toast--error");
    contactToast.classList.add(`contact-toast--${state}`);
    contactToast.setAttribute("role", state === "error" ? "alert" : "status");
    contactToast.setAttribute("aria-live", state === "error" ? "assertive" : "polite");
    contactToastTitle.textContent = title;
    contactToastMessage.textContent = message;
    contactToastInstance.toast("show");

    if (hideAfter) {
      contactToastTimer = window.setTimeout(() => contactToastInstance.toast("hide"), hideAfter);
    }
  };

  if (contactForm && contactToastInstance) {
    const submitButton = contactForm.querySelector("button[type='submit']");
    const submitLabel = submitButton?.textContent;

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showContactToast("Sending message", "Please wait while we send your message.", "info");
      contactForm.setAttribute("aria-busy", "true");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Contact form request failed with status ${response.status}`);
        }

        showContactToast("Message sent", "Thank you for contacting MuchaTech. We’ll be in touch soon.", "success", 8000);
        contactForm.reset();
      } catch (error) {
        console.error("Contact form submission failed:", error);
        showContactToast("Message not sent", "We couldn't send your message. Please try again or contact us by email.", "error", 10000);
      } finally {
        contactForm.removeAttribute("aria-busy");
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitLabel;
        }
      }
    });
  }

  if (contactForm && window.location.hash === "#contact") {
    const firstContactField = contactForm.querySelector("input:not([type='hidden']), select, textarea, button");
    window.addEventListener("pageshow", () => {
      firstContactField?.focus({ preventScroll: true });
    }, { once: true });
  }

  document.querySelectorAll("[data-endpoint-preview]").forEach((preview) => {
    const tabs = [...preview.querySelectorAll("[data-endpoint-tab]")];
    const panels = [...preview.querySelectorAll("[data-endpoint-panel]")];

    const activateTab = (tab) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.endpointPanel !== tab.dataset.endpointTab;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          return;
        }

        event.preventDefault();
        const nextIndex = event.key === "Home" ? 0
          : event.key === "End" ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });
  });

  const navigationMenu = document.getElementById("navigation");
  const navigationToggle = document.querySelector(".navbar-toggler");
  if (navigationMenu) {
    navigationMenu.addEventListener("click", (event) => {
      const link = event.target.closest("a.nav-link:not(.dropdown-toggle), a.dropdown-item");
      if (!link) {
        return;
      }

      if (event.detail > 0) {
        link.blur();
      }
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        $(navigationMenu).collapse("hide");
      } else if (link.matches("a.dropdown-item")) {
        $(link.closest(".dropdown").querySelector(".dropdown-toggle")).dropdown("hide");
      }
    }, true);

    navigationMenu.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigationMenu.classList.contains("show")) {
        $(navigationMenu).collapse("hide");
        navigationToggle?.focus();
      }
    });
  }

  const scrollLinks = $("nav a, .page-scroll");
  scrollLinks.off("click").on("click", function (event) {
    if (
      location.pathname.replace(/^\//, "") !== this.pathname.replace(/^\//, "") ||
      location.hostname !== this.hostname
    ) {
      return;
    }

    const targetId = this.hash.slice(1);
    const target = targetId && document.getElementById(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    const navigationHeight = document.querySelector(".navigation")?.offsetHeight ?? 50;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650;
    $("html, body").stop().animate({
      scrollTop: Math.max($(target).offset().top - navigationHeight - 12, 0),
    }, duration);
  });

  const testimonials = $("#testimonials");
  if (testimonials.hasClass("slick-initialized")) {
    testimonials.slick("slickSetOption", {
      autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      autoplaySpeed: 6000,
      dots: true,
      pauseOnFocus: true,
      pauseOnHover: true,
      customPaging: (slider, index) => `<button type="button" aria-label="Show testimonial ${index + 1}">${index + 1}</button>`,
    }, true);
  }

  const cookieBox = document.getElementById("js-cookie-box");
  const cookieButton = document.getElementById("js-cookie-button");
  if (cookieBox && cookieButton && window.Cookies && !window.Cookies.get("cookie-box")) {
    const expireDays = Number(cookieBox.dataset.expireDays);
    cookieBox.classList.remove("cookie-box-hide");
    cookieButton.addEventListener("click", () => {
      window.Cookies.set("cookie-box", true, { expires: expireDays });
      cookieBox.classList.add("cookie-box-hide");
    });
  }
})();
