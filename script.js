/* =====================================================
   SHE-SHIELD JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let selectedLanguage = "en";

let contacts = JSON.parse(
    localStorage.getItem("sheShieldContacts") || "[]"
);

let evidence = JSON.parse(
    localStorage.getItem("sheShieldEvidence") || "[]"
);

let autoTimer = null;

let voiceRecognition = null;

let voiceListening = false;

let shakeLastTime = 0;

let batterySaver = false;

let sirenAudio = new Audio("siren.mp3");

sirenAudio.loop = true;


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

    en: {

        tagline: "Your Safety. Our Priority.",

        choose: "Choose Your Language",

        select: "Select your preferred language",

        continue: "Continue →",

        homeTitle:
            "Your Safety.<br>Your Voice.<br>Your Shield.",

        homeDescription:
            "SHE-SHIELD provides fast, simple and privacy-focused emergency safety tools whenever you need them.",

        emergency:
            "Emergency SOS",

        emergencyText:
            "Trigger emergency assistance immediately.",

        safety:
            "Immediate Safety",

        safetyText:
            "Access all safety tools, contacts and protection features.",

        activate:
            "ACTIVATE SOS →",

        openSafety:
            "OPEN SAFETY →",

        father: [

            "Hello, where are you?",

            "Why are you not answering your phone?",

            "Call me immediately.",

            "Tell me exactly where you are.",

            "Do not stay outside alone.",

            "I am waiting for your call.",

            "Come home safely.",

            "Call me as soon as you hear this.",

            "And keep your phone with you.",

            "I want to know that you are safe."

        ]

    },


    kn: {

        tagline: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ. ನಮ್ಮ ಆದ್ಯತೆ.",

        choose: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

        select: "ನಿಮ್ಮ ಇಷ್ಟದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

        continue: "ಮುಂದುವರಿಸಿ →",

        homeTitle:
            "ನಿಮ್ಮ ಸುರಕ್ಷತೆ.<br>ನಿಮ್ಮ ಧ್ವನಿ.<br>ನಿಮ್ಮ ರಕ್ಷಣೆ.",

        homeDescription:
            "SHE-SHIELD ನಿಮಗೆ ಅಗತ್ಯವಿರುವಾಗ ವೇಗವಾದ ಮತ್ತು ಸರಳವಾದ ಸುರಕ್ಷತಾ ಸಾಧನಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",

        emergency:
            "ತುರ್ತು SOS",

        emergencyText:
            "ತಕ್ಷಣ ತುರ್ತು ಸಹಾಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",

        safety:
            "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",

        safetyText:
            "ಎಲ್ಲಾ ಸುರಕ್ಷತಾ ಸಾಧನಗಳು ಮತ್ತು ಸಂಪರ್ಕಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.",

        activate:
            "SOS ಸಕ್ರಿಯಗೊಳಿಸಿ →",

        openSafety:
            "ಸುರಕ್ಷತೆ ತೆರೆಯಿರಿ →",

        father: [

            "ಎಲ್ಲಿ ಇದ್ದೀಯ?",

            "ನಿನ್ನ ಫೋನ್‌ಗೆ ಏಕೆ ಉತ್ತರಿಸುತ್ತಿಲ್ಲ?",

            "ತಕ್ಷಣ ನನಗೆ ಕರೆ ಮಾಡು.",

            "ನೀನು ಎಲ್ಲಿದ್ದೀಯ ಎಂದು ಹೇಳು.",

            "ಒಬ್ಬಳೇ ಹೊರಗೆ ಇರಬೇಡ.",

            "ನಾನು ನಿನ್ನ ಕರೆಗಾಗಿ ಕಾಯುತ್ತಿದ್ದೇನೆ.",

            "ಸುರಕ್ಷಿತವಾಗಿ ಮನೆಗೆ ಬಾ.",

            "ಇದನ್ನು ಕೇಳಿದ ತಕ್ಷಣ ನನಗೆ ಕರೆ ಮಾಡು.",

            "ಫೋನ್ ನಿನ್ನ ಹತ್ತಿರ ಇಟ್ಟುಕೋ.",

            "ನೀನು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀಯ ಎಂದು ನನಗೆ ತಿಳಿಯಬೇಕು."

        ]

    },


    te: {

        tagline: "మీ భద్రత. మా ప్రాధాన్యత.",

        choose: "మీ భాషను ఎంచుకోండి",

        select: "మీకు ఇష్టమైన భాషను ఎంచుకోండి",

        continue: "కొనసాగించండి →",

        homeTitle:
            "మీ భద్రత.<br>మీ స్వరం.<br>మీ రక్షణ.",

        homeDescription:
            "SHE-SHIELD మీకు అవసరమైనప్పుడు వేగవంతమైన మరియు సులభమైన భద్రతా సాధనాలను అందిస్తుంది.",

        emergency:
            "అత్యవసర SOS",

        emergencyText:
            "వెంటనే అత్యవసర సహాయాన్ని ప్రారంభించండి.",

        safety:
            "తక్షణ భద్రత",

        safetyText:
            "అన్ని భద్రతా సాధనాలు మరియు పరిచయాలను యాక్సెస్ చేయండి.",

        activate:
            "SOS ప్రారంభించండి →",

        openSafety:
            "భద్రత తెరవండి →",

        father: [

            "ఎక్కడ ఉన్నావు?",

            "నీ ఫోన్ ఎందుకు ఎత్తడం లేదు?",

            "వెంటనే నాకు కాల్ చేయి.",

            "నువ్వు ఎక్కడ ఉన్నావో చెప్పు.",

            "ఒంటరిగా బయట ఉండకు.",

            "నీ కాల్ కోసం నేను ఎదురు చూస్తున్నాను.",

            "సురక్షితంగా ఇంటికి రా.",

            "ఇది విన్న వెంటనే నాకు కాల్ చేయి.",

            "ఫోన్ నీ దగ్గరే ఉంచుకో.",

            "నువ్వు సురక్షితంగా ఉన్నావని నాకు తెలుసుకోవాలి."

        ]

    },


    ta: {

        tagline: "உங்கள் பாதுகாப்பு. எங்கள் முன்னுரிமை.",

        choose: "உங்கள் மொழியை தேர்வு செய்யவும்",

        select: "உங்களுக்கு விருப்பமான மொழியை தேர்வு செய்யவும்",

        continue: "தொடரவும் →",

        homeTitle:
            "உங்கள் பாதுகாப்பு.<br>உங்கள் குரல்.<br>உங்கள் கேடயம்.",

        homeDescription:
            "SHE-SHIELD உங்களுக்கு தேவையான நேரத்தில் வேகமான மற்றும் எளிய பாதுகாப்பு கருவிகளை வழங்குகிறது.",

        emergency:
            "அவசர SOS",

        emergencyText:
            "உடனடியாக அவசர உதவியை செயல்படுத்தவும்.",

        safety:
            "உடனடி பாதுகாப்பு",

        safetyText:
            "அனைத்து பாதுகாப்பு கருவிகள் மற்றும் தொடர்புகளை அணுகவும்.",

        activate:
            "SOS செயல்படுத்து →",

        openSafety:
            "பாதுகாப்பை திறக்கவும் →",

        father: [

            "எங்கே இருக்கிறாய்?",

            "ஏன் போனை எடுக்கவில்லை?",

            "உடனே எனக்கு அழைப்பு செய்.",

            "நீ எங்கே இருக்கிறாய் என்று சொல்.",

            "தனியாக வெளியே இருக்காதே.",

            "உன் அழைப்புக்காக நான் காத்திருக்கிறேன்.",

            "பாதுகாப்பாக வீட்டிற்கு வா.",

            "இதை கேட்டவுடன் எனக்கு அழைப்பு செய்.",

            "போனை உன்னுடன் வைத்துக்கொள்.",

            "நீ பாதுகாப்பாக இருக்கிறாய் என்பதை நான் தெரிந்துகொள்ள வேண்டும்."

        ]

    },


    hi: {

        tagline: "आपकी सुरक्षा. हमारी प्राथमिकता.",

        choose: "अपनी भाषा चुनें",

        select: "अपनी पसंदीदा भाषा चुनें",

        continue: "जारी रखें →",

        homeTitle:
            "आपकी सुरक्षा।<br>आपकी आवाज़।<br>आपकी ढाल।",

        homeDescription:
            "SHE-SHIELD जरूरत के समय तेज़ और सरल सुरक्षा उपकरण प्रदान करता है।",

        emergency:
            "आपातकालीन SOS",

        emergencyText:
            "तुरंत आपातकालीन सहायता सक्रिय करें।",

        safety:
            "तत्काल सुरक्षा",

        safetyText:
            "सभी सुरक्षा उपकरण और संपर्कों तक पहुंचें।",

        activate:
            "SOS सक्रिय करें →",

        openSafety:
            "सुरक्षा खोलें →",

        father: [

            "तुम कहाँ हो?",

            "फोन क्यों नहीं उठा रही हो?",

            "तुरंत मुझे फोन करो.",

            "तुम कहाँ हो यह बताओ.",

            "अकेले बाहर मत रहो.",

            "मैं तुम्हारे फोन का इंतजार कर रहा हूँ.",

            "सुरक्षित घर आओ.",

            "यह सुनते ही मुझे फोन करो.",

            "फोन अपने पास रखो.",

            "मुझे पता होना चाहिए कि तुम सुरक्षित हो."

        ]

    }

};


/* =====================================================
   SPLASH
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("splashScreen")
            .classList.add("hidden");

        document
            .getElementById("languageScreen")
            .classList.remove("hidden");

    }, 3000);

});


/* =====================================================
   LANGUAGE SELECTION
===================================================== */

