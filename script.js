/* =========================================================
   SHE-SHIELD
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {

    language:
        localStorage.getItem("sheShieldLanguage") || "en",

    batterySaver: false,

    shakeEnabled: false,

    voiceListening: false,

    cameraStream: null,

    audioStream: null,

    videoStream: null,

    autoTimer: null,

    autoSeconds: 10,

    fakeCallActive: false,

    fakeCallTimer: null,

    sirenPlaying: false

};


/* =========================================================
   DOM
========================================================= */

const splash =
    document.getElementById("splashScreen");

const app =
    document.getElementById("app");

const languageSelect =
    document.getElementById("languageSelect");

const mobileMenu =
    document.getElementById("mobileMenu");

const featureOverlay =
    document.getElementById("featureOverlay");

const sirenAudio =
    document.getElementById("sirenAudio");


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        tagline:
            "Your Safety. Our Priority.",

        emergency:
            "Emergency SOS",

        safety:
            "Immediate Safety",

        activate:
            "Activate SOS",

        explore:
            "Explore Safety"

    },

    kn: {

        tagline:
            "ನಿಮ್ಮ ಸುರಕ್ಷತೆ. ನಮ್ಮ ಆದ್ಯತೆ.",

        emergency:
            "ತುರ್ತು SOS",

        safety:
            "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",

        activate:
            "SOS ಸಕ್ರಿಯಗೊಳಿಸಿ",

        explore:
            "ಸುರಕ್ಷತೆ ತೆರೆಯಿರಿ"

    },

    te: {

        tagline:
            "మీ భద్రత. మా ప్రాధాన్యత.",

        emergency:
            "అత్యవసర SOS",

        safety:
            "తక్షణ భద్రత",

        activate:
            "SOS ప్రారంభించండి",

        explore:
            "భద్రతను తెరవండి"

    },

    ta: {

        tagline:
            "உங்கள் பாதுகாப்பு. எங்கள் முன்னுரிமை.",

        emergency:
            "அவசர SOS",

        safety:
            "உடனடி பாதுகாப்பு",

        activate:
            "SOS தொடங்கு",

        explore:
            "பாதுகாப்பை திற"

    },

    hi: {

        tagline:
            "आपकी सुरक्षा. हमारी प्राथमिकता.",

        emergency:
            "आपातकालीन SOS",

        safety:
            "तत्काल सुरक्षा",

        activate:
            "SOS सक्रिय करें",

        explore:
            "सुरक्षा खोलें"

    }

};


/* =========================================================
   FAKE CALL DIALOGUES
========================================================= */

