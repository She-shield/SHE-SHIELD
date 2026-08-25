@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root {
    --cream: #f8eee8;
    --cream-light: #fffaf6;
    --gold: #b7893f;
    --gold-light: #d7b06b;
    --rose: #c98779;
    --brown: #4b3026;
    --brown-light: #6b4a3d;
    --text: #33251f;
    --line: rgba(111,75,56,.18);
    --shadow: 0 18px 45px rgba(91,57,40,.10);
}

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    color: var(--text);
    font-family: Inter, Arial, sans-serif;
    background:
        radial-gradient(
            circle at 50% 20%,
            #fffdfb 0,
            #f8eee8 55%,
            #efe0d7 100%
        );
}

button,
input,
select,
textarea {
    font: inherit;
}

button,
a {
    cursor: pointer;
}

a {
    text-decoration: none;
}

.hidden {
    display: none !important;
}


/* ================= SPLASH ================= */

.splash {
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: grid;
    place-items: center;

    background: var(--cream);
}

.splash-content {
    text-align: center;
    animation: fadeIn .8s ease;
}

.splash-logo {
    width: 210px;
    height: 210px;
    object-fit: contain;

    filter:
        drop-shadow(
            0 15px 25px
            rgba(89,54,33,.18)
        );
}

.splash h1 {
    margin: 12px 0 4px;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 52px;
    letter-spacing: 7px;

    color: var(--brown);
}

.splash p {
    color: var(--brown-light);
    letter-spacing: 2px;
}

.loading-line {
    width: 180px;
    height: 3px;

    margin: 24px auto;

    background: #dfd0c7;

    overflow: hidden;
}

.loading-line span {
    display: block;

    width: 45%;
    height: 100%;

    background:
        linear-gradient(
            90deg,
            var(--gold),
            var(--rose)
        );

    animation: loading 1.5s infinite;
}


/* ================= LANGUAGE ================= */

.language-screen {
    min-height: 100vh;

    display: grid;
    place-items: center;

    padding: 25px;

    background:
        radial-gradient(
            circle,
            #fffdfb,
            var(--cream)
        );
}

.language-card {
    width: min(480px,94vw);

    padding: 35px;

    text-align: center;

    background:
        rgba(255,255,255,.55);

    border: 1px solid var(--line);

    border-radius: 28px;

    box-shadow: var(--shadow);

    backdrop-filter: blur(12px);
}

.language-logo {
    width: 105px;
    height: 105px;
    object-fit: contain;
}

.language-card h1 {
    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 50px;

    color: var(--brown);

    margin: 12px 0;
}

.language-card p {
    color: #705e55;
}

.language-list {
    display: grid;
    gap: 9px;
    margin: 25px 0;
}

.language-btn {
    padding: 14px 17px;

    text-align: left;

    border-radius: 14px;

    border: 1px solid var(--line);

    background:
        rgba(255,255,255,.6);

    color: var(--text);

    transition: .2s;
}

.language-btn:hover,
.language-btn.active {
    border-color: var(--gold);

    box-shadow:
        0 5px 20px
        rgba(183,137,63,.12);
}


/* ================= BUTTONS ================= */

.gold-button,
.danger-button,
.soft-button {
    border-radius: 13px;

    padding: 13px 18px;

    font-weight: 700;

    transition: .2s;
}

.gold-button {
    color: white;

    background:
        linear-gradient(
            135deg,
            #8e6030,
            #c69b58,
            #9a6c36
        );

    box-shadow:
        0 8px 20px
        rgba(129,83,37,.18);
}

.gold-button:hover {
    transform: translateY(-1px);
}

.danger-button {
    color: white;

    background:
        linear-gradient(
            135deg,
            #b93431,
            #ed5a50
        );

    box-shadow:
        0 9px 25px
        rgba(180,48,45,.22);
}

.soft-button {
    color: var(--brown);

    background:
        rgba(255,255,255,.65);

    border: 1px solid var(--line);
}

.wide {
    width: 100%;
}


/* ================= HEADER ================= */

