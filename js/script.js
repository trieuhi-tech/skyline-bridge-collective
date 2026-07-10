(function () {
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var updateHeaderState = function () {
      siteHeader.classList.toggle("scrolled", window.scrollY > 20);
    };
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  var revealTargets = document.querySelectorAll(
    ".section-kicker, .section h2, .section-lead, .service-card, .brand-feature, .contact-item"
  );
  if (revealTargets.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach(function (el, i) {
        el.classList.add("reveal");
        el.style.transitionDelay = (i % 4) * 0.08 + "s";
        observer.observe(el);
      });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.add("reveal", "is-visible");
      });
    }
  }

  var hasFinePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasFinePointer) {
    var hero = document.querySelector(".hero");
    if (hero) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        hero.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      });
    }

    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.18 + "px, " + (y * 0.35 - 2) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });

    document.querySelectorAll(".service-card, .brand-feature").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateX(" + (py * -5) + "deg) rotateY(" + (px * 5) + "deg) translateY(-3px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".main-nav a");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  var skylineClose = document.querySelector(".skyline-close");
  if (skylineClose) {
    var updateParallax = function () {
      skylineClose.style.transform = "translateY(" + Math.min(window.scrollY * 0.06, 40) + "px)";
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
  }
})();