const fatherDialogue = {

    en: [
        "Hello? Where are you right now?",
        "I told you to call me when you reach there.",
        "Listen carefully. Don't stay alone if something feels wrong.",
        "Move somewhere safe and stay around other people.",
        "Keep your phone with you and keep the location on.",
        "Call me back immediately when you are safe.",
        "And don't ignore me when I am calling you.",
        "I want you to come home safely. Do you understand?",
        "Stay there. I am coming."
    ],

    kn: [
        "ಹಲೋ? ನೀನು ಈಗ ಎಲ್ಲಿದ್ದೀಯ?",
        "ಅಲ್ಲಿ ತಲುಪಿದ ಮೇಲೆ ನನಗೆ ಕರೆ ಮಾಡು ಅಂತ ಹೇಳಿದ್ದೆ.",
        "ಜಾಗ್ರತೆ. ಏನಾದರೂ ಸರಿಯಿಲ್ಲ ಅನ್ನಿಸಿದರೆ ಒಬ್ಬಳೇ ಇರಬೇಡ.",
        "ಸುರಕ್ಷಿತವಾದ, ಜನರು ಇರುವ ಜಾಗಕ್ಕೆ ಹೋಗು.",
        "ಫೋನ್ ನಿನ್ನ ಬಳಿ ಇಟ್ಟುಕೋ ಮತ್ತು ಲೊಕೇಶನ್ ಆನ್ ಇಟ್ಟುಕೋ.",
        "ಸುರಕ್ಷಿತವಾದ ತಕ್ಷಣ ನನಗೆ ಕರೆ ಮಾಡು.",
        "ನಾನು ಕರೆ ಮಾಡಿದಾಗ ನಿರ್ಲಕ್ಷ್ಯ ಮಾಡಬೇಡ.",
        "ನೀನು ಸುರಕ್ಷಿತವಾಗಿ ಮನೆಗೆ ಬರಬೇಕು. ಅರ್ಥ ಆಯ್ತಾ?",
        "ಅಲ್ಲೇ ಇರು. ನಾನು ಬರುತ್ತಿದ್ದೇನೆ."
    ],

    te: [
        "హలో? నువ్వు ఇప్పుడు ఎక్కడ ఉన్నావు?",
        "అక్కడికి వెళ్లిన తర్వాత నాకు కాల్ చేయమని చెప్పాను.",
        "జాగ్రత్తగా విను. ఏదైనా తప్పుగా అనిపిస్తే ఒంటరిగా ఉండకు.",
        "సురక్షితమైన, జనాలు ఉన్న ప్రదేశానికి వెళ్లు.",
        "ఫోన్ నీ దగ్గర ఉంచుకో మరియు లొకేషన్ ఆన్‌లో ఉంచు.",
        "సురక్షితంగా ఉన్న వెంటనే నాకు కాల్ చేయి.",
        "నేను కాల్ చేస్తున్నప్పుడు పట్టించుకోకుండా ఉండకు.",
        "నువ్వు సురక్షితంగా ఇంటికి రావాలి. అర్థమైందా?",
        "అక్కడే ఉండు. నేను వస్తున్నాను."
    ],

    ta: [
        "ஹலோ? நீ இப்போது எங்கே இருக்கிறாய்?",
        "அங்கே சென்றதும் எனக்கு அழைக்கச் சொன்னேனே.",
        "கவனமாக கேள். ஏதாவது தவறாக இருந்தால் தனியாக இருக்காதே.",
        "பாதுகாப்பான, மக்கள் இருக்கும் இடத்திற்குச் செல்.",
        "தொலைபேசியை உன்னிடம் வைத்துக்கொள், லொகேஷனை ஆன் செய்.",
        "பாதுகாப்பாக இருந்ததும் உடனே எனக்கு அழை.",
        "நான் அழைக்கும்போது புறக்கணிக்காதே.",
        "நீ பாதுகாப்பாக வீட்டிற்கு வர வேண்டும். புரிகிறதா?",
        "அங்கேயே இரு. நான் வருகிறேன்."
    ],

    hi: [
        "हेलो? तुम अभी कहाँ हो?",
        "वहाँ पहुँचने के बाद मुझे फोन करने को कहा था.",
        "ध्यान से सुनो. अगर कुछ गलत लगे तो अकेली मत रहना.",
        "किसी सुरक्षित और लोगों वाली जगह पर जाओ.",
        "फोन अपने पास रखो और लोकेशन चालू रखो.",
        "सुरक्षित होते ही मुझे फोन करना.",
        "जब मैं फोन कर रहा हूँ तो नजरअंदाज मत करना.",
        "तुम्हें सुरक्षित घर आना है. समझी?",
        "वहीं रहो. मैं आ रहा हूँ."
    ]

};


/* =========================================================
   SPLASH
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        splash.classList.add("hidden");

        app.classList.remove("hidden");

    }, 3200);

});


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active-page");

            page.style.display = "none";

        });


    const target =
        document.getElementById(pageId);

    if (!target) return;

    target.style.display = "block";

    target.classList.add("active-page");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    closeMobileMenu();

}


document.addEventListener("click", event => {

    const pageButton =
        event.target.closest("[data-page]");

    if (!pageButton) return;

    const page =
        pageButton.dataset.page;

    showPage(page);

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");


menuButton?.addEventListener(
    "click",
    () => {

        mobileMenu.classList.add("open");

    }
);


closeMenu?.addEventListener(
    "click",
    closeMobileMenu
);


function closeMobileMenu() {

    mobileMenu?.classList.remove("open");

}


/* =========================================================
   LANGUAGE
========================================================= */

function setLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    state.language = language;

    localStorage.setItem(
        "sheShieldLanguage",
        language
    );


    languageSelect.value = language;


    document
        .querySelectorAll(".pageLanguageSelect")
        .forEach(select => {

            select.value = language;

        });


    const data =
        translations[language];


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (data[key]) {

                element.textContent =
                    data[key];

            }

        });


    const fakeLanguage =
        document.getElementById(
            "fakeCallLanguage"
        );

    if (fakeLanguage) {

        fakeLanguage.textContent =
            getLanguageName(language);

    }

}