.header {
    position: sticky;
    top: 0;

    z-index: 50;

    height: 78px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
        10px
        clamp(18px,5vw,70px);

    background:
        rgba(255,249,245,.88);

    backdrop-filter: blur(18px);

    border-bottom:
        1px solid var(--line);
}

.brand {
    display: flex;

    align-items: center;

    gap: 10px;

    background: transparent;

    color: var(--brown);

    text-align: left;
}

.brand img {
    width: 48px;
    height: 48px;

    object-fit: contain;
}

.brand span {
    display: grid;
}

.brand strong {
    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 25px;

    letter-spacing: 2px;
}

.brand small {
    font-size: 9px;
    letter-spacing: 1px;
}

.header nav {
    display: flex;
    gap: 6px;
}

.header nav button {
    padding: 10px 14px;

    color: var(--brown-light);

    background: transparent;

    border-radius: 10px;
}

.header nav button:hover {
    background: #eee0d6;
}

.header-right {
    display: flex;

    gap: 10px;

    align-items: center;
}

#languageSelect {
    padding: 9px 12px;

    border-radius: 12px;

    border: 1px solid var(--line);

    background: #fff8f3;

    color: var(--brown-light);
}

.menu-button {
    padding: 10px 14px;

    font-size: 20px;

    border: 0;

    border-radius: 10px;

    background: transparent;
}

.menu-button:hover {
    background: #eee0d6;
}


/* ================= SIDE MENU ================= */

.side-menu {
    position: fixed;

    right: 22px;
    top: 88px;

    width: 250px;

    padding: 10px;

    z-index: 100;

    display: none;

    background:
        rgba(255,250,247,.97);

    border:
        1px solid var(--line);

    border-radius: 20px;

    box-shadow: var(--shadow);
}

.side-menu.open {
    display: grid;
}

.side-menu button {
    padding: 13px;

    text-align: left;

    color: var(--brown);

    background: transparent;

    border-radius: 10px;
}

.side-menu button:hover {
    background: #f2e5dc;
}


/* ================= MAIN ================= */

main {
    max-width: 1250px;

    margin: auto;

    padding:
        55px 25px 90px;
}

.page {
    display: none;
}

.page.active {
    display: block;
}


/* ================= HERO ================= */

.hero {
    min-height: 440px;

    display: grid;

    grid-template-columns:
        1.05fr .95fr;

    align-items: center;

    gap: 40px;
}

.eyebrow {
    font-size: 11px;

    letter-spacing: 3px;

    font-weight: 700;

    color: var(--gold);

    text-transform: uppercase;
}

.hero h1 {
    margin: 15px 0 25px;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 82px;

    line-height: .86;

    color: var(--brown);
}

.hero p {
    max-width: 610px;

    font-size: 17px;

    line-height: 1.8;

    color: #6f5b51;
}

.hero-image {
    display: flex;
    justify-content: center;
}

.hero-image img {
    width: min(390px,75vw);

    object-fit: contain;

    filter:
        drop-shadow(
            0 25px 30px
            rgba(94,59,38,.14)
        );
}


/* ================= HOME CARDS ================= */

.home-cards {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 25px;
}

.home-card {
    padding: 30px;

    border-radius: 25px;

    background:
        rgba(255,255,255,.48);

    border:
        1px solid var(--line);

    box-shadow: var(--shadow);
}

.emergency-card {
    border-color:
        rgba(180,52,48,.25);
}

.card-icon {
    font-size: 30px;
}

.home-card h2 {
    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 33px;

    margin: 12px 0;
}

.home-card p {
    color: #705e55;

    min-height: 48px;

    line-height: 1.6;
}


/* ================= HEADINGS ================= */

.page-heading {
    text-align: center;

    max-width: 800px;

    margin:
        10px auto 45px;
}

.page-heading h1 {
    margin: 12px 0;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 66px;

    color: var(--brown);
}

.page-heading p {
    color: #705e55;
}


/* ================= TOOL GRID ================= */

.tool-grid {
    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 18px;
}

.tool-card {
    min-height: 155px;

    padding: 24px;

    text-align: left;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    border-radius: 20px;

    background:
        rgba(255,255,255,.48);

    border:
        1px solid var(--line);

    box-shadow: var(--shadow);

    color: var(--text);

    transition: .2s;
}

