var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHce3QHAgRQ0KUovhPvwG_MNRROhKEYYnhuwq7a1Lox3cKr872W8Nj-FSC4A2io-UUKpCrVU601mpfDUzVMI-7c",
    "privateKey": "0x7jAZNHYP5iL56dYLHc6puU_dkG4QR6VvJg5JfyMnQ"
 };
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c444aUMLkZo:APA91bHmUJlzEQUIcDDbVxc1q-28uByXLNTYTaU_h1zQ4sB-cKtkJAfxN1qfkj-IHMeEM_qNQAjDR4DvGhHLipUhj4WY0yVGaxw2nBeg78qY-B9hGQv_ceUSuBbA0x9GRe4SsGxIwItE",
    "keys": {
        "p256dh": "BCP0o1mWjYEToovKjkXezIOnYV0InWJmWbd853Rm7HUMOj+Ip5HulvsSQ4tEE/QwL/JHve45zGfhghSkPIfxA6Q=",
        "auth": "1M47tIrVKJjZtGv5RzvwNQ=="
    }
 };

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '11523917590',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);