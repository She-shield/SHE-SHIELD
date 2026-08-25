/* =========================================================
   SHE-SHIELD JAVASCRIPT
   ========================================================= */

const STORAGE = {
    language: "sheShieldLanguage",
    contacts: "sheShieldContacts",
    issues: "sheShieldIssues"
};


/* ================= GLOBAL VARIABLES ================= */

let currentLanguage =
    localStorage.getItem(STORAGE.language) || "en";

let autoTimer = null;
let autoSeconds = 10;

let voiceRecognition = null;
let voiceListening = false;

let shakeEnabled = false;
let lastShake = 0;

let cameraStream = null;

let mediaRecorder = null;
let recordedChunks = [];

let fakeCallPlaying = false;

let batterySaver = false;


/* ================= SIREN ================= */

const siren = new Audio("siren.mp3");

siren.preload = "auto";

siren.loop = true;


/* ================= TRANSLATIONS ================= */

const translations = {

    en: {
        home: "Home",
        immediate: "Immediate Safety"
    },

    kn: {
        home: "ಮುಖಪುಟ",
        immediate: "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ"
    },

    te: {
        home: "హోమ్",
        immediate: "తక్షణ భద్రత"
    },

    ta: {
        home: "முகப்பு",
        immediate: "உடனடி பாதுகாப்பு"
    },

    hi: {
        home: "होम",
        immediate: "तत्काल सुरक्षा"
    }

};


/* ================= FAKE CALL SCRIPTS ================= */

