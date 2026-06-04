/* ═══ LOADER ═══ */
(function () {
    const ln = document.getElementById("ln"),
        lf = document.getElementById("lf");
    let c = 0;
    const iv = setInterval(() => {
        c += Math.floor(Math.random() * 8) + 3;
        if (c >= 100) {
            c = 100;
            clearInterval(iv);
            setTimeout(
                () => document.getElementById("loader").classList.add("done"),
                400
            );
        }
        ln.textContent = c;
        lf.textContent = c + "%";
        lf.style.width = c + "%";
    }, 28);
})();

/* ═══ CURSOR ═══ */
const dot = document.getElementById("cursor-dot"),
    ring = document.getElementById("cursor-ring");
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
});
(function anim() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(anim);
})();
// let vx = 0,
//     vy = 0;

// const friction = 0.85;
// const spring = 0.12;

// (function anim() {
//     const dx = mx - rx;
//     const dy = my - ry;

//     // قوة جذب ناحية الماوس
//     vx += dx * spring;
//     vy += dy * spring;

//     // احتكاك يقلل السرعة تدريجيًا
//     vx *= friction;
//     vy *= friction;

//     // تحديث المكان
//     rx += vx;
//     ry += vy;

//     ring.style.left = rx + "px";
//     ring.style.top = ry + "px";

//     requestAnimationFrame(anim);
// })();

document
    .querySelectorAll(
        "a,button,.magnetic,.sk-card,.proj-card,.cert-card,.stat-b,.proof-item"
    )
    .forEach((el) => {
        el.addEventListener("mouseenter", () =>
            document.body.classList.add("hovering")
        );
        el.addEventListener("mouseleave", () =>
            document.body.classList.remove("hovering")
        );
    });

/* ═══ NAVBAR ═══ */
window.addEventListener("scroll", () =>
    document
        .getElementById("navbar")
        .classList.toggle("scrolled", window.scrollY > 60)
);
const burger = document.getElementById("nav-burger"),
    mob = document.getElementById("nav-mobile");
burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mob.classList.toggle("open");
});
mob.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
        burger.classList.remove("open");
        mob.classList.remove("open");
    })
);

