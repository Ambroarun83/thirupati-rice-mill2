/* ==========================================================================
   Thirupati Rice Mill — Karur
   Interactions: preloader, sticky header, mobile nav, scroll reveals,
   counters, parallax, process rail, floating actions, demo-link toast.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById("preloader");
  function hidePreloader() {
    if (preloader) preloader.classList.add("done");
  }
  window.addEventListener("load", function () {
    setTimeout(hidePreloader, reduceMotion ? 0 : 500);
  });
  // Safety net
  setTimeout(hidePreloader, 3200);

  /* ---------- Sticky header ---------- */
  var header = document.getElementById("siteHeader");
  var waFloat = document.getElementById("waFloat");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 90);
    if (waFloat) waFloat.classList.toggle("show", y > 420);
    if (toTop) toTop.classList.toggle("show", y > 900);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(function () {
        onScroll();
        parallax();
        ticking = false;
      });
    }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var body = document.body;

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    // reset staggered link delays
    var links = mobileNav.querySelectorAll(".m-link");
    for (var i = 0; i < links.length; i++) links[i].style.transitionDelay = "0s";
  }
  function openNav() {
    mobileNav.classList.add("open");
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    var links = mobileNav.querySelectorAll(".m-link");
    for (var i = 0; i < links.length; i++) {
      links[i].style.transitionDelay = (0.06 * i + 0.12) + "s";
    }
  }
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.contains("open") ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Smooth anchor scrolling (with header offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight - 10 : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top < 0 ? 0 : top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Parallax (The Mill + quality band) ---------- */
  var millBg = document.getElementById("millBg");
  var millSection = document.querySelector(".mill");
  function parallax() {
    if (reduceMotion || !millBg || !millSection) return;
    var rect = millSection.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
    var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    var shift = (progress - 0.5) * 120; // px
    millBg.style.transform = "translate3d(0," + shift.toFixed(2) + "px,0)";
  }
  parallax();

  /* ---------- Process rail trigger ---------- */
  var rail = document.getElementById("processRail");
  if (rail && "IntersectionObserver" in window) {
    var railObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          rail.classList.add("in-view");
          railObserver.unobserve(rail);
        }
      });
    }, { threshold: 0.25 });
    railObserver.observe(rail);
  } else if (rail) {
    rail.classList.add("in-view");
  }

  /* ---------- Ticker: guarantee a seamless loop ---------- */
  var track = document.getElementById("tickerTrack");
  if (track && track.children.length < 2) {
    track.appendChild(track.children[0].cloneNode(true));
  }

  /* ---------- Floating actions ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Demo links (pages not part of this demo) ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2800);
  }
  document.querySelectorAll("[data-demo]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var label = el.getAttribute("data-demo");
      showToast("“" + label + "” is a placeholder in this demo site.");
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (lb && lbItems.length) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lightbox-cap");
    var lbIndex = 0;

    var openAt = function (i) {
      lbIndex = (i + lbItems.length) % lbItems.length;
      var item = lbItems[lbIndex];
      var img = item.querySelector("img");
      var full = img.getAttribute("data-full") || img.getAttribute("src");
      lbImg.setAttribute("src", full);
      lbImg.setAttribute("alt", img.getAttribute("alt") || "");
      lbCap.textContent = item.getAttribute("data-caption") || "";
      lb.classList.add("open");
      document.body.classList.add("nav-open");
    };
    var closeLb = function () {
      lb.classList.remove("open");
      document.body.classList.remove("nav-open");
    };

    lbItems.forEach(function (item, i) {
      item.addEventListener("click", function () { openAt(i); });
    });
    lb.querySelectorAll("[data-lb]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var action = btn.getAttribute("data-lb");
        if (action === "close") closeLb();
        if (action === "next") openAt(lbIndex + 1);
        if (action === "prev") openAt(lbIndex - 1);
      });
    });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") openAt(lbIndex + 1);
      if (e.key === "ArrowLeft") openAt(lbIndex - 1);
    });
  }

  /* ---------- Enquiry form (all pages use the same handler) ---------- */
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var digits = phone ? phone.value.replace(/\D/g, "") : "";

      if (!name || name.value.trim().length < 2) {
        showToast("Please enter your name.");
        if (name) name.focus();
        return;
      }
      if (digits.length < 10) {
        showToast("Please enter a valid 10-digit mobile number.");
        if (phone) phone.focus();
        return;
      }

      var variety = form.querySelector('[name="variety"]');
      var qty = form.querySelector('[name="quantity"]');
      var city = form.querySelector('[name="city"]');
      var msg = form.querySelector('[name="message"]');
      var lines = [
        "Hello Thirupati Rice Mill, I would like to enquire about rice.",
        "Name: " + name.value.trim(),
        "Mobile: " + phone.value.trim()
      ];
      if (city && city.value.trim()) lines.push("City / Town: " + city.value.trim());
      if (variety && variety.value) lines.push("Variety: " + variety.value);
      if (qty && qty.value.trim()) lines.push("Quantity: " + qty.value.trim());
      if (msg && msg.value.trim()) lines.push("Note: " + msg.value.trim());

      var url = "https://wa.me/919876543210?text=" + encodeURIComponent(lines.join("\n"));
      try { window.open(url, "_blank", "noopener"); } catch (err) { /* preview sandbox */ }

      showToast("Thank you, " + name.value.trim().split(" ")[0] + " — your enquiry is ready to send on WhatsApp.");
      form.reset();
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Newsletter form feedback ---------- */
  document.querySelectorAll(".footer-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      if (input && input.value.trim().length < 6) {
        showToast("Please enter a valid mobile number.");
        return;
      }
      showToast("Thank you — this demo form does not submit data.");
      if (input) input.value = "";
    });
  });

  /* ---------- Subtle hero image drift on pointer move ---------- */
  var heroImg = document.querySelector(".hero-media img");
  var hero = document.querySelector(".hero");
  if (hero && heroImg && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 14;
      var y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroImg.style.transform = "scale(1.06) translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    });
  }
})();