const fatherScripts = {

    en: [
        "Where are you? Pick up the phone.",
        "I told you to keep your phone with you.",
        "Tell me exactly where you are.",
        "Do not go anywhere alone.",
        "Stay in a safe and public place.",
        "I am coming. Keep the line open.",
        "If there is any danger, call the emergency service.",
        "Listen to me carefully and do not take unnecessary risks."
    ],

    kn: [
        "ಎಲ್ಲಿ ಇದ್ದೀಯ? ಫೋನ್ ತೆಗೆದುಕೋ.",
        "ಫೋನ್ ನಿನ್ನ ಹತ್ತಿರ ಇಟ್ಟುಕೋ ಎಂದು ಹೇಳಿದ್ದೆ.",
        "ನೀನು ಎಲ್ಲಿದ್ದೀಯೋ ಸರಿಯಾಗಿ ಹೇಳು.",
        "ಒಬ್ಬಳೇ ಎಲ್ಲಿಗೂ ಹೋಗಬೇಡ.",
        "ಸುರಕ್ಷಿತವಾದ ಸಾರ್ವಜನಿಕ ಸ್ಥಳದಲ್ಲಿರು.",
        "ನಾನು ಬರುತ್ತಿದ್ದೇನೆ. ಫೋನ್ ಇಟ್ಟುಬಿಡಬೇಡ.",
        "ಯಾವುದೇ ಅಪಾಯ ಇದ್ದರೆ ತಕ್ಷಣ ಸಹಾಯಕ್ಕೆ ಕರೆ ಮಾಡು.",
        "ನನ್ನ ಮಾತು ಕೇಳು, ಅನಗತ್ಯವಾಗಿ ಅಪಾಯ ತೆಗೆದುಕೊಳ್ಳಬೇಡ."
    ],

    te: [
        "ఎక్కడ ఉన్నావు? ఫోన్ ఎత్తు.",
        "ఫోన్ నీ దగ్గర ఉంచుకోమని చెప్పాను.",
        "నువ్వు ఎక్కడ ఉన్నావో సరిగ్గా చెప్పు.",
        "ఒంటరిగా ఎక్కడికీ వెళ్లకు.",
        "సురక్షితమైన బహిరంగ ప్రదేశంలో ఉండు.",
        "నేను వస్తున్నాను. ఫోన్ పెట్టవద్దు.",
        "ప్రమాదం ఉంటే వెంటనే సహాయం కోసం కాల్ చేయి.",
        "నా మాట విను, అవసరం లేని ప్రమాదం తీసుకోకు."
    ],

    ta: [
        "எங்கே இருக்கிறாய்? போனை எடு.",
        "போனை உன்னுடன் வைத்திருக்கச் சொன்னேன்.",
        "நீ எங்கே இருக்கிறாய் என்று சரியாக சொல்.",
        "தனியாக எங்கும் செல்லாதே.",
        "பாதுகாப்பான பொது இடத்தில் இரு.",
        "நான் வருகிறேன். போனை வைக்காதே.",
        "ஆபத்து இருந்தால் உடனே உதவிக்கு அழை.",
        "என் பேச்சைக் கேள், தேவையில்லாமல் ஆபத்தை எடுத்துக்கொள்ளாதே."
    ],

    hi: [
        "तुम कहाँ हो? फोन उठाओ.",
        "मैंने कहा था फोन अपने पास रखना.",
        "तुम कहाँ हो, ठीक से बताओ.",
        "अकेले कहीं मत जाना.",
        "किसी सुरक्षित सार्वजनिक जगह पर रहो.",
        "मैं आ रहा हूँ. फोन मत रखना.",
        "कोई खतरा हो तो तुरंत मदद के लिए कॉल करो.",
        "मेरी बात ध्यान से सुनो, बेवजह जोखिम मत लेना."
    ]

};


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    createContactFields();

    applyLanguage(currentLanguage);

    document.getElementById("languageSelect").value =
        currentLanguage;


    /* Splash */

    setTimeout(() => {

        document
            .getElementById("splash")
            .classList.add("hidden");

        document
            .getElementById("languageScreen")
            .classList.remove("hidden");

    }, 3000);


    /* Language buttons */

    document
        .querySelectorAll(".language-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".language-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                currentLanguage =
                    button.dataset.lang;

            });

        });


    /* Continue */

    document
        .getElementById("continueBtn")
        .addEventListener("click", () => {

            localStorage.setItem(
                STORAGE.language,
                currentLanguage
            );

            applyLanguage(currentLanguage);

            document
                .getElementById("languageScreen")
                .classList.add("hidden");

            document
                .getElementById("app")
                .classList.remove("hidden");

            showPage("home");

        });


    /* Language select */

    document
        .getElementById("languageSelect")
        .addEventListener("change", event => {

            currentLanguage =
                event.target.value;

            localStorage.setItem(
                STORAGE.language,
                currentLanguage
            );

            applyLanguage(currentLanguage);

            toast("Language updated.");

        });


    /* Menu */

    document
        .getElementById("menuBtn")
        .addEventListener("click", () => {

            document
                .getElementById("sideMenu")
                .classList.toggle("open");

        });


    /* Contacts */

    document
        .getElementById("saveContacts")
        .addEventListener(
            "click",
            saveContacts
        );


    /* Evidence */

    document
        .getElementById("cameraBtn")
        .addEventListener(
            "click",
            startCamera
        );


    document
        .getElementById("photoBtn")
        .addEventListener(
            "click",
            takePhoto
        );


    document
        .getElementById("recordBtn")
        .addEventListener(
            "click",
            startAudioRecording
        );


    document
        .getElementById("stopRecordBtn")
        .addEventListener(
            "click",
            stopAudioRecording
        );


    document
        .getElementById("fileUpload")
        .addEventListener(
            "change",
            uploadFiles
        );


    /* Auto SOS */

    document
        .getElementById("stopAuto")
        .addEventListener(
            "click",
            stopAutoSOS
        );


    /* Fake call */

    document
        .getElementById("closeFake")
        .addEventListener(
            "click",
            closeFakeCall
        );


    document
        .getElementById("answerFake")
        .addEventListener(
            "click",
            answerFakeCall
        );


    document
        .getElementById("endFake")
        .addEventListener(
            "click",
            closeFakeCall
        );


    /* Emergency overlay */

    document
        .getElementById("closeEmergency")
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById("emergencyOverlay")
                    .classList.add("hidden");

            }
        );


    /* Battery */

    document
        .getElementById("batteryBtn")
        .addEventListener(
            "click",
            toggleBatterySaver
        );


    /* Customer issue */

    document
        .getElementById("issueForm")
        .addEventListener(
            "submit",
            saveIssue
        );


    /* Shake */

    setupShakeDetection();


    /* Battery information */

    setupBatteryInformation();

});


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageID) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageID);


    if (page) {

        page.classList.add("active");

    }


    document
        .getElementById("sideMenu")
        .classList.remove("open");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================================
   LANGUAGE
   ========================================================= */

