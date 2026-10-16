
(function () {
  "use strict";

  var C = window.CONTENT;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; // only used with built-in icons
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var ICON = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'
  };

  function icon(name) { return h("span", { class: "icon", html: ICON[name] }); }

  function projectUrl(p) { return "project.html?p=" + encodeURIComponent(p.slug); }

  /* Media box: shows a placeholder until the video/image actually loads. */
  function mediaBox(p, opts) {
    var box = h("div", { class: "media" }, [
      h("div", { class: "media-placeholder" }, [
        h("span", { class: "media-placeholder-title", text: p.title })
      ])
    ]);

    if (opts.full && p.youtube) {
      box.appendChild(youtubeFacade(p));
      box.classList.add("ready");
      return box;
    }

    // Poster image sits underneath; the video covers it only once it actually loads.
    if (p.poster) {
      var img = h("img", { class: "poster", src: p.poster, alt: "", loading: "lazy" });
      img.addEventListener("load", function () { box.classList.add("has-poster"); });
      box.appendChild(img);
    }

    var src = opts.full ? p.video : p.preview;
    if (src) {
      var v = h("video", {
        muted: true, playsinline: true, preload: "metadata",
        loop: !opts.full, controls: opts.full,
        "aria-label": p.title + " video"
      });
      v.muted = true;
      v.appendChild(h("source", { src: src, type: "video/mp4" }));
      v.addEventListener("loadeddata", function () { box.classList.add("has-video"); });
      box.appendChild(v);
      if (!opts.full) autoplayWhenVisible(v);
    }
    return box;
  }

  /* Accepts a plain video ID or any YouTube link (youtu.be/…, watch?v=…, shorts/…, embed/…). */
  function youtubeId(value) {
    var m = String(value).match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live)\/)([\w-]{11})/);
    return m ? m[1] : String(value).trim();
  }

  /* YouTube is only contacted after the visitor clicks. */
  function youtubeFacade(p) {
    var btn = h("button", { class: "yt-facade", type: "button", "aria-label": "Play video" }, [
      p.poster ? h("img", { src: p.poster, alt: "" }) : null,
      h("span", { class: "yt-play" }, [icon("play")])
    ]);
    btn.addEventListener("click", function () {
      btn.replaceWith(h("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(youtubeId(p.youtube)) + "?autoplay=1",
        title: p.title, allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
        referrerpolicy: "strict-origin-when-cross-origin", // YouTube needs this, otherwise error 153
        allowfullscreen: true
      }));
    });
    return btn;
  }

  var observer = null;
  function autoplayWhenVisible(video) {
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var pr = e.target.play(); if (pr) pr.catch(function () {}); }
          else e.target.pause();
        });
      }, { threshold: 0.5 });
    }
    observer.observe(video);
  }

  /* ---------- shared pieces ---------- */
  function socialItems(P) {
    var items = [];
    if (P.email) items.push(["mailto:" + P.email, "mail", "Email", P.email]);
    if (P.linkedin) items.push([P.linkedin, "linkedin", "LinkedIn", P.linkedin.replace(/^https?:\/\/(www\.)?/, "")]);
    if (P.github) items.push([P.github, "github", "GitHub", P.github.replace(/^https?:\/\/(www\.)?/, "")]);
    if (P.cv) items.push([P.cv, "file", "CV (PDF)", "Download CV (PDF)"]);
    return items;
  }

  function linkAttrs(url, label) {
    var ext = url.indexOf("http") === 0;
    return {
      href: url, "aria-label": label,
      target: ext ? "_blank" : null, rel: ext ? "noopener" : null,
      download: /\.pdf$/i.test(url) ? true : null
    };
  }

  /* Left column — the same on every page */
  function sidebar() {
    var P = C.profile;
    var initials = P.name.split(" ").map(function (s) { return s[0]; }).join("");
    var avatar = h("a", { class: "avatar", href: "index.html", "aria-label": "Home" }, [h("span", { text: initials })]);
    if (P.photo) {
      var img = h("img", { src: P.photo, alt: P.name });
      img.addEventListener("load", function () { avatar.classList.add("ready"); });
      avatar.appendChild(img);
    }

    var header = h("header", { id: "header" }, [
      h("div", { class: "inner" }, [
        avatar,
        h("h1", null, [h("strong", { text: "I'm " + P.name + "," }), h("br"), P.intro]),
        P.cv ? h("a", { class: "button light", href: P.cv, download: true, text: "Download CV" }) : null
      ]),
      h("div", { id: "footer" }, [
        h("ul", { class: "icons" }, socialItems(P).filter(function (it) { return it[1] !== "file"; }).map(function (it) {
          var a = h("a", linkAttrs(it[0], it[2]), [icon(it[1]), h("span", { class: "tip", text: it[2] })]);
          return h("li", null, [a]);
        })),
        h("p", { class: "copyright", text: "© " + new Date().getFullYear() + " " + P.name })
      ])
    ]);
    if (P.background) {
      header.style.backgroundImage =
        "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)," +
        "linear-gradient(rgba(31,24,21,.55), rgba(31,24,21,.8))," +
        "url('" + P.background + "')";
    }
    return header;
  }

  function mount(mainChildren) {
    var app = document.getElementById("app");
    app.appendChild(sidebar());
    app.appendChild(h("main", { id: "main" }, mainChildren));
  }

  function metaLine(p) {
    var parts = [p.year].concat(p.tags || []).filter(Boolean);
    return parts.length ? h("p", { class: "meta", text: parts.join(" · ") }) : null;
  }

  /* ---------- index.html ---------- */
  function renderIndex() {
    var P = C.profile;
    document.title = P.name + " — " + P.role;

    var two = h("section", { id: "two" }, [
      h("h2", { text: "Recent Work" }),
      h("div", { class: "work" }, C.projects.map(function (p) {
        return h("article", { class: "work-item" }, [
          h("a", { class: "thumb", href: projectUrl(p), "aria-label": p.title }, [mediaBox(p, { full: false })]),
          h("h3", null, [h("a", { href: projectUrl(p), text: p.title })]),
          h("p", { text: p.pitch }),
          metaLine(p)
        ]);
      }))
    ]);

    var contactList = socialItems(P).map(function (it) {
      return h("li", null, [h("span", { class: "label" }, [icon(it[1])]), h("a", linkAttrs(it[0], it[2]), [it[3]])]);
    });
    if (P.location) {
      contactList.unshift(h("li", null, [h("span", { class: "label" }, [icon("pin")]), h("span", { text: P.location })]));
    }

    var three = h("section", { id: "three" }, [
      h("h2", { text: "Contact" }),
      P.openTo ? h("p", { text: "Open to: " + P.openTo }) : null,
      h("ul", { class: "labeled-icons" }, contactList)
    ]);

    mount([two, three]);
  }

  /* ---------- project.html ---------- */
  function renderProject() {
    var slug = new URLSearchParams(location.search).get("p");
    var idx = -1;
    C.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    var back = h("p", { class: "back" }, [h("a", { href: "index.html#two", text: "← All projects" })]);

    if (idx < 0) {
      mount([h("section", null, [back, h("h2", { text: "Project not found" })])]);
      return;
    }

    var p = C.projects[idx];
    document.title = p.title + " — " + C.profile.name;

    var sections = [h("section", null, [
      back,
      h("header", { class: "major" }, [h("h2", { text: p.title })]),
      h("p", { text: p.pitch }),
      metaLine(p),
      mediaBox(p, { full: true }),
      p.facts && p.facts.length ? h("dl", { class: "facts" }, p.facts.map(function (f) {
        return h("div", null, [h("dt", { text: f[0] }), h("dd", { text: f[1] })]);
      })) : null
    ])];

    // Goal + What I built share one section (no divider between them)
    var hasBuilt = p.built && p.built.length;
    if (p.goal || hasBuilt) sections.push(h("section", { class: "overview" }, [
      p.goal ? h("h2", { text: "Goal" }) : null,
      p.goal ? h("p", { text: p.goal }) : null,
      hasBuilt ? h("h2", { text: "What I built" }) : null,
      hasBuilt ? h("ul", { class: "list" }, p.built.map(function (b) { return h("li", { text: b }); })) : null
    ]));
    if (p.challenges && p.challenges.length) sections.push(h("section", null, [
      h("h2", { text: "Challenges & solutions" }),
      h("div", { class: "challenges" }, p.challenges.map(function (c) {
        return h("div", { class: "challenge" }, [h("h3", { text: c[0] }), h("p", { text: c[1] })]);
      }))
    ]));
    if (p.images && p.images.length) sections.push(h("section", null, [
      h("h2", { text: "Screenshots" }),
      h("div", { class: "shots" }, p.images.map(function (src) {
        return h("a", { class: "thumb", href: src, target: "_blank" }, [h("img", { src: src, alt: "", loading: "lazy" })]);
      }))
    ]));
    if (p.links && p.links.length) sections.push(h("section", null, [
      h("ul", { class: "actions" }, p.links.map(function (l) {
        return h("li", null, [h("a", { class: "button", href: l[1], target: "_blank", rel: "noopener", text: l[0] })]);
      }))
    ]));
    sections.push(pager(idx));
    mount(sections);
  }

  function pager(idx) {
    var n = C.projects.length;
    var prev = C.projects[(idx - 1 + n) % n];
    var next = C.projects[(idx + 1) % n];
    return h("section", null, [h("nav", { class: "pager", "aria-label": "More projects" }, [
      h("a", { href: projectUrl(prev), "aria-label": "Previous project: " + prev.title, text: "← Previous" }),
      h("a", { href: projectUrl(next), class: "next", "aria-label": "Next project: " + next.title, text: "Next →" })
    ])]);
  }

  var page = document.body.getAttribute("data-page");
  if (page === "index") renderIndex();
  else if (page === "project") renderProject();
})();
