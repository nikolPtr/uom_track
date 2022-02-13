'use strict';

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/uom_track/sw.js').catch(function (error) {
        console.log('Registration failed with ' + error);
    });
}

// Handle A2HS
let deferredPrompt;
const installBtn = document.getElementById('install');

window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault();
    deferredPrompt = ev;
    installBtn.style.visibility = 'visible';

    installBtn.addEventListener('click', function () {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                installBtn.style.visibility = 'hidden';
                deferredPrompt = null;
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
        });
    });
});

window.addEventListener('appinstalled', function () {
    installBtn.style.visibility = 'hidden';
    deferredPrompt = null;
    console.log('PWA was installed');
});