function applyLanguage(language) {

    const data =
        translations[language] ||
        translations.en;


    document.documentElement.lang =
        language;


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


    document
        .querySelectorAll(".language-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );

        });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;


function toast(message) {

    const element =
        document.getElementById("toast");


    element.textContent =
        message;


    element.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            element.classList.remove("show");

        }, 3000);

}


/* =========================================================
   LOCATION
   ========================================================= */

function getCurrentLocation() {

    return new Promise((resolve,reject) => {

        if (!navigator.geolocation) {

            reject(
                new Error(
                    "Geolocation not supported."
                )
            );

            return;

        }


        navigator.geolocation.getCurrentPosition(

            position => {

                resolve(
                    position.coords
                );

            },

            error => {

                reject(error);

            },

            {
                enableHighAccuracy: true,
                timeout: 7000,
                maximumAge: 0
            }

        );

    });

}


async function shareLocation(silent = false) {

    try {

        const coordinates =
            await getCurrentLocation();


        const mapURL =
            `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;


        const message =
            `SHE-SHIELD Emergency Location: ${mapURL}`;


        if (navigator.share) {

            await navigator.share({

                title:
                    "SHE-SHIELD Location",

                text:
                    message,

                url:
                    mapURL

            });

        }

        else {

            await navigator
                .clipboard
                ?.writeText(message);

            window.open(
                mapURL,
                "_blank"
            );

        }


        if (!silent) {

            toast(
                "Location shared successfully."
            );

        }


        return mapURL;

    }

    catch {

        toast(
            "Please allow location permission."
        );

        return null;

    }

}


/* =========================================================
   EMERGENCY SOS
   ========================================================= */

async function emergencySOS() {

    /*
       IMPORTANT:
       Emergency SOS does NOT open another menu.
       It immediately starts the emergency process.
    */


    document
        .getElementById("emergencyOverlay")
        .classList.remove("hidden");


    document
        .getElementById("emergencyStatus")
        .textContent =
        "Getting location and starting emergency action...";


    stopAutoSOS();
    stopVoiceSOS();


    let locationURL = null;


    try {

        const coordinates =
            await getCurrentLocation();


        locationURL =
            `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;

    }

    catch {

        console.log(
            "Location permission unavailable."
        );

    }


    /*
       Share location if browser allows.
    */

    if (
        locationURL &&
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    "SHE-SHIELD Emergency SOS",

                text:
                    `Emergency SOS activated. Please help. My location: ${locationURL}`,

                url:
                    locationURL

            });

        }

        catch {

            console.log(
                "Share cancelled."
            );

        }

    }


    document
        .getElementById("emergencyStatus")
        .textContent =
        "Emergency action started. Opening emergency call...";


    /*
       Open Indian emergency number.
    */

    setTimeout(() => {

        window.location.href =
            "tel:112";

    },150);

}


/* =========================================================
   SILENT SOS
   ========================================================= */

async function silentSOS() {

    toast(
        "Silent SOS activated. No siren or flashlight."
    );


    await shareLocation(true);

}


/* =========================================================
   AUTO SOS
   ========================================================= */

function startAutoSOS() {

    stopAutoSOS();


    autoSeconds = 10;


    document
        .getElementById("countdown")
        .textContent =
        autoSeconds;


    document
        .getElementById("autoModal")
        .classList.remove("hidden");


    autoTimer =
        setInterval(() => {

            autoSeconds--;


            document
                .getElementById("countdown")
                .textContent =
                autoSeconds;


            if (autoSeconds <= 0) {

                stopAutoSOS(true);

                emergencySOS();

            }

        },1000);

}


function stopAutoSOS(triggered = false) {

    if (autoTimer) {

        clearInterval(autoTimer);

        autoTimer = null;

    }


    document
        .getElementById("autoModal")
        .classList.add("hidden");


    if (!triggered) {

        autoSeconds = 10;

    }

}


/* =========================================================
   VOICE SOS
   ========================================================= */