function getLanguageName(language) {

    const names = {

        en: "English",

        kn: "ಕನ್ನಡ",

        te: "తెలుగు",

        ta: "தமிழ்",

        hi: "हिन्दी"

    };

    return names[language] || "English";

}


languageSelect?.addEventListener(
    "change",
    event => {

        setLanguage(event.target.value);

    }
);


document
    .querySelectorAll(".pageLanguageSelect")
    .forEach(select => {

        select.addEventListener(
            "change",
            event => {

                setLanguage(event.target.value);

            }
        );

    });


setLanguage(state.language);


/* =========================================================
   SIREN
========================================================= */

function startSiren() {

    if (!sirenAudio) return;

    sirenAudio.currentTime = 0;

    sirenAudio
        .play()
        .then(() => {

            state.sirenPlaying = true;

        })
        .catch(error => {

            console.log(
                "Siren requires user interaction:",
                error
            );

        });

}


function stopSiren() {

    if (!sirenAudio) return;

    sirenAudio.pause();

    sirenAudio.currentTime = 0;

    state.sirenPlaying = false;

}


document
    .getElementById("quickSiren")
    ?.addEventListener(
        "click",
        startSiren
    );


document
    .getElementById("quickStopSiren")
    ?.addEventListener(
        "click",
        stopSiren
    );


document
    .getElementById("emergencySiren")
    ?.addEventListener(
        "click",
        startSiren
    );


/* =========================================================
   LOCATION
========================================================= */

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

            error => {

                reject(error);

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    });

}


async function shareLocation() {

    try {

        const location =
            await getLocation();


        const url =
            `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;


        const text =
            `SHE-SHIELD Emergency Location: ${url}`;


        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                    "SHE-SHIELD Emergency Location",

                text:

                    "Please check my location.",

                url

            });

        } else {

            const whatsapp =
                `https://wa.me/?text=${encodeURIComponent(text)}`;

            window.open(
                whatsapp,
                "_blank"
            );

        }


        return location;

    }

    catch (error) {

        alert(
            "Location permission is required to share your location."
        );

        throw error;

    }

}


/* =========================================================
   EMERGENCY SOS
========================================================= */

const mainSOS =
    document.getElementById("mainSOS");

const stopEmergency =
    document.getElementById("stopEmergency");

const emergencyCountdown =
    document.getElementById(
        "emergencyCountdown"
    );

const emergencyStatus =
    document.getElementById(
        "emergencyStatus"
    );


mainSOS?.addEventListener(
    "click",
    async () => {

        emergencyStatus.textContent =
            "SOS activated. Getting your location...";


        try {

            await shareLocation();

        }

        catch (error) {

            console.log(error);

        }


        startSiren();

        emergencyStatus.textContent =
            "Emergency SOS activated";


        stopEmergency.classList.remove(
            "hidden"
        );

    }
);


stopEmergency?.addEventListener(
    "click",
    () => {

        stopSiren();

        emergencyStatus.textContent =
            "Emergency stopped";

        stopEmergency.classList.add(
            "hidden"
        );

    }
);


document
    .getElementById("emergencyCall")
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "tel:112";

        }
    );


document
    .getElementById("emergencyLocation")
    ?.addEventListener(
        "click",
        shareLocation
    );


/* =========================================================
   SILENT SOS
========================================================= */

document
    .getElementById("silentSOS")
    ?.addEventListener(
        "click",
        async () => {

            try {

                await shareLocation();

                alert(
                    "Silent SOS activated. Location sharing completed."
                );

            }

            catch (error) {

                console.log(error);

            }

        }
    );


/* =========================================================
   AUTO SOS
========================================================= */

let autoInterval = null;


document
    .getElementById("autoSOS")
    ?.addEventListener(
        "click",
        startAutoSOS
    );