.tool-card:hover {
    transform: translateY(-3px);

    border-color:
        rgba(183,137,63,.45);
}

.tool-card span {
    font-size: 25px;

    margin-bottom: 16px;
}

.tool-card strong {
    color: var(--brown);

    font-size: 17px;
}

.tool-card small {
    margin-top: 7px;

    color: #7b6860;

    line-height: 1.5;
}

.quick-actions {
    display: flex;

    gap: 12px;

    margin-top: 22px;
}

.quick-actions button,
.quick-actions a {
    padding: 13px 18px;

    border-radius: 13px;

    font-weight: 700;
}

.quick-actions button {
    background: white;

    color: var(--brown);

    border: 1px solid var(--line);
}

.quick-actions a {
    color: white;

    background: var(--brown);
}


/* ================= PANELS ================= */

.panel {
    max-width: 900px;

    margin: auto;

    padding: 30px;

    border-radius: 25px;

    background:
        rgba(255,255,255,.48);

    border:
        1px solid var(--line);

    box-shadow: var(--shadow);
}

#contactFields {
    display: grid;

    gap: 13px;

    margin-bottom: 18px;
}

.contact-row {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 13px;
}

.panel input,
.panel select,
.panel textarea {
    width: 100%;

    padding: 14px;

    border:
        1px solid var(--line);

    border-radius: 12px;

    background:
        rgba(255,255,255,.65);

    color: var(--text);

    outline: none;
}

.panel textarea {
    min-height: 150px;

    resize: vertical;
}

#contactStatus,
#issueStatus {
    min-height: 20px;

    color: var(--gold);

    font-weight: 600;
}


/* ================= EVIDENCE ================= */

.camera-box {
    min-height: 250px;

    display: grid;

    place-items: center;

    overflow: hidden;

    background: #2c201c;

    border-radius: 18px;
}

.camera-box video {
    width: 100%;

    max-height: 500px;

    object-fit: cover;
}

.evidence-buttons {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin: 16px 0;
}

#evidenceFiles {
    display: grid;

    gap: 8px;

    margin-top: 15px;
}

#evidenceFiles div {
    padding: 10px;

    border: 1px solid var(--line);

    border-radius: 10px;

    background: #fff8f4;
}


/* ================= TIPS ================= */

.tips-grid {
    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 18px;
}

.tips-grid div {
    padding: 25px;

    border-radius: 20px;

    background:
        rgba(255,255,255,.48);

    border:
        1px solid var(--line);

    box-shadow: var(--shadow);
}

.tips-grid b {
    color: var(--gold);

    font-size: 12px;

    letter-spacing: 2px;
}

.tips-grid h3 {
    color: var(--brown);
}

.tips-grid p {
    color: #75635b;

    line-height: 1.6;
}


/* ================= HELPLINES ================= */

.helpline-grid {
    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 18px;
}

.helpline-grid a {
    padding: 25px;

    display: grid;

    gap: 7px;

    border-radius: 20px;

    background:
        rgba(255,255,255,.48);

    border:
        1px solid var(--line);

    box-shadow: var(--shadow);
}

.helpline-grid a:first-letter {
    font-size: 28px;
}

.helpline-grid strong {
    color: var(--brown);

    font-size: 18px;
}

.helpline-grid span {
    font-size: 25px;

    color: var(--gold);

    font-weight: 800;
}


/* ================= BATTERY ================= */

.battery-panel {
    text-align: center;
}

.battery-icon {
    font-size: 60px;
}

.battery-meter {
    height: 12px;

    margin: 25px 0;

    overflow: hidden;

    border-radius: 20px;

    background: #eadbd1;
}

.battery-meter span {
    display: block;

    width: 0;

    height: 100%;

    background:
        linear-gradient(
            90deg,
            #7d9d59,
            #d5b35f
        );

    transition: width .5s;
}

.battery-on * {
    animation: none !important;
    transition: none !important;
}


/* ================= FORM ================= */