document
    .querySelectorAll(".language-option")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".language-option")
                .forEach(btn =>
                    btn.classList.remove("selected")
                );

            button.classList.add("selected");

            selectedLanguage =
                button.dataset.lang;

        });

    });


document
    .getElementById("continueLanguage")
    .addEventListener("click", () => {

        applyLanguage();

        document
            .getElementById("languageScreen")
            .classList.add("hidden");

        document
            .getElementById("app")
            .classList.remove("hidden");

    });


document
    .getElementById("languageSelect")
    .addEventListener("change", function () {

        selectedLanguage = this.value;

        applyLanguage();

    });


/* =====================================================
   LANGUAGE APPLICATION
===================================================== */

function applyLanguage() {

    const t = translations[selectedLanguage];

    document
        .getElementById("brandTagline")
        .textContent = t.tagline;

    document
        .getElementById("languageTitle")
        .textContent = t.choose;

    document
        .getElementById("languageSubtitle")
        .textContent = t.select;

    document
        .getElementById("continueLanguage")
        .textContent = t.continue;

    document
        .getElementById("homeTitle")
        .innerHTML = t.homeTitle;

    document
        .getElementById("homeDescription")
        .textContent = t.homeDescription;

    document
        .getElementById("emergencyHomeTitle")
        .textContent = t.emergency;

    document
        .getElementById("emergencyHomeText")
        .textContent = t.emergencyText;

    document
        .getElementById("safetyHomeTitle")
        .textContent = t.safety;

    document
        .getElementById("safetyHomeText")
        .textContent = t.safetyText;

    document
        .querySelector(".emergency-choice strong")
        .textContent = t.activate;

    document
        .querySelector(".safety-choice strong")
        .textContent = t.openSafety;

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(p => p.classList.remove("active"));

    document
        .getElementById(page)
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   EMERGENCY SOS
   IMMEDIATE ACTION
===================================================== */

document
    .getElementById("emergencyHomeButton")
    .addEventListener("click", activateEmergencySOS);


async function activateEmergencySOS() {

    document
        .getElementById("sosOverlay")
        .classList.remove("hidden");

    document
        .getElementById("sosMessage")
        .textContent =
        "Emergency action is being activated.";

    await getAndShareLocation(true);

    playSiren();

    /* Emergency call link */

    setTimeout(() => {

        window.location.href = "tel:112";

    }, 500);

}


/* =====================================================
   STOP SOS
===================================================== */

document
    .getElementById("stopSos")
    .addEventListener("click", stopSOS);


function stopSOS() {

    stopSiren();

    document
        .getElementById("sosOverlay")
        .classList.add("hidden");

}


/* =====================================================
   LOCATION
===================================================== */

function getLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {

            reject(
                new Error(
                    "Location is not supported."
                )
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(

            position => {

                resolve({

                    latitude:
                        position.coords.latitude,

                    longitude:
                        position.coords.longitude

                });

            },

            error => reject(error),

            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    });

}


async function getAndShareLocation(emergency = false) {

    const status =
        document.getElementById(
            "sosLocationStatus"
        );

    try {

        status.textContent =
            "Getting your location...";

        const location =
            await getLocation();

        const mapsURL =
            `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

        status.textContent =
            "Location ready.";

        /* Web Share */

        if (navigator.share) {

            try {

                await navigator.share({

                    title: "SHE-SHIELD Emergency Location",

                    text:
                        "My current location. Please help me.",
                    
                    url: mapsURL

                });

            } catch (shareError) {

                console.log(
                    "Share cancelled."
                );

            }

        } else {

            await navigator.clipboard?.writeText(
                mapsURL
            );

            window.open(
                mapsURL,
                "_blank"
            );

        }

        return location;

    } catch (error) {

        status.textContent =
            "Unable to access location. Please enable location permission.";

        console.error(error);

        return null;

    }

}


/* =====================================================
   SIREN
===================================================== */

function playSiren() {

    sirenAudio.currentTime = 0;

    sirenAudio.play()
        .catch(error => {

            console.log(
                "Siren needs user interaction:",
                error
            );

        });

}


function stopSiren() {

    sirenAudio.pause();

    sirenAudio.currentTime = 0;

}


/* =====================================================
   IMMEDIATE SAFETY
===================================================== */

document
    .getElementById("immediateSafetyButton")
    .addEventListener("click", () => {

        showPage("safetyPage");

    });


document
    .getElementById("backHomeFromSafety")
    .addEventListener("click", () => {

        showPage("homePage");

    });


/* =====================================================
   SAFETY CARDS
===================================================== */

document
    .querySelectorAll(".safety-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            openTool(
                card.dataset.tool
            );

        });

    });


/* =====================================================
   TOOL SYSTEM
===================================================== */

function openTool(tool) {

    switch (tool) {

        case "contacts":
            openContacts();
            break;

        case "silent":
            openSilentSOS();
            break;

        case "voice":
            openVoiceSOS();
            break;

        case "shake":
            openShakeSOS();
            break;

        case "auto":
            openAutoSOS();
            break;

        case "evidence":
            openEvidence();
            break;

        case "fakecall":
            openFakeCall();
            break;

        case "tips":
            openTips();
            break;

        case "helplines":
            openHelplines();
            break;

        case "battery":
            openBatterySaver();
            break;

        case "issues":
            openCustomerIssues();
            break;

    }

}


/* =====================================================
   MODAL
===================================================== */

function openModal(content) {

    document
        .getElementById("modalContent")
        .innerHTML = content;

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


document
    .getElementById("closeModal")
    .addEventListener("click", closeModal);


document
    .getElementById("modal")
    .addEventListener("click", event => {

        if (
            event.target.id === "modal"
        ) {

            closeModal();

        }

    });


/* =====================================================
   TRUSTED CONTACTS
===================================================== */

function openContacts() {

    let html = `

        <h2 class="modal-title">
            Trusted Contacts
        </h2>

        <p class="modal-subtitle">
            Add a minimum of five trusted contacts.
        </p>

        <div class="form-grid">
    `;

    for (let i = 0; i < 5; i++) {

        const contact =
            contacts[i] || {};

        html += `

            <div class="contact-row">

                <input
                    id="contactName${i}"
                    type="text"
                    placeholder="Contact ${i + 1} Name"
                    value="${escapeHTML(
                        contact.name || ""
                    )}"
                >

                <input
                    id="contactPhone${i}"
                    type="tel"
                    placeholder="Contact ${i + 1} Phone"
                    value="${escapeHTML(
                        contact.phone || ""
                    )}"
                >

            </div>
        `;

    }

    html += `

            <button
                id="saveContactsButton"
                class="form-button"
            >
                Save Contacts
            </button>

            <div
                id="contactStatus"
                class="contact-status"
            ></div>

        </div>

    `;

    openModal(html);


    document
        .getElementById("saveContactsButton")
        .addEventListener(
            "click",
            saveContacts
        );

}


function saveContacts() {

    contacts = [];

    for (let i = 0; i < 5; i++) {

        const name =
            document
                .getElementById(
                    `contactName${i}`
                )
                .value
                .trim();

        const phone =
            document
                .getElementById(
                    `contactPhone${i}`
                )
                .value
                .trim();

        if (name && phone) {

            contacts.push({
                name,
                phone
            });

        }

    }

    if (contacts.length < 5) {

        document
            .getElementById("contactStatus")
            .textContent =
            "Please enter all five trusted contacts.";

        return;

    }

    localStorage.setItem(
        "sheShieldContacts",
        JSON.stringify(contacts)
    );

    document
        .getElementById("contactStatus")
        .textContent =
        "✓ Five trusted contacts saved successfully.";

}


/* =====================================================
   SILENT SOS
===================================================== */

function openSilentSOS() {

    openModal(`

        <h2 class="modal-title">
            Silent SOS
        </h2>

        <p class="modal-subtitle">
            Share your location without siren or screen flash.
        </p>

        <button
            id="silentSOSAction"
            class="action-button"
        >
            📍 SHARE LOCATION SILENTLY
        </button>

        <p
            id="silentStatus"
            class="contact-status"
        >
            Ready
        </p>

    `);


    document
        .getElementById("silentSOSAction")
        .addEventListener(
            "click",
            async () => {

                document
                    .getElementById(
                        "silentStatus"
                    )
                    .textContent =
                    "Getting location...";

                await getAndShareLocation();

                document
                    .getElementById(
                        "silentStatus"
                    )
                    .textContent =
                    "Location sharing completed.";

            }
        );

}


/* =====================================================
   VOICE SOS
===================================================== */

function openVoiceSOS() {

    openModal(`

        <h2 class="modal-title">
            Voice SOS
        </h2>

        <p class="modal-subtitle">
            Say <strong>"PHONE"</strong> to trigger SOS.
        </p>

        <button
            id="startVoiceSOS"
            class="action-button"
        >
            🎙 START VOICE SOS
        </button>

        <button
            id="stopVoiceSOS"
            class="action-button red"
        >
            STOP VOICE SOS
        </button>

        <p
            id="voiceStatus"
            class="contact-status"
        >
            Voice SOS is stopped.
        </p>

    `);


    document
        .getElementById("startVoiceSOS")
        .addEventListener(
            "click",
            startVoiceSOS
        );

    document
        .getElementById("stopVoiceSOS")
        .addEventListener(
            "click",
            stopVoiceSOS
        );

}


function startVoiceSOS() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        document
            .getElementById("voiceStatus")
            .textContent =
            "Voice recognition is not supported in this browser.";

        return;

    }

    voiceRecognition =
        new SpeechRecognition();

    voiceRecognition.continuous = true;

    voiceRecognition.interimResults = true;

    voiceRecognition.lang =
        speechLanguage(selectedLanguage);

    voiceRecognition.onstart = () => {

        voiceListening = true;

        document
            .getElementById("voiceStatus")
            .textContent =
            'Listening... Say "PHONE".';

    };


    voiceRecognition.onresult = event => {

        let text = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            text +=
                event.results[i][0].transcript
                + " ";

        }

        text = text.toLowerCase();

        if (
            text.includes("phone") ||
            text.includes("फोन") ||
            text.includes("ಫೋನ್")
        ) {

            voiceRecognition.stop();

            activateEmergencySOS();

        }

    };


    voiceRecognition.onerror = event => {

        document
            .getElementById("voiceStatus")
            .textContent =
            "Voice recognition error: "
            + event.error;

    };


    voiceRecognition.start();

}


function stopVoiceSOS() {

    if (voiceRecognition) {

        voiceRecognition.stop();

    }

    voiceListening = false;

}


function speechLanguage(lang) {

    const map = {

        en: "en-IN",

        kn: "kn-IN",

        te: "te-IN",

        ta: "ta-IN",

        hi: "hi-IN"

    };

    return map[lang] || "en-IN";

}


/* =====================================================
   SHAKE SOS
===================================================== */

function openShakeSOS() {

    openModal(`

        <h2 class="modal-title">
            Shake SOS
        </h2>

        <p class="modal-subtitle">
            Shake your phone to trigger SOS.
        </p>

        <button
            id="enableShake"
            class="action-button"
        >
            📳 ENABLE SHAKE SOS
        </button>

        <p
            id="shakeStatus"
            class="contact-status"
        >
            Shake detection is off.
        </p>

    `);


    document
        .getElementById("enableShake")
        .addEventListener(
            "click",
            enableShakeDetection
        );

}


async function enableShakeDetection() {

    /* iPhone permission */

    if (
        typeof DeviceMotionEvent !==
        "undefined" &&
        typeof DeviceMotionEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await DeviceMotionEvent
                    .requestPermission();

            if (permission !== "granted") {

                return;

            }

        } catch (error) {

            console.log(error);

        }

    }

    window.addEventListener(
        "devicemotion",
        detectShake
    );

    document
        .getElementById("shakeStatus")
        .textContent =
        "✓ Shake SOS is active. Shake your phone.";

}


function detectShake(event) {

    const acceleration =
        event.accelerationIncludingGravity;

    if (!acceleration) return;

    const magnitude =
        Math.sqrt(

            Math.pow(
                acceleration.x || 0,
                2
            ) +

            Math.pow(
                acceleration.y || 0,
                2
            ) +

            Math.pow(
                acceleration.z || 0,
                2
            )

        );

    const now =
        Date.now();

    if (
        magnitude > 25 &&
        now - shakeLastTime > 1500
    ) {

        shakeLastTime = now;

        activateEmergencySOS();

    }

}


/* =====================================================
   AUTO SOS
===================================================== */

function openAutoSOS() {

    openModal(`

        <h2 class="modal-title">
            Auto SOS
        </h2>

        <p class="modal-subtitle">
            Start a 10-second countdown.
            Stop it before SOS activates.
        </p>

        <button
            id="startAutoSOS"
            class="action-button"
        >
            ⏱ START 10-SECOND COUNTDOWN
        </button>

    `);


    document
        .getElementById("startAutoSOS")
        .addEventListener(
            "click",
            startAutoSOS
        );

}


function startAutoSOS() {

    closeModal();

    document
        .getElementById(
            "countdownOverlay"
        )
        .classList.remove("hidden");

    let seconds = 10;

    document
        .getElementById(
            "countdownNumber"
        )
        .textContent = seconds;


    autoTimer =
        setInterval(() => {

            seconds--;

            document
                .getElementById(
                    "countdownNumber"
                )
                .textContent =
                seconds;

            if (seconds <= 0) {

                clearInterval(autoTimer);

                document
                    .getElementById(
                        "countdownOverlay"
                    )
                    .classList.add("hidden");

                activateEmergencySOS();

            }

        }, 1000);

}


document
    .getElementById("cancelCountdown")
    .addEventListener(
        "click",
        () => {

            clearInterval(autoTimer);

            document
                .getElementById(
                    "countdownOverlay"
                )
                .classList.add("hidden");

        }
    );


/* =====================================================
   CAPTURE EVIDENCE
===================================================== */

function openEvidence() {

    openModal(`

        <h2 class="modal-title">
            Capture Evidence
        </h2>

        <p class="modal-subtitle">
            Capture photos, videos, audio or upload recent files.
        </p>

        <button
            id="cameraButton"
            class="action-button"
        >
            📷 OPEN CAMERA
        </button>

        <button
            id="audioButton"
            class="action-button"
        >
            🎙 RECORD AUDIO
        </button>

        <label
            class="action-button"
            style="display:block;text-align:center"
        >
            📁 UPLOAD RECENT FILES

            <input
                id="evidenceFiles"
                type="file"
                accept="image/*,video/*,audio/*"
                multiple
                hidden
            >

        </label>

        <div id="evidenceResult"></div>

    `);


    document
        .getElementById("cameraButton")
        .addEventListener(
            "click",
            openCamera
        );


    document
        .getElementById("audioButton")
        .addEventListener(
            "click",
            recordAudio
        );


    document
        .getElementById("evidenceFiles")
        .addEventListener(
            "change",
            handleEvidenceFiles
        );

}


async function openCamera() {

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: true,

                    audio: true

                });

        const video =
            document.createElement("video");

        video.srcObject = stream;

        video.autoplay = true;

        video.controls = true;

        video.style.width = "100%";

        video.style.borderRadius = "15px";

        document
            .getElementById(
                "evidenceResult"
            )
            .appendChild(video);


        const capture =
            document.createElement("button");

        capture.className =
            "action-button gold";

        capture.textContent =
            "📸 TAKE PHOTO";

        document
            .getElementById(
                "evidenceResult"
            )
            .appendChild(capture);


        capture.onclick = () => {

            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;

            canvas
                .getContext("2d")
                .drawImage(
                    video,
                    0,
                    0
                );

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                canvas.toDataURL(
                    "image/png"
                );

            image.style.width =
                "100%";

            image.style.marginTop =
                "15px";

            image.style.borderRadius =
                "15px";

            document
                .getElementById(
                    "evidenceResult"
                )
                .appendChild(image);

        };


    } catch (error) {

        alert(
            "Camera permission was denied or unavailable."
        );

    }

}


async function recordAudio() {

    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        alert(
            "Audio recording is not supported."
        );

        return;

    }

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true
                });

        const recorder =
            new MediaRecorder(stream);

        const chunks = [];

        recorder.ondataavailable =
            event => {

                chunks.push(
                    event.data
                );

            };


        recorder.onstop = () => {

            const blob =
                new Blob(
                    chunks,
                    {
                        type:
                            "audio/webm"
                    }
                );

            const url =
                URL.createObjectURL(
                    blob
                );

            const audio =
                document.createElement(
                    "audio"
                );

            audio.controls = true;

            audio.src = url;

            document
                .getElementById(
                    "evidenceResult"
                )
                .appendChild(audio);

        };


        recorder.start();

        alert(
            "Recording started. Click OK to stop."
        );

        recorder.stop();

        stream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );

    } catch (error) {

        alert(
            "Microphone permission was denied."
        );

    }

}


function handleEvidenceFiles(event) {

    const files =
        event.target.files;

    const result =
        document.getElementById(
            "evidenceResult"
        );

    result.innerHTML =
        "<h3>Selected Evidence</h3>";

    [...files].forEach(file => {

        const item =
            document.createElement(
                "p"
            );

        item.textContent =
            "✓ " + file.name;

        result.appendChild(item);

    });

}


/* =====================================================
   FAKE CALL
===================================================== */

function openFakeCall() {

    openModal(`

        <h2 class="modal-title">
            Fake Calling
        </h2>

        <p class="modal-subtitle">
            Simulate an incoming strict father call
            in your selected language.
        </p>

        <button
            id="startFakeCall"
            class="action-button"
        >
            📞 START FAKE CALL
        </button>

        <p class="contact-status">
            The call uses the selected regional language.
        </p>

    `);


    document
        .getElementById("startFakeCall")
        .addEventListener(
            "click",
            () => {

                closeModal();

                setTimeout(
                    startFakeCall,
                    400
                );

            }
        );

}


function startFakeCall() {

    document
        .getElementById(
            "fakeCallOverlay"
        )
        .classList.remove("hidden");

}


document
    .getElementById("rejectFakeCall")
    .addEventListener(
        "click",
        stopFakeCall
    );


document
    .getElementById("answerFakeCall")
    .addEventListener(
        "click",
        speakFather
    );


function speakFather() {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Voice synthesis is not supported in this browser."
        );

        return;

    }

    window.speechSynthesis.cancel();

    const sentences =
        translations[
            selectedLanguage
        ].father;

    let index = 0;


    function speakNext() {

        if (
            index >= sentences.length
        ) {

            return;

        }

        const utterance =
            new SpeechSynthesisUtterance(
                sentences[index]
            );

        utterance.lang =
            speechLanguage(
                selectedLanguage
            );

        /*
         * Lower pitch + moderate speed
         * creates a firmer father-like voice.
         */

        utterance.rate = .82;

        utterance.pitch = .72;

        utterance.volume = 1;


        const voices =
            window.speechSynthesis
                .getVoices();

        const matchingVoice =
            voices.find(
                voice =>
                    voice.lang
                        .toLowerCase()
                        .startsWith(
                            selectedLanguage
                        )
            );

        if (matchingVoice) {

            utterance.voice =
                matchingVoice;

        }


        utterance.onend = () => {

            index++;

            setTimeout(
                speakNext,
                700
            );

        };


        window.speechSynthesis
            .speak(utterance);

    }


    speakNext();

}


function stopFakeCall() {

    window.speechSynthesis.cancel();

    document
        .getElementById(
            "fakeCallOverlay"
        )
        .classList.add("hidden");

}


/* =====================================================
   SAFETY TIPS
===================================================== */

function openTips() {

    openModal(`

        <h2 class="modal-title">
            Safety Tips
        </h2>

        <p class="modal-subtitle">
            Practical steps that can help during an unsafe situation.
        </p>

        <div class="tips-list">

            <p>🛡️ Move to a public and well-lit place.</p>

            <p>📱 Keep your phone accessible.</p>

            <p>👥 Contact someone you trust.</p>

            <p>📍 Share your location when appropriate.</p>

            <p>🚪 If possible, move toward a safe exit.</p>

            <p>🚨 Contact emergency services if you are in immediate danger.</p>

            <p>🎥 Preserve useful evidence when it is safe to do so.</p>

            <p>💡 Trust your instincts and prioritize getting somewhere safe.</p>

        </div>

    `);

}


/* =====================================================
   HELPLINES
===================================================== */

function openHelplines() {

    openModal(`

        <h2 class="modal-title">
            Help Lines
        </h2>

        <p class="modal-subtitle">
            Emergency contacts
        </p>

        <a
            href="tel:112"
            class="action-button red"
            style="display:block;text-align:center;text-decoration:none"
        >
            🚨 Police / Emergency — 112
        </a>

        <a
            href="tel:108"
            class="action-button"
            style="display:block;text-align:center;text-decoration:none"
        >
            🚑 Ambulance — 108
        </a>

        <a
            href="tel:181"
            class="action-button gold"
            style="display:block;text-align:center;text-decoration:none"
        >
            👩 Women Helpline — 181
        </a>

        <p class="contact-status">
            Use emergency services when you are in immediate danger.
        </p>

    `);

}


/* =====================================================
   BATTERY SAVER
===================================================== */

function openBatterySaver() {

    openModal(`

        <h2 class="modal-title">
            Battery Saver Mode
        </h2>

        <p class="modal-subtitle">
            This browser-based mode reduces unnecessary visual
            activity and animations during an emergency.
        </p>

        <button
            id="batteryToggle"
            class="action-button"
        >
            🔋 ACTIVATE BATTERY SAVER
        </button>

        <p class="contact-status">
            Browser websites cannot directly control the phone's
            system battery settings.
        </p>

    `);


    document
        .getElementById("batteryToggle")
        .addEventListener(
            "click",
            toggleBatterySaver
        );

}


function toggleBatterySaver() {

    batterySaver =
        !batterySaver;

    document
        .body
        .classList
        .toggle(
            "battery-saving",
            batterySaver
        );

    document
        .getElementById(
            "batteryIndicator"
        )
        .classList
        .toggle(
            "hidden",
            !batterySaver
        );

    const button =
        document
            .getElementById(
                "batteryToggle"
            );

    if (button) {

        button.textContent =
            batterySaver
                ? "🔋 BATTERY SAVER ACTIVE"
                : "🔋 ACTIVATE BATTERY SAVER";

    }

}


/* =====================================================
   CUSTOMER ISSUES
===================================================== */

function openCustomerIssues() {

    openModal(`

        <h2 class="modal-title">
            Customer Issues
        </h2>

        <p class="modal-subtitle">
            Tell us about a problem or suggestion.
        </p>

        <div class="form-grid">

            <input
                id="issueName"
                placeholder="Your name"
            >

            <input
                id="issueEmail"
                type="email"
                placeholder="Email"
            >

            <textarea
                id="issueText"
                placeholder="Describe your issue..."
            ></textarea>

            <button
                id="submitIssue"
                class="form-button"
            >
                Submit Issue
            </button>

            <div
                id="issueStatus"
                class="contact-status"
            ></div>

        </div>

    `);


    document
        .getElementById("submitIssue")
        .addEventListener(
            "click",
            () => {

                const issue =
                    document
                        .getElementById(
                            "issueText"
                        )
                        .value
                        .trim();

                if (!issue) {

                    document
                        .getElementById(
                            "issueStatus"
                        )
                        .textContent =
                        "Please describe the issue.";

                    return;

                }

                const issues =
                    JSON.parse(
                        localStorage.getItem(
                            "sheShieldIssues"
                        ) || "[]"
                    );

                issues.push({

                    name:
                        document
                            .getElementById(
                                "issueName"
                            )
                            .value,

                    email:
                        document
                            .getElementById(
                                "issueEmail"
                            )
                            .value,

                    issue,

                    date:
                        new Date()
                            .toLocaleString()

                });

                localStorage.setItem(
                    "sheShieldIssues",
                    JSON.stringify(
                        issues
                    )
                );

                document
                    .getElementById(
                        "issueStatus"
                    )
                    .textContent =
                    "✓ Your issue has been saved for this browser session.";

            }
        );

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   INITIALIZATION
===================================================== */

window.addEventListener(
    "beforeunload",
    () => {

        if (voiceRecognition) {

            try {

                voiceRecognition.stop();

            } catch (e) {}

        }

        window.speechSynthesis?.cancel();

        stopSiren();

    }
);