/* ═══ HERO CANVAS ═══ */
(function () {
    const cv = document.getElementById("canvas-hero"),
        ctx = cv.getContext("2d");
    let W, H;
    const pts = [],
        N = 60;
    function resize() {
        W = cv.width = cv.offsetWidth;
        H = cv.height = cv.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < N; i++)
        pts.push({
            x: Math.random() * 1920,
            y: Math.random() * 1080,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            o: Math.random() * 0.28 + 0.05,
            r: Math.random() * 1.2 + 0.2,
        });
    function draw() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201,168,76,${p.o})`;
            ctx.fill();
            for (let j = i + 1; j < N; j++) {
                const q = pts[j],
                    dx = p.x - q.x,
                    dy = p.y - q.y,
                    d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(201,168,76,${
                        0.05 * (1 - d / 120)
                    })`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// /* ═══ FEATURED PROJECT CANVAS ═══ */
// (function () {
//     const cv = document.getElementById("feat-canvas");
//     if (!cv) return;
//     const ctx = cv.getContext("2d");
//     let W, H;
//     function resize() {
//         W = cv.width = cv.offsetWidth;
//         H = cv.height = cv.offsetHeight;
//     }
//     resize();
//     window.addEventListener("resize", resize);
//     const nodes = [
//         { label: "Input Text", x: 0.15, y: 0.2 },
//         { label: "Tokenizer", x: 0.4, y: 0.2 },
//         { label: "BiLSTM", x: 0.65, y: 0.2 },
//         { label: "BERT", x: 0.65, y: 0.5 },
//         { label: "Ensemble", x: 0.82, y: 0.35 },
//         { label: "Hate / Not Hate", x: 0.82, y: 0.65 },
//         { label: "Arabic Data", x: 0.15, y: 0.5 },
//         { label: "Augmentation", x: 0.4, y: 0.5 },
//     ];
//     const edges = [
//         [0, 1],
//         [1, 2],
//         [2, 4],
//         [6, 7],
//         [7, 3],
//         [3, 4],
//         [4, 5],
//     ];
//     let t = 0;
//     function draw() {
//         ctx.clearRect(0, 0, W, H);
//         edges.forEach(([a, b]) => {
//             const na = nodes[a],
//                 nb = nodes[b];
//             const x1 = na.x * W,
//                 y1 = na.y * H,
//                 x2 = nb.x * W,
//                 y2 = nb.y * H;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.strokeStyle = "rgba(201,168,76,.18)";
//             ctx.lineWidth = 1;
//             ctx.stroke();
//             const prog = (Math.sin(t * 0.02 + a * 0.8) + 1) / 2;
//             const px = x1 + (x2 - x1) * prog,
//                 py = y1 + (y2 - y1) * prog;
//             ctx.beginPath();
//             ctx.arc(px, py, 2.5, 0, Math.PI * 2);
//             ctx.fillStyle = "rgba(201,168,76,.7)";
//             ctx.fill();
//         });
//         nodes.forEach((n) => {
//             const x = n.x * W,
//                 y = n.y * H,
//                 tw = ctx.measureText(n.label).width + 16;
//             ctx.fillStyle = "rgba(8,8,8,.8)";
//             ctx.strokeStyle = "rgba(201,168,76,.3)";
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.roundRect(x - tw / 2, y - 11, tw, 22, 3);
//             ctx.fill();
//             ctx.stroke();
//             ctx.fillStyle = "rgba(201,168,76,.85)";
//             ctx.font = "9px 'JetBrains Mono',monospace";
//             ctx.textAlign = "center";
//             ctx.textBaseline = "middle";
//             ctx.fillText(n.label, x, y);
//         });
//         t++;
//         requestAnimationFrame(draw);
//     }
//     draw();
// })();

/* ═══ 3D SPHERE ═══ */
(function () {
    const cv = document.getElementById("sphere-canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = 440,
        H = 440,
        CX = W / 2,
        CY = H / 2,
        R = 165;
    const TAGS = [
        "React.js",
        "Node.js",
        "Spring Boot",
        "MySQL",
        "JavaScript",
        "Python",
        "Java",
        "Angular",
        "Docker",
        "Git",
        "Linux",
        "Deep Learning",
        "C/C++",
        "HTML/CSS",
    ];
    const pts = [],
        N = TAGS.length;
    let rotX = 0,
        rotY = 0,
        tx = 0,
        ty = 0;
    const phi = Math.PI * (3 - Math.sqrt(5)); //Distribute around by the Golden Angle 137.5°
    for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2,
            r = Math.sqrt(1 - y * y),
            th = phi * i;
        pts.push({
            x0: r * Math.cos(th),
            y0: y,
            z0: r * Math.sin(th),
            label: TAGS[i],
        });
    }
    document.addEventListener("mousemove", (e) => {
        const rc = cv.getBoundingClientRect();
        tx = ((e.clientY - rc.top - CY) / CY) * 0.019;
        ty = ((e.clientX - rc.left - CX) / CX) * 0.019;
    });
    function rot(p, ax, ay) {
        // Rotate by the angle around X-axis, and Y-axis as it is 2D
        let x = p.x0,
            y = p.y0,
            z = p.z0,
            y1 = y * Math.cos(ax) - z * Math.sin(ax),
            z1 = y * Math.sin(ax) + z * Math.cos(ax), //
            x2 = x * Math.cos(ay) + z1 * Math.sin(ay), //
            z2 = -x * Math.sin(ay) + z1 * Math.cos(ay); //
        return { x: x2, y: y1, z: z2 };
    }
    function draw() {
        ctx.clearRect(0, 0, W, H);
        rotX += (tx - rotX) * 0.055; //Smooth Interpolation
        rotY += (ty - rotY) * 0.055;
        rotY += 0.0025;
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(CX, CY, R * (0.25 + i * 0.12), 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(201,168,76,.03)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        pts.map((p) => {
            //make the rotation for the points
            const r = rot(p, rotX, rotY),
                sc = (r.z + 1.5) / 2.5; //scale depends on Z, as near with higher Z become Bigger
            return {
                px: CX + r.x * R,
                py: CY + r.y * R,
                z: r.z,
                sc,
                label: p.label,
            };
        })
            .sort((a, b) => a.z - b.z) //Sort is very important to draw far first then near
            .forEach((p) => {
                const al = (p.z + 1) / 2, //alpha channel depends on Z as far get less opacity than near which giving depth to the sphere
                    fs = 9 + p.sc * 4, //font size also depends on how far is it
                    pad = 10;
                ctx.font = `${fs}px 'JetBrains Mono',monospace`;
                const tw = ctx.measureText(p.label).width;
                ctx.save();
                ctx.globalAlpha = 0.25 + al * 0.55;
                const bx = p.px - tw / 2 - pad,
                    by = p.py - fs / 2 - 6,
                    bw = tw + pad * 2,
                    bh = fs + 12;
                ctx.fillStyle = "rgba(8,8,8,.85)";
                ctx.beginPath();
                ctx.roundRect(bx, by, bw, bh, 4);
                ctx.fill();
                ctx.strokeStyle = `rgba(201,168,76,${0.1 + al * 0.35})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
                ctx.restore();
                ctx.save();
                ctx.globalAlpha = 0.35 + al * 0.6;
                ctx.fillStyle = `rgba(201,168,76,${0.5 + al * 0.5})`;
                ctx.font = `${fs}px 'JetBrains Mono',monospace`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(p.label, p.px, p.py);
                ctx.restore();
            });
        requestAnimationFrame(draw);
    }
    draw();
})();

const particles = document.querySelector(".particles");

for (let i = 0; i < 80; i++) {
    const p = document.createElement("span");

    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";

    p.style.animationDelay = Math.random() * 10 + "s";

    particles.appendChild(p);
}

/* ═══ MARQUEE ═══ */
(function () {
    const items = [
        "JavaScript",
        "React.js",
        "Node.js",
        "Spring Boot",
        "Python",
        "MySQL",
        "Angular",
        "Java",
        "Docker",
        "Deep Learning",
        "C/C++",
        "Git",
        "HTML & CSS",
        "Linux",
        "REST API",
        "NLP",
        "AI",
        "Software Engineer",
    ];
    // Build 4 copies so we never see a gap
    const allItems = [...items, ...items, ...items, ...items];
    const mkItem = (txt) => {
        const s = document.createElement("span");
        s.className = "mq-item";
        s.textContent = txt;
        return s;
    };
    const vp = document.querySelector(".mq-vp");
    // Single track with 4× items
    const trk = document.createElement("div");
    trk.className = "mq-trk";
    trk.id = "mq-single";
    allItems.forEach((t) => trk.appendChild(mkItem(t)));
    // Remove old tracks and insert single one
    document.getElementById("mq-a").replaceWith(trk);
    const old = document.getElementById("mq-b");
    if (old) old.remove();

    let pos = 0,
        speed = 0.5,
        paused = false,
        targetSpeed = 0.5,
        currentSpeed = 0.5;
    const strip = document.querySelector(".mq-strip");

    // Hover on strip items
    trk.addEventListener("mouseover", (e) => {
        const item = e.target.closest(".mq-item");
        if (!item) return;
        paused = true;
        targetSpeed = 0;
        trk.querySelectorAll(".mq-item").forEach((el) =>
            el.classList.remove("mq-hovered")
        );
        item.classList.add("mq-hovered");
        strip.classList.add("mq-has-hover");
    });
    trk.addEventListener("mouseout", (e) => {
        const item = e.target.closest(".mq-item");
        if (!item) return;
        const to = e.relatedTarget;
        if (to && trk.contains(to) && to.closest(".mq-item")) return; // still inside a sibling item
        paused = false;
        targetSpeed = 0.5;
        item.classList.remove("mq-hovered");
        strip.classList.remove("mq-has-hover");
    });
    // Touch support
    trk.addEventListener(
        "touchstart",
        (e) => {
            const item = e.target.closest(".mq-item");
            if (!item) return;
            paused = true;
            targetSpeed = 0;
            trk.querySelectorAll(".mq-item").forEach((el) =>
                el.classList.remove("mq-hovered")
            );
            item.classList.add("mq-hovered");
            strip.classList.add("mq-has-hover");
            setTimeout(() => {
                paused = false;
                targetSpeed = 0.5;
                item.classList.remove("mq-hovered");
                strip.classList.remove("mq-has-hover");
            }, 1200);
        },
        { passive: true }
    );

    function anim() {
        currentSpeed += (targetSpeed - currentSpeed) * 0.07; // smooth lerp
        pos -= currentSpeed;
        // Reset when first copy has scrolled fully off
        const singleCopyWidth = trk.scrollWidth / 4;
        if (Math.abs(pos) >= singleCopyWidth) pos += singleCopyWidth;
        vp.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(anim);
    }
    anim();
})();

/* ═══ ORBIT ═══ */
(function () {
    const wrap = document.getElementById("orbit-wrap");
    if (!wrap) return;
    const skills = [
        "JavaScript",
        "React.js",
        "Node.js",
        "Spring Boot",
        "Python",
        "MySQL",
        "Angular",
        "Java",
        "Docker",
        "Linux",
        "Git",
        "Deep Learning",
        "C/C++",
        "HTML/CSS",
    ];
    const rings = [
        {
            r: 95,
            speed: 18,
            dir: 1,
            items: ["JavaScript", "React.js", "Node.js", "Spring Boot"],
        },
        {
            r: 155,
            speed: 30,
            dir: -1,
            items: ["Python", "MySQL", "Angular", "Java", "Docker"],
        },
        {
            r: 210,
            speed: 40,
            dir: 1,
            items: ["Linux", "Git", "Deep Learning", "C/C++", "HTML/CSS"],
        },
    ];

    rings.forEach((cfg) => {
        const el = document.createElement("div");
        el.className = "orbit-ring-el";
        el.style.cssText = `width:${cfg.r * 2}px;height:${cfg.r * 2}px`;
        wrap.appendChild(el);

        cfg.nodes = cfg.items.map((label, i) => {
            const startAngle = (i / cfg.items.length) * 360;
            const arm = document.createElement("div");
            arm.className = "orbit-arm";
            const node = document.createElement("div");
            node.className = "orbit-node";
            node.textContent = label;
            node.style.cssText = `left:${
                cfg.r
            }px;top:0;transform:translateY(-50%) rotate(${-startAngle}deg)`;
            arm.appendChild(node);
            wrap.appendChild(arm);
            return { arm, node, angle: startAngle };
        });
    });

    let last = null,
        paused = false,
        sm = 1;
    wrap.addEventListener("mouseenter", () => (paused = true));
    wrap.addEventListener("mouseleave", () => (paused = false));
    function tick(ts) {
        if (!last) last = ts;
        const dt = Math.min((ts - last) / 1000, 0.05);
        last = ts;
        sm += ((paused ? 0.08 : 1) - sm) * 0.06;
        rings.forEach((cfg) => {
            const delta = (360 / cfg.speed) * cfg.dir * dt * sm;
            cfg.nodes.forEach((n) => {
                n.angle += delta;
                n.arm.style.transform = `rotate(${n.angle}deg)`;
                n.node.style.transform = `translateY(-50%) rotate(${-n.angle}deg)`;
            });
        });
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    wrap.querySelectorAll(".orbit-node").forEach((n) => {
        n.addEventListener("mouseenter", () => n.classList.add("active"));
        n.addEventListener("mouseleave", () => n.classList.remove("active"));
    });
})();

/* ═══ SKILLS ═══ */
const skillsData = [
    { cat: "Language", name: "JavaScript", pct: 90 },
    { cat: "Language", name: "Python", pct: 70 },
    { cat: "Language", name: "Java", pct: 90 },
    { cat: "Language", name: "C/C++", pct: 75 },
    { cat: "Frontend", name: "React.js", pct: 88 },
    { cat: "Frontend", name: "Angular", pct: 75 },
    { cat: "Frontend", name: "HTML & CSS", pct: 98 },
    { cat: "Backend", name: "Node.js", pct: 85 },
    { cat: "Backend", name: "Spring Boot", pct: 80 },
    { cat: "Database", name: "MySQL", pct: 82 },
    { cat: "DevOps", name: "Docker", pct: 70 },
    { cat: "DevOps", name: "Git & GitHub", pct: 90 },
];
const sg = document.getElementById("skills-grid");
skillsData.forEach((s, i) => {
    sg.innerHTML += `<div class="sk-card reveal" style="transition-delay:${
        i * 0.05
    }s"><div class="sk-cat">${s.cat}</div><div class="sk-nm">${
        s.name
    }</div><div class="sk-trk"><div class="sk-fill" style="width:${
        s.pct
    }%"></div><div class="sk-pct">${s.pct}%</div></div></div>`;
});

/* ═══ PROJECTS ═══ */
const projectsData = [
    {
        num: "02",
        title: "Full Stack Restaurant Application",
        desc: "Complete web app with React.js frontend, Node.js backend, and MySQL database. Responsive UI with integrated REST APIs. Built in a team of six using GitHub.",
        tags: ["React.js", "Node.js", "MySQL", "REST API"],
        gh: "https://github.com/Mahmoud-Ramzy/Restaurant-",
    },
    {
        num: "03",
        title: "Tasbih",
        desc: "Modern digital Tasbih application designed to provide a seamless Dhikr experience. Features customizable counters, persistent progress tracking, responsive design, and an elegant user-focused interface for daily remembrance.",
        tags: [
            "JavaScript",
            "Web App",
            "Local Storage",
            "Responsive Design",
            "UI/UX",
            "PWA",
        ],
        gh: "https://mahmoud-ramzy.github.io/Tasbih/",
    },
    {
        num: "04",
        title: "AI Agent for Solving 8-Puzzle",
        desc: "Intelligent agent implementing DFS, BFS, and A* search algorithms. Spring Boot backend with HTML/CSS/JS frontend for interactive puzzle solving.",
        tags: ["Spring Boot", "AI", "Algorithms", "JavaScript"],
        gh: "https://github.com/Mahmoud-Ramzy/8---Puzzle",
    },
    {
        num: "05",
        title: "Linear & Nonlinear Equations Solver",
        desc: "Numerical methods: Gaussian elimination, LU decomposition, Newton-Raphson. Spring Boot backend + Angular frontend, built in a team of three.",
        tags: ["Spring Boot", "Angular", "Numerical Methods", "Math"],
        gh: "https://github.com/Mahmoud-Ramzy/control_lab",
    },
    {
        num: "06",
        title: "Command Line Chess Game",
        desc: "Fully functional chess game in the terminal, developed in C with complete game rules, move validation, and board rendering.",
        tags: ["C", "Algorithms", "Game Dev", "CLI"],
        gh: "https://github.com/Mahmoud-Ramzy/c-chessgame",
    },
];
const pg = document.getElementById("projects-grid");
projectsData.forEach((p, i) => {
    pg.innerHTML += `<div class="proj-card reveal" style="transition-delay:${
        i * 0.1
    }s"><div class="proj-num">${p.num}</div><div class="proj-title">${
        p.title
    }</div><div class="proj-desc">${p.desc}</div><div class="proj-tags">${p.tags
        .map((t) => `<span class="tag">${t}</span>`)
        .join(
            ""
        )}</div><div class="proj-cta"><div class="proj-cta-ln"></div><a href=${
        p.gh
    } target="_blank"> <span>View Project </span> </a></div></div>`;
});

/* ═══ CERTS ═══ */
const certsData = [
    {
        iss: "Coursera · deeplearning.ai",
        ttl: "Deep Learning Specialization",
        dsc: "5-course specialization covering neural networks, CNNs, RNNs, hyperparameter tuning, and sequence models.",
        dt: "August 2023",
    },
    {
        iss: "Udacity",
        ttl: "Professional Front-End Web Development",
        dsc: "Advanced JavaScript, semantic HTML, responsive CSS, and API integration with a weather application project.",
        dt: "August 2022",
    },
    {
        iss: "Udacity",
        ttl: "Web Development Challenger Track",
        dsc: "Fundamentals of modern web development: HTML structure, CSS styling, and web technologies.",
        dt: "July 2022",
    },
];
const cg = document.getElementById("certs-grid");
certsData.forEach((c, i) => {
    cg.innerHTML += `<div class="cert-card reveal" style="transition-delay:${
        i * 0.12
    }s"><div class="cert-iss">${c.iss}</div><div class="cert-ttl">${
        c.ttl
    }</div><div class="cert-dsc">${c.dsc}</div><div class="cert-dt">${
        c.dt
    }</div></div>`;
});

/* ═══ INTERSECTION OBSERVER ═══ */
const obs = new IntersectionObserver(
    (entries) =>
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
        }),
    { threshold: 0.07 }
);
document
    .querySelectorAll(".reveal,.reveal-l,.reveal-r")
    .forEach((el) => obs.observe(el));