function startVoiceSOS() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        toast(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    if (voiceListening) {

        stopVoiceSOS();

        toast(
            "Voice SOS stopped."
        );

        return;

    }


    voiceRecognition =
        new Recognition();


    voiceRecognition.continuous =
        true;


    voiceRecognition.interimResults =
        true;


    voiceRecognition.lang =
        getSpeechLanguage(
            currentLanguage
        );


    voiceListening = true;


    toast(
        'Voice SOS active. Say "PHONE" to trigger SOS. Tap again to stop.'
    );


    voiceRecognition.onresult =
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


            if (
                /\bphone\b/i.test(text) ||
                /ಫೋನ್/i.test(text) ||
                /ఫోన్/i.test(text) ||
                /போன்/i.test(text) ||
                /फोन/i.test(text)
            ) {

                stopVoiceSOS();

                emergencySOS();

            }

        };


    voiceRecognition.onerror =
        () => {

            voiceListening = false;

            toast(
                "Voice SOS stopped."
            );

        };


    voiceRecognition.onend =
        () => {

            if (voiceListening) {

                try {

                    voiceRecognition.start();

                }

                catch {}

            }

        };


    try {

        voiceRecognition.start();

    }

    catch {

        voiceListening = false;

    }

}


function stopVoiceSOS() {

    voiceListening = false;


    if (voiceRecognition) {

        try {

            voiceRecognition.stop();

        }

        catch {}

    }


    voiceRecognition = null;

}


/* =========================================================
   SHAKE SOS
   ========================================================= */

function setupShakeDetection() {

    window.addEventListener(
        "devicemotion",
        event => {

            if (!shakeEnabled) {

                return;

            }


            const acceleration =
                event.accelerationIncludingGravity;


            if (!acceleration) {

                return;

            }


            const force =
                Math.sqrt(
                    Math.pow(acceleration.x || 0,2) +
                    Math.pow(acceleration.y || 0,2) +
                    Math.pow(acceleration.z || 0,2)
                );


            const now =
                Date.now();


            if (
                force > 22 &&
                now - lastShake > 1500
            ) {

                lastShake = now;

                shakeEnabled = false;

                toast(
                    "Shake SOS triggered."
                );


                playSiren();


                shareLocation();

            }

        }
    );

}


async function enableShakeSOS() {

    /*
       iPhone/iPad requires permission
       after a button click.
    */

    if (
        typeof DeviceMotionEvent !==
        "undefined" &&

        typeof DeviceMotionEvent
            .requestPermission ===
            "function"
    ) {

        try {

            const permission =
                await DeviceMotionEvent
                    .requestPermission();


            if (
                permission !==
                "granted"
            ) {

                toast(
                    "Motion permission denied."
                );

                return;

            }

        }

        catch {

            toast(
                "Motion permission unavailable."
            );

            return;

        }

    }


    shakeEnabled =
        !shakeEnabled;


    toast(
        shakeEnabled
            ? "Shake SOS armed. Shake your phone."
            : "Shake SOS stopped."
    );

}


/* =========================================================
   SIREN
   ========================================================= */

function playSiren() {

    siren.currentTime = 0;


    siren.play()
        .catch(() => {

            toast(
                "Tap Siren once to allow audio."
            );

        });

}


function stopSiren() {

    siren.pause();

    siren.currentTime = 0;

}


function toggleSiren() {

    if (siren.paused) {

        playSiren();

    }

    else {

        stopSiren();

    }

}


/* =========================================================
   FAKE CALL
   ========================================================= */

function openFakeCall() {

    /*
       IMPORTANT:
       Fake call uses Speech Synthesis.
       It does NOT use siren.mp3.
    */

    stopSiren();


    document
        .getElementById("fakeModal")
        .classList.remove("hidden");


    document
        .getElementById("fakeStatus")
        .textContent =
        "Incoming call...";

}


function closeFakeCall() {

    fakeCallPlaying = false;


    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();

    }


    document
        .getElementById("fakeModal")
        .classList.add("hidden");


    document
        .getElementById("fakeStatus")
        .textContent =
        "Calling...";

}


function answerFakeCall() {

    if (
        !("speechSynthesis" in window)
    ) {

        toast(
            "Speech synthesis is not supported."
        );

        return;

    }


    if (fakeCallPlaying) {

        return;

    }


    fakeCallPlaying = true;


    document
        .getElementById("fakeStatus")
        .textContent =
        "Dad is speaking...";


    const lines =
        fatherScripts[currentLanguage] ||
        fatherScripts.en;


    speakFatherLines(lines,0);

}