function startAutoSOS() {

    clearInterval(autoInterval);

    let seconds = 10;

    emergencyCountdown.classList.remove(
        "hidden"
    );

    stopEmergency.classList.remove(
        "hidden"
    );

    emergencyCountdown.textContent =
        seconds;


    showPage("emergency");


    emergencyStatus.textContent =
        "Auto SOS countdown started";


    autoInterval =
        setInterval(
            () => {

                seconds--;

                emergencyCountdown.textContent =
                    seconds;


                if (seconds <= 0) {

                    clearInterval(
                        autoInterval
                    );

                    activateEmergency();

                }

            },
            1000
        );

}


async function activateEmergency() {

    emergencyStatus.textContent =
        "Auto SOS activated";


    startSiren();


    try {

        await shareLocation();

    }

    catch (error) {

        console.log(error);

    }

}


stopEmergency?.addEventListener(
    "click",
    () => {

        if (autoInterval) {

            clearInterval(
                autoInterval
            );

            autoInterval = null;

        }

        emergencyCountdown.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   VOICE SOS
========================================================= */

let recognition = null;


document
    .getElementById("voiceSOS")
    ?.addEventListener(
        "click",
        startVoiceSOS
    );


function startVoiceSOS() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice SOS is not supported by this browser."
        );

        return;

    }


    if (state.voiceListening) {

        stopVoiceSOS();

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang =
        getSpeechLanguage(state.language);


    recognition.onstart =
        () => {

            state.voiceListening = true;

            alert(
                "Voice SOS listening started. Say 'phone' to trigger SOS."
            );

        };


    recognition.onresult =
        event => {

            let text = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                text +=
                    event.results[i][0].transcript;

            }


            text =
                text.toLowerCase();


            if (
                text.includes("phone") ||
                text.includes("ಫೋನ್") ||
                text.includes("ఫోన్") ||
                text.includes("போன்") ||
                text.includes("फोन")
            ) {

                triggerVoiceSOS();

            }

        };


    recognition.onerror =
        error => {

            console.log(
                "Voice recognition:",
                error
            );

        };


    recognition.onend =
        () => {

            state.voiceListening = false;

        };


    recognition.start();

}


function stopVoiceSOS() {

    if (recognition) {

        recognition.stop();

    }

    state.voiceListening = false;

}


async function triggerVoiceSOS() {

    stopVoiceSOS();


    alert(
        "Voice SOS triggered."
    );


    try {

        await shareLocation();

    }

    catch (error) {

        console.log(error);

    }

}


function getSpeechLanguage(language) {

    const languages = {

        en: "en-IN",

        kn: "kn-IN",

        te: "te-IN",

        ta: "ta-IN",

        hi: "hi-IN"

    };

    return languages[language] || "en-IN";

}


/* =========================================================
   SHAKE SOS
========================================================= */

document
    .getElementById("shakeSOS")
    ?.addEventListener(
        "click",
        enableShakeSOS
    );


async function enableShakeSOS() {

    if (
        typeof DeviceMotionEvent !==
        "undefined" &&
        typeof DeviceMotionEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await DeviceMotionEvent.requestPermission();

            if (
                permission !== "granted"
            ) {

                alert(
                    "Motion permission was not granted."
                );

                return;

            }

        }

        catch (error) {

            console.log(error);

            return;

        }

    }


    if (state.shakeEnabled) {

        alert(
            "Shake SOS is already enabled."
        );

        return;

    }


    state.shakeEnabled = true;

    window.addEventListener(
        "devicemotion",
        handleShake
    );


    alert(
        "Shake SOS enabled. Shake the phone firmly to trigger SOS."
    );

}


let lastShake = 0;


function handleShake(event) {

    const acceleration =
        event.accelerationIncludingGravity;


    if (!acceleration) return;


    const x =
        acceleration.x || 0;

    const y =
        acceleration.y || 0;

    const z =
        acceleration.z || 0;


    const force =
        Math.sqrt(
            x * x +
            y * y +
            z * z
        );


    const now =
        Date.now();


    if (
        force > 25 &&
        now - lastShake > 2000
    ) {

        lastShake = now;

        triggerShakeSOS();

    }

}


async function triggerShakeSOS() {

    startSiren();


    try {

        await shareLocation();

    }

    catch (error) {

        console.log(error);

    }


    alert(
        "Shake SOS activated."
    );

}


/* =========================================================
   FLASH
========================================================= */

document
    .getElementById("flashButton")
    ?.addEventListener(
        "click",
        () => {

            document.body.classList.add(