#issueForm {
    display: grid;

    gap: 13px;
}


/* ================= MODALS ================= */

.modal {
    position: fixed;

    inset: 0;

    z-index: 300;

    display: grid;

    place-items: center;

    padding: 20px;

    background:
        rgba(45,28,22,.68);

    backdrop-filter: blur(8px);
}

.modal-box,
.fake-phone {
    width: min(440px,95vw);

    padding: 35px;

    text-align: center;

    border-radius: 28px;

    background: var(--cream-light);

    box-shadow:
        0 30px 80px
        rgba(0,0,0,.3);
}

.countdown {
    font-size: 100px;

    font-weight: 800;

    color: #c53e39;

    line-height: 1;
}

.fake-phone {
    position: relative;

    background:
        linear-gradient(
            160deg,
            #fff9f4,
            #ead8cf
        );
}

.fake-logo {
    width: 90px;
    height: 90px;

    object-fit: contain;
}

.fake-phone small {
    letter-spacing: 3px;

    color: #8a7369;
}

.fake-phone h2 {
    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 42px;

    margin: 8px;
}

.call-buttons {
    display: flex;

    justify-content: center;

    gap: 25px;

    margin-top: 25px;
}

.call-buttons button {
    width: 62px;
    height: 62px;

    border-radius: 50%;

    border: 0;

    font-size: 25px;

    color: white;

    background: #5c4033;
}

.call-buttons button:last-child {
    background: #b83b38;
}

.close-button {
    position: absolute;

    right: 18px;
    top: 12px;

    border: 0;

    background: transparent;

    font-size: 30px;

    color: var(--brown);
}


/* ================= EMERGENCY ================= */

.emergency-overlay {
    position: fixed;

    inset: 0;

    z-index: 400;

    display: grid;

    place-items: center;

    text-align: center;

    color: white;

    background:
        rgba(90,15,13,.92);
}

.big-sos {
    width: 170px;
    height: 170px;

    margin: auto;

    display: grid;

    place-items: center;

    border-radius: 50%;

    background: #e73c37;

    border:
        8px solid
        rgba(255,255,255,.45);

    font-size: 55px;

    font-weight: 900;

    box-shadow:
        0 0 60px
        rgba(255,80,60,.55);
}


/* ================= TOAST ================= */

.toast {
    position: fixed;

    left: 50%;

    bottom: 25px;

    z-index: 500;

    max-width: 90vw;

    padding: 13px 20px;

    color: white;

    text-align: center;

    background: var(--brown);

    border-radius: 12px;

    transform:
        translate(-50%,120px);

    transition: .3s;
}

.toast.show {
    transform:
        translate(-50%,0);
}


/* ================= ANIMATION ================= */

@keyframes fadeIn {

    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: none;
    }

}

@keyframes loading {

    from {
        transform: translateX(-120%);
    }

    to {
        transform: translateX(420%);
    }

}


/* ================= MOBILE ================= */

@media(max-width:850px) {

    .header nav {
        display: none;
    }

    .hero {
        grid-template-columns: 1fr;

        text-align: center;
    }

    .hero-image {
        order: -1;
    }

    .hero-image img {
        width: 270px;
    }

    .hero h1 {
        font-size: 60px;
    }

    .home-cards,
    .tool-grid,
    .tips-grid,
    .helpline-grid {
        grid-template-columns: 1fr;
    }

    .page-heading h1 {
        font-size: 50px;
    }

    .contact-row {
        grid-template-columns: 1fr;
    }

    .quick-actions {
        flex-direction: column;
    }

}


@media(max-width:520px) {

    main {
        padding: 35px 15px 70px;
    }

    .header {
        padding: 8px 12px;
    }

    .brand strong {
        font-size: 21px;
    }

    .brand small {
        font-size: 8px;
    }

    .brand img {
        width: 42px;
        height: 42px;
    }

    .splash-logo {
        width: 175px;
        height: 175px;
    }

    .splash h1 {
        font-size: 38px;
    }

    .hero h1 {
        font-size: 50px;
    }

    .page-heading h1 {
        font-size: 44px;
    }

}