function speakFatherLines(lines,index) {

    if (
        !fakeCallPlaying ||
        index >= lines.length
    ) {

        fakeCallPlaying = false;

        document
            .getElementById("fakeStatus")
            .textContent =
            "Call ended.";

        return;

    }


    const speech =
        new SpeechSynthesisUtterance(
            lines[index]
        );


    speech.lang =
        getSpeechLanguage(
            currentLanguage
        );


    /*
       Lower pitch and slower speed
       gives a deeper, stricter voice.
    */

    speech.rate = .82;

    speech.pitch = .72;

    speech.volume = 1;


    speech.onend = () => {

        setTimeout(() => {

            speakFatherLines(
                lines,
                index + 1
            );

        },650);

    };


    speech.onerror = () => {

        fakeCallPlaying = false;

    };


    speechSynthesis.speak(
        speech
    );

}


/* =========================================================
   SPEECH LANGUAGE
   ========================================================= */

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
   TRUSTED CONTACTS
   ========================================================= */

function createContactFields() {

    const container =
        document.getElementById(
            "contactFields"
        );


    const saved =
        JSON.parse(
            localStorage.getItem(
                STORAGE.contacts
            ) || "[]"
        );


    container.innerHTML = "";


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const contact =
            saved[i] || {};


        const row =
            document.createElement("div");


        row.className =
            "contact-row";


        row.innerHTML = `

            <input
                class="contact-name"
                placeholder="Contact ${i+1} Name"
                value="${escapeHTML(contact.name || "")}"
            >

            <input
                class="contact-phone"
                type="tel"
                placeholder="Contact ${i+1} Phone"
                value="${escapeHTML(contact.phone || "")}"
            >

        `;


        container.appendChild(row);

    }

}


function saveContacts() {

    const names =
        document.querySelectorAll(
            ".contact-name"
        );


    const phones =
        document.querySelectorAll(
            ".contact-phone"
        );


    const contacts = [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        contacts.push({

            name:
                names[i].value.trim(),

            phone:
                phones[i].value.trim()

        });

    }


    const complete =
        contacts.filter(
            contact =>
                contact.name &&
                contact.phone
        );


    if (
        complete.length < 5
    ) {

        document
            .getElementById(
                "contactStatus"
            )
            .textContent =
            "Please fill all five trusted contacts.";

        return;

    }


    localStorage.setItem(
        STORAGE.contacts,
        JSON.stringify(contacts)
    );


    document
        .getElementById(
            "contactStatus"
        )
        .textContent =
        "Five trusted contacts saved.";


    toast(
        "Trusted contacts saved."
    );

}


/* =========================================================
   CAMERA
   ========================================================= */

async function startCamera() {

    try {

        cameraStream =
            await navigator
                .mediaDevices
                .getUserMedia({

                    video: true,

                    audio: true

                });


        document
            .getElementById(
                "cameraPreview"
            )
            .srcObject =
            cameraStream;


        toast(
            "Camera and microphone enabled."
        );

    }

    catch {

        toast(
            "Camera/microphone permission denied."
        );

    }

}


/* =========================================================
   PHOTO
   ========================================================= */

function takePhoto() {

    const video =
        document.getElementById(
            "cameraPreview"
        );


    if (!video.srcObject) {

        toast(
            "Start the camera first."
        );

        return;

    }


    const canvas =
        document.getElementById(
            "photoCanvas"
        );


    canvas.width =
        video.videoWidth || 1280;


    canvas.height =
        video.videoHeight || 720;


    const context =
        canvas.getContext("2d");


    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    canvas.toBlob(blob => {

        const url =
            URL.createObjectURL(blob);


        addEvidence(
            "Captured Photo",
            url
        );

    },"image/jpeg",.92);

}


/* =========================================================
   AUDIO RECORDING
   ========================================================= */