setTimeout(
    () =>
        document
            .querySelectorAll(
                ".sk-card,.proj-card,.cert-card,.proof-item,.why-item"
            )
            .forEach((el) => obs.observe(el)),
    200
);

/* ═══ SECTION HEADING SPOTLIGHT ═══ */
// Wrap each section's first heading text in .sec-spotlight
(function () {
    document.querySelectorAll("section").forEach((sec) => {
        // Find the first sec-ttl or sec-tag that's a direct child (or near top)
        const heading = sec.querySelector(".sec-tag");
        if (!heading) return;
        heading.classList.add("sec-spotlight");
    });

    // Observer: when a new section enters viewport, light up its heading for ~2.5s
    let lastLit = null;
    const spotObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                const sec = e.target;
                const heading = sec.querySelector(".sec-spotlight");
                if (!heading || heading === lastLit) return;
                // Remove from previous
                if (lastLit) {
                    lastLit.classList.remove("lit");
                }
                lastLit = heading;
                heading.classList.remove("lit");
                void heading.offsetWidth; // force reflow to restart animation
                heading.classList.add("lit");
                // Auto-remove after animation completes
                setTimeout(() => heading.classList.remove("lit"), 2600);
            });
        },
        { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
    );

    document.querySelectorAll("section").forEach((sec) => spotObs.observe(sec));
})();

/* ═══ MAGNETIC ═══ */
document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
        const rc = el.getBoundingClientRect();
        el.style.transform = `translate(${
            (e.clientX - rc.left - rc.width / 2) * 0.22
        }px,${(e.clientY - rc.top - rc.height / 2) * 0.22}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
});

/* ═══ CARD SHINE ═══ */
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".sk-card,.stat-b").forEach((c) => {
        const rc = c.getBoundingClientRect();
        c.style.setProperty(
            "--mx",
            (((e.clientX - rc.left) / rc.width) * 100).toFixed(1) + "%"
        );
        c.style.setProperty(
            "--my",
            (((e.clientY - rc.top) / rc.height) * 100).toFixed(1) + "%"
        );
    });
});
