/* =========================================================
   SHE-SHIELD
   Women Safety Emergency Platform
   ========================================================= */


/* ================= GLOBAL ================= */

const state = {
    language: localStorage.getItem("sheShieldLanguage") || "en",
    contacts: JSON.parse(
        localStorage.getItem("sheShieldContacts") || "[]"
    ),
    batterySaver: false,
    voiceListening: false,
    shakeEnabled: false,
    cameraStream: null,
    mediaRecorder: null,
    recordedChunks: [],
    autoTimer: null,
    countdown: 10
};


/* ================= SPLASH ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("splashScreen")
            .classList.add("hidden");

        document.getElementById("languageScreen")
            .classList.remove("hidden");

    }, 3000);

});


/* ================= LANGUAGE ================= */

const languageButtons =
    document.querySelectorAll(".languages button");

let selectedLanguage = state.language;

languageButtons.forEach(button => {

    if (button.dataset.lang === selectedLanguage) {
        button.classList.add("selected");
    }

    button.addEventListener("click", () => {

        languageButtons.forEach(btn =>
            btn.classList.remove("selected")
        );

        button.classList.add("selected");

        selectedLanguage = button.dataset.lang;

    });

});


document.getElementById("continueBtn")
    .addEventListener("click", () => {

        state.language = selectedLanguage;

        localStorage.setItem(
            "sheShieldLanguage",
            selectedLanguage
        );

        document.getElementById("languageScreen")
            .classList.add("hidden");

        document.getElementById("app")
            .classList.remove("hidden");

        speakReadyMessage();

    });


/* ================= NAVIGATION ================= */

function showPage(pageName) {

    document.querySelectorAll(".page")
        .forEach(page => page.classList.remove("active"));

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }

    document.getElementById("menu")
        .classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


document.querySelectorAll("[data-page]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showPage(button.dataset.page);

        });

    });


/* ================= MENU ================= */

document.getElementById("menuBtn")
    .addEventListener("click", () => {

        document.getElementById("menu")
            .classList.toggle("open");

    });


/* ================= LOCATION ================= */

function getLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject("Geolocation is not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {

                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

            },

            error => {
                reject(error.message);
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    });

}


/* ================= SHARE LOCATION ================= */