function startAudioRecording() {

    if (!cameraStream) {

        toast(
            "Start Camera first."
        );

        return;

    }


    if (!window.MediaRecorder) {

        toast(
            "Audio recording unavailable."
        );

        return;

    }


    recordedChunks = [];


    mediaRecorder =
        new MediaRecorder(
            cameraStream
        );


    mediaRecorder.ondataavailable =
        event => {

            if (
                event.data.size
            ) {

                recordedChunks.push(
                    event.data
                );

            }

        };


    mediaRecorder.onstop =
        () => {

            const blob =
                new Blob(
                    recordedChunks,
                    {
                        type:
                            "audio/webm"
                    }
                );


            addEvidence(
                "Recorded Audio",
                URL.createObjectURL(blob)
            );

        };


    mediaRecorder.start();


    toast(
        "Audio recording started."
    );

}


function stopAudioRecording() {

    if (
        mediaRecorder &&
        mediaRecorder.state !==
        "inactive"
    ) {

        mediaRecorder.stop();


        toast(
            "Audio recording saved."
        );

    }

}


/* =========================================================
   FILE UPLOAD
   ========================================================= */

function uploadFiles(event) {

    const files =
        [...event.target.files];


    files.forEach(file => {

        const url =
            URL.createObjectURL(file);


        addEvidence(
            file.name,
            url
        );

    });

}


function addEvidence(name,url) {

    const list =
        document.getElementById(
            "evidenceFiles"
        );


    const item =
        document.createElement("div");


    item.innerHTML = `

        <a
            href="${url}"
            target="_blank"
        >

            📎 ${escapeHTML(name)}

        </a>

    `;


    list.prepend(item);

}


/* =========================================================
   BATTERY SAVER
   ========================================================= */

function toggleBatterySaver() {

    batterySaver =
        !batterySaver;


    document.body
        .classList.toggle(
            "battery-on",
            batterySaver
        );


    document
        .getElementById(
            "batteryState"
        )
        .textContent =
        batterySaver
            ? "Battery Saver is ON"
            : "Battery Saver is OFF";


    document
        .getElementById(
            "batteryBtn"
        )
        .textContent =
        batterySaver
            ? "Disable Battery Saver"
            : "Enable Battery Saver";


    toast(
        batterySaver
            ? "Battery Saver enabled."
            : "Battery Saver disabled."
    );

}


async function setupBatteryInformation() {

    if (!navigator.getBattery) {

        return;

    }


    try {

        const battery =
            await navigator.getBattery();


        function updateBattery() {

            const percent =
                Math.round(
                    battery.level * 100
                );


            document
                .getElementById(
                    "batteryLevel"
                )
                .style.width =
                percent + "%";


            document
                .getElementById(
                    "batteryInfo"
                )
                .textContent =
                `Battery: ${percent}% ${
                    battery.charging
                        ? "• Charging"
                        : ""
                }`;

        }


        updateBattery();


        battery.addEventListener(
            "levelchange",
            updateBattery
        );


        battery.addEventListener(
            "chargingchange",
            updateBattery
        );

    }

    catch {}

}


/* =========================================================
   CUSTOMER ISSUES
   ========================================================= */

function saveIssue(event) {

    event.preventDefault();


    const issue = {

        name:
            document
                .getElementById(
                    "issueName"
                )
                .value
                .trim(),

        email:
            document
                .getElementById(
                    "issueEmail"
                )
                .value
                .trim(),

        type:
            document
                .getElementById(
                    "issueType"
                )
                .value,

        message:
            document
                .getElementById(
                    "issueText"
                )
                .value
                .trim(),

        date:
            new Date()
                .toLocaleString()

    };


    const issues =
        JSON.parse(
            localStorage.getItem(
                STORAGE.issues
            ) || "[]"
        );


    issues.push(issue);


    localStorage.setItem(
        STORAGE.issues,
        JSON.stringify(issues)
    );


    document
        .getElementById(
            "issueStatus"
        )
        .textContent =
        "Issue saved successfully.";


    event.target.reset();

}


/* =========================================================
   HELPER
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /[&<>"']/g,
            character => ({

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[character])
        );

}


/* =========================================================
   CLEANUP
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (cameraStream) {

            cameraStream
                .getTracks()
                .forEach(track =>
                    track.stop()
                );

        }


        stopVoiceSOS();


        if (
            "speechSynthesis"
            in window
        ) {

            speechSynthesis.cancel();

        }


        stopSiren();

    }
);