async function shareLocation() {

    try {

        const location = await getLocation();

        const mapURL =
            `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

        const message =
            `SHE-SHIELD Emergency Location:\n${mapURL}`;

        if (navigator.share) {

            await navigator.share({
                title: "SHE-SHIELD Emergency",
                text: message
            });

        } else {

            await navigator.clipboard.writeText(message);

            alert(
                "Location link copied. Send it to your trusted contact."
            );

        }

        return true;

    } catch (error) {

        alert(
            "Unable to get/share location. Please allow location permission."
        );

        return false;
    }

}


/* ================= SIREN ================= */

const siren = new Audio("siren.mp3");

siren.loop = true;

function startSiren() {
    siren.currentTime = 0;
    siren.play().catch(() => {});
}

function stopSiren() {
    siren.pause();
    siren.currentTime = 0;
}


/* ================= FLASH ================= */

function screenFlash() {

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "white";
    flash.style.zIndex = "10000";
    flash.style.opacity = "1";

    document.body.appendChild(flash);

    let count = 0;

    const interval = setInterval(() => {

        flash.style.opacity =
            flash.style.opacity === "1" ? "0" : "1";

        count++;

        if (count >= 8) {

            clearInterval(interval);
            flash.remove();

        }

    }, 180);

}


/* ================= MAIN SOS ================= */

async function triggerSOS(options = {}) {

    const {
        sirenOn = true,
        flashOn = false,
        locationOn = true
    } = options;

    const status =
        document.getElementById("sosStatus");

    if (status) {
        status.textContent = "SOS ACTIVATED";
        status.style.color = "#c7191e";
    }

    if (sirenOn) {
        startSiren();
    }

    if (flashOn) {
        screenFlash();
    }

    if (locationOn) {
        await shareLocation();
    }

    addIncident("SOS activated");

}


/* ================= SOS BUTTON ================= */

const sosButton =
    document.getElementById("sosButton");

let pressTimer = null;

sosButton.addEventListener("pointerdown", () => {

    sosButton.style.transform = "scale(.95)";

    pressTimer = setTimeout(() => {

        triggerSOS({
            sirenOn: true,
            flashOn: true,
            locationOn: true
        });

    }, 1500);

});


["pointerup", "pointerleave"].forEach(event => {

    sosButton.addEventListener(event, () => {

        clearTimeout(pressTimer);

        sosButton.style.transform = "scale(1)";

    });

});


/* ================= EMERGENCY LOCATION ================= */

document.getElementById("emergencyLocation")
    .addEventListener("click", shareLocation);


/* ================= SILENT SOS ================= */

document.getElementById("silentSOS")
    .addEventListener("click", async () => {

        await triggerSOS({
            sirenOn: false,
            flashOn: false,
            locationOn: true
        });

        alert(
            "Silent SOS activated. Location sharing initiated."
        );

    });


/* ================= VOICE SOS ================= */

let recognition = null;

function startVoiceSOS() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;

    }

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;

    const languageMap = {
        en: "en-IN",
        kn: "kn-IN",
        te: "te-IN",
        ta: "ta-IN",
        hi: "hi-IN"
    };

    recognition.lang =
        languageMap[state.language] || "en-IN";


    recognition.onresult = event => {

        const last =
            event.results[event.results.length - 1][0]
                .transcript
                .toLowerCase()
                .trim();

        console.log("Voice:", last);

        if (
            last.includes("phone") ||
            last.includes("फोन") ||
            last.includes("ಫೋನ್") ||
            last.includes("ఫోన్") ||
            last.includes("போன்")
        ) {

            triggerSOS({
                sirenOn: true,
                flashOn: true,
                locationOn: true
            });

        }

    };


    recognition.onerror = error => {
        console.log("Voice recognition:", error);
    };


    recognition.onend = () => {

        if (state.voiceListening) {

            try {
                recognition.start();
            } catch(e) {}

        }

    };


    state.voiceListening = true;

    recognition.start();

    alert(
        'Voice SOS activated.\nSay "PHONE" to trigger SOS.'
    );

}


function stopVoiceSOS() {

    state.voiceListening = false;

    if (recognition) {

        recognition.stop();
        recognition = null;

    }

}


document.getElementById("voiceSOS")
    .addEventListener("click", () => {

        if (state.voiceListening) {

            stopVoiceSOS();

            alert("Voice SOS stopped.");

        } else {

            startVoiceSOS();

        }

    });


/* ================= SHAKE SOS ================= */

let lastX = null;
let lastY = null;
let lastZ = null;

function enableShakeSOS() {

    if (state.shakeEnabled) {

        state.shakeEnabled = false;

        alert("Shake SOS disabled.");

        return;

    }


    const startShake = () => {

        state.shakeEnabled = true;

        window.addEventListener(
            "devicemotion",
            detectShake
        );

        alert(
            "Shake SOS enabled.\nShake your phone strongly to activate SOS."
        );

    };


    if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
    ) {

        DeviceMotionEvent.requestPermission()
            .then(permission => {

                if (permission === "granted") {
                    startShake();
                } else {
                    alert("Motion permission denied.");
                }

            })
            .catch(() => {
                alert("Motion permission is required.");
            });

    } else {

        startShake();

    }

}


function detectShake(event) {

    if (!state.shakeEnabled) return;

    const acceleration = event.accelerationIncludingGravity;

    if (!acceleration) return;

    const x = acceleration.x || 0;
    const y = acceleration.y || 0;
    const z = acceleration.z || 0;

    if (lastX !== null) {

        const delta =
            Math.abs(x - lastX) +
            Math.abs(y - lastY) +
            Math.abs(z - lastZ);

        if (delta > 35) {

            state.shakeEnabled = false;

            window.removeEventListener(
                "devicemotion",
                detectShake
            );

            triggerSOS({
                sirenOn: true,
                flashOn: false,
                locationOn: true
            });

        }

    }

    lastX = x;
    lastY = y;
    lastZ = z;

}


document.getElementById("shakeSOS")
    .addEventListener("click", enableShakeSOS);


/* ================= AUTO SOS ================= */

const autoModal =
    document.getElementById("autoModal");

const countdown =
    document.getElementById("countdown");


document.getElementById("autoSOS")
    .addEventListener("click", startAutoSOS);


function startAutoSOS() {

    clearInterval(state.autoTimer);

    state.countdown = 10;

    countdown.textContent = state.countdown;

    autoModal.classList.remove("hidden");

    state.autoTimer = setInterval(() => {

        state.countdown--;

        countdown.textContent =
            state.countdown;

        if (state.countdown <= 0) {

            clearInterval(state.autoTimer);

            autoModal.classList.add("hidden");

            triggerSOS({
                sirenOn: true,
                flashOn: false,
                locationOn: true
            });

        }

    }, 1000);

}


document.getElementById("stopAuto")
    .addEventListener("click", () => {

        clearInterval(state.autoTimer);

        autoModal.classList.add("hidden");

        alert("Auto SOS stopped.");

    });


/* ================= CONTACTS ================= */

const contactInputs =
    document.getElementById("contactInputs");


function createContactInputs() {

    contactInputs.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const saved =
            state.contacts[i] || {
                name: "",
                phone: ""
            };

        const row =
            document.createElement("div");

        row.className = "contact-row";

        row.innerHTML = `

            <input
                type="text"
                placeholder="Contact ${i + 1} Name"
                value="${saved.name || ""}"
                data-name="${i}"
            >

            <input
                type="tel"
                placeholder="Contact ${i + 1} Phone"
                value="${saved.phone || ""}"
                data-phone="${i}"
            >

        `;

        contactInputs.appendChild(row);

    }

}

createContactInputs();


document.getElementById("saveContacts")
    .addEventListener("click", () => {

        const contacts = [];

        for (let i = 0; i < 5; i++) {

            const name =
                document.querySelector(
                    `[data-name="${i}"]`
                ).value.trim();

            const phone =
                document.querySelector(
                    `[data-phone="${i}"]`
                ).value.trim();

            if (!name || !phone) {

                document.getElementById(
                    "contactStatus"
                ).textContent =
                    `Please complete Contact ${i + 1}.`;

                return;

            }

            contacts.push({
                name,
                phone
            });

        }

        state.contacts = contacts;

        localStorage.setItem(
            "sheShieldContacts",
            JSON.stringify(contacts)
        );

        document.getElementById(
            "contactStatus"
        ).textContent =
            "✓ Five trusted contacts saved successfully.";

    });


/* ================= EVIDENCE ================= */

const cameraPreview =
    document.getElementById("cameraPreview");


document.getElementById("cameraBtn")
    .addEventListener("click", async () => {

        try {

            state.cameraStream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

            cameraPreview.srcObject =
                state.cameraStream;

            cameraPreview.classList.remove("hidden");

        } catch (error) {

            alert(
                "Camera and microphone permission is required."
            );

        }

    });


/* ================= PHOTO ================= */

document.getElementById("photoBtn")
    .addEventListener("click", () => {

        if (!state.cameraStream) {

            alert("Open camera first.");
            return;

        }

        const canvas =
            document.createElement("canvas");

        canvas.width =
            cameraPreview.videoWidth;

        canvas.height =
            cameraPreview.videoHeight;

        const ctx =
            canvas.getContext("2d");

        ctx.drawImage(
            cameraPreview,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const image =
            document.createElement("img");

        image.src =
            canvas.toDataURL("image/png");

        image.className =
            "camera-preview";

        document.getElementById(
            "evidencePreview"
        ).prepend(image);

    });


/* ================= VIDEO ================= */

document.getElementById("videoBtn")
    .addEventListener("click", () => {

        if (!state.cameraStream) {

            alert("Open camera first.");
            return;

        }

        state.recordedChunks = [];

        state.mediaRecorder =
            new MediaRecorder(
                state.cameraStream
            );

        state.mediaRecorder.ondataavailable =
            event => {

                if (event.data.size > 0) {

                    state.recordedChunks.push(
                        event.data
                    );

                }

            };


        state.mediaRecorder.onstop = () => {

            const blob =
                new Blob(
                    state.recordedChunks,
                    { type: "video/webm" }
                );

            const url =
                URL.createObjectURL(blob);

            const video =
                document.createElement("video");

            video.src = url;
            video.controls = true;
            video.className = "camera-preview";

            document.getElementById(
                "evidencePreview"
            ).prepend(video);

        };


        state.mediaRecorder.start();

        alert("Video recording started.");

    });


document.getElementById("stopVideoBtn")
    .addEventListener("click", () => {

        if (
            state.mediaRecorder &&
            state.mediaRecorder.state !== "inactive"
        ) {

            state.mediaRecorder.stop();

            alert("Video recording stopped.");

        }

    });


/* ================= AUDIO ================= */

let audioRecorder = null;
let audioChunks = [];


document.getElementById("audioBtn")
    .addEventListener("click", async () => {

        try {

            const stream =
                await navigator.mediaDevices
                    .getUserMedia({
                        audio: true
                    });

            audioChunks = [];

            audioRecorder =
                new MediaRecorder(stream);

            audioRecorder.ondataavailable =
                event => {

                    audioChunks.push(event.data);

                };


            audioRecorder.onstop = () => {

                const blob =
                    new Blob(
                        audioChunks,
                        { type: "audio/webm" }
                    );

                const url =
                    URL.createObjectURL(blob);

                const audio =
                    document.createElement("audio");

                audio.controls = true;
                audio.src = url;

                document.getElementById(
                    "evidencePreview"
                ).prepend(audio);

                stream.getTracks().forEach(
                    track => track.stop()
                );

            };


            audioRecorder.start();

            alert("Audio recording started.");

        } catch (error) {

            alert(
                "Microphone permission is required."
            );

        }

    });


document.getElementById("stopAudioBtn")
    .addEventListener("click", () => {

        if (
            audioRecorder &&
            audioRecorder.state !== "inactive"
        ) {

            audioRecorder.stop();

        }

    });


/* ================= FILE UPLOAD ================= */

document.getElementById("fileUpload")
    .addEventListener("change", event => {

        const files = event.target.files;

        const container =
            document.getElementById(
                "evidencePreview"
            );

        Array.from(files).forEach(file => {

            const item =
                document.createElement("div");

            item.className =
                "evidence-item";

            item.innerHTML = `
                <strong>${file.name}</strong>
                <br>
                <small>
                    ${(file.size / 1024).toFixed(1)} KB
                </small>
            `;

            container.prepend(item);

        });

    });


/* ================= FAKE CALL ================= */

const fakeCallScreen =
    document.getElementById("fakeCallScreen");


const fatherScripts = {

    en: [
        "Hello? Where are you?",
        "Why haven't you told me where you are?",
        "Listen carefully and stay somewhere safe.",
        "Don't walk around alone if something feels wrong.",
        "Call me back immediately when you are safe.",
        "Keep your phone with you.",
        "I need you to be careful, understood?",
        "Do not ignore my calls.",
        "Get to a safe place first.",
        "Then call me."
    ],

    kn: [
        "ಹಲೋ? ನೀನು ಎಲ್ಲಿದ್ದೀಯ?",
        "ನೀನು ಎಲ್ಲಿದ್ದೀಯ ಅಂತ ನನಗೆ ಏಕೆ ಹೇಳಲಿಲ್ಲ?",
        "ಜಾಗ್ರತೆಯಿಂದ ಕೇಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿರು.",
        "ಏನಾದರೂ ತಪ್ಪಾಗಿದೆ ಅನ್ನಿಸಿದರೆ ಒಬ್ಬಳೇ ಹೋಗಬೇಡ.",
        "ಸುರಕ್ಷಿತವಾದ ತಕ್ಷಣ ನನಗೆ ಕರೆ ಮಾಡು.",
        "ಫೋನ್ ನಿನ್ನ ಹತ್ತಿರ ಇಟ್ಟುಕೋ.",
        "ಜಾಗ್ರತೆಯಿಂದ ಇರಬೇಕು, ಅರ್ಥ ಆಯ್ತಾ?",
        "ನನ್ನ ಕರೆಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಬೇಡ.",
        "ಮೊದಲು ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಹೋಗು.",
        "ಆಮೇಲೆ ನನಗೆ ಕರೆ ಮಾಡು."
    ],

    te: [
        "హలో? నువ్వు ఎక్కడ ఉన్నావు?",
        "నువ్వు ఎక్కడ ఉన్నావో నాకు ఎందుకు చెప్పలేదు?",
        "జాగ్రత్తగా విను, సురక్షితమైన చోటు ఉండి.",
        "ఏదైనా తప్పుగా అనిపిస్తే ఒంటరిగా వెళ్లకు.",
        "సురక్షితంగా ఉన్న వెంటనే నాకు కాల్ చేయి.",
        "ఫోన్ నీ దగ్గర ఉంచుకో.",
        "జాగ్రత్తగా ఉండాలి, అర్థమైందా?",
        "నా కాల్స్‌ను పట్టించుకోకుండా ఉండకు.",
        "ముందుగా సురక్షితమైన చోటుకి వెళ్లు.",
        "తర్వాత నాకు కాల్ చేయి."
    ],

    ta: [
        "ஹலோ? நீ எங்கே இருக்கிறாய்?",
        "நீ எங்கே இருக்கிறாய் என்று ஏன் சொல்லவில்லை?",
        "கவனமாக கேள், பாதுகாப்பான இடத்தில் இரு.",
        "ஏதாவது தவறாக இருந்தால் தனியாக செல்லாதே.",
        "பாதுகாப்பாக இருந்தவுடன் எனக்கு அழைப்பு செய்.",
        "தொலைபேசியை உன்னிடம் வைத்துக்கொள்.",
        "கவனமாக இருக்க வேண்டும், புரிகிறதா?",
        "என் அழைப்புகளை புறக்கணிக்காதே.",
        "முதலில் பாதுகாப்பான இடத்துக்குச் செல்.",
        "பிறகு எனக்கு அழைப்பு செய்."
    ],

    hi: [
        "हैलो? तुम कहाँ हो?",
        "तुम कहाँ हो यह मुझे क्यों नहीं बताया?",
        "ध्यान से सुनो और सुरक्षित जगह पर रहो.",
        "अगर कुछ गलत लगे तो अकेले मत जाना.",
        "सुरक्षित होते ही मुझे फोन करना.",
        "फोन अपने पास रखना.",
        "सावधान रहना, समझी?",
        "मेरी कॉल को नजरअंदाज मत करना.",
        "पहले सुरक्षित जगह पर जाओ.",
        "फिर मुझे फोन करना."
    ]

};


function fakeCall() {

    fakeCallScreen.classList.remove("hidden");

    const messages =
        fatherScripts[state.language] ||
        fatherScripts.en;

    speakFather(messages, 0);

}


function speakFather(messages, index) {

    if (
        index >= messages.length ||
        fakeCallScreen.classList.contains("hidden")
    ) {
        return;
    }

    const utterance =
        new SpeechSynthesisUtterance(
            messages[index]
        );

    const voiceLanguages = {
        en: "en-IN",
        kn: "kn-IN",
        te: "te-IN",
        ta: "ta-IN",
        hi: "hi-IN"
    };

    utterance.lang =
        voiceLanguages[state.language] || "en-IN";

    utterance.rate = .86;
    utterance.pitch = .72;
    utterance.volume = 1;

    utterance.onend = () => {

        setTimeout(() => {

            speakFather(
                messages,
                index + 1
            );

        }, 700);

    };

    speechSynthesis.speak(utterance);

}


document.getElementById("fakeCall")
    .addEventListener("click", fakeCall);


document.getElementById("declineCall")
    .addEventListener("click", () => {

        speechSynthesis.cancel();

        fakeCallScreen.classList.add("hidden");

    });


document.getElementById("answerCall")
    .addEventListener("click", () => {

        speechSynthesis.cancel();

        const messages =
            fatherScripts[state.language] ||
            fatherScripts.en;

        speakFather(messages, 0);

    });


/* ================= BATTERY SAVER ================= */

document.getElementById("batterySaverBtn")
    .addEventListener("click", () => {

        state.batterySaver =
            !state.batterySaver;

        document.body.classList.toggle(
            "battery-mode",
            state.batterySaver
        );

        const stateText =
            document.getElementById(
                "batteryState"
            );

        const button =
            document.getElementById(
                "batterySaverBtn"
            );

        if (state.batterySaver) {

            stateText.textContent =
                "Battery Saver is ON";

            button.textContent =
                "Turn Off Battery Saver";

            alert(
                "Battery Saver activated.\nAnimations and unnecessary visual activity have been reduced."
            );

        } else {

            stateText.textContent =
                "Battery Saver is OFF";

            button.textContent =
                "Activate Battery Saver";

        }

    });


/* ================= CUSTOMER ISSUES ================= */

document.getElementById("submitIssue")
    .addEventListener("click", () => {

        const name =
            document.getElementById(
                "issueName"
            ).value.trim();

        const email =
            document.getElementById(
                "issueEmail"
            ).value.trim();

        const type =
            document.getElementById(
                "issueType"
            ).value;

        const text =
            document.getElementById(
                "issueText"
            ).value.trim();

        if (!name || !email || !text) {

            document.getElementById(
                "issueStatus"
            ).textContent =
                "Please complete all fields.";

            return;

        }

        const issue = {
            name,
            email,
            type,
            text,
            date: new Date().toLocaleString()
        };

        const issues =
            JSON.parse(
                localStorage.getItem(
                    "sheShieldIssues"
                ) || "[]"
            );

        issues.push(issue);

        localStorage.setItem(
            "sheShieldIssues",
            JSON.stringify(issues)
        );

        document.getElementById(
            "issueStatus"
        ).textContent =
            "✓ Your issue has been saved.";

        document.getElementById(
            "issueName"
        ).value = "";

        document.getElementById(
            "issueEmail"
        ).value = "";

        document.getElementById(
            "issueText"
        ).value = "";

    });


/* ================= LANGUAGE SELECT ================= */

document.getElementById("languageSelect")
    .addEventListener("change", event => {

        state.language =
            event.target.value;

        localStorage.setItem(
            "sheShieldLanguage",
            state.language
        );

    });


/* ================= INCIDENTS ================= */

function addIncident(message) {

    const incidents =
        JSON.parse(
            localStorage.getItem(
                "sheShieldIncidents"
            ) || "[]"
        );

    incidents.unshift({
        message,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(
        "sheShieldIncidents",
        JSON.stringify(incidents)
    );

}


/* ================= VOICE READY ================= */

function speakReadyMessage() {

    console.log(
        "SHE-SHIELD ready in language:",
        state.language
    );

}


/* ================= CLEANUP ================= */

window.addEventListener("beforeunload", () => {

    stopSiren();
    stopVoiceSOS();

    if (state.cameraStream) {

        state.cameraStream
            .getTracks()
            .forEach(track => track.stop());

    }

});
