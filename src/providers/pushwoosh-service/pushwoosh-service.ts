import {Injectable} from "@angular/core";

import { Platform } from 'ionic-angular';

declare var cordova : any;

// For iOS, open your project .pList file in xCode and add:
// 1) "Pushwoosh_APPID" key  with the Pushwoosh App Id value
// 2a) Add a new row and, on the left column, select "Required background modes".
// 2b) Open that row to see "Item 0" row, click on the right column and type: remote-notification. Press Enter.

@Injectable()
export class PushwooshService {

    PUSHWOOSH_APP_ID : string = 'XXXXX-XXXXX'; // Your pushwoosh app id.
    GOOGLE_PROJECT_NUMBER : string = 'XXXXXXXXXXXX'; // Project number from firebase.

    constructor(public platform : Platform){

        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                console.log("PushwooshService init: Running on push compatible platform "+ this.platform.userAgent() +')');
                this.initIOS();
            } else {
                if (this.platform.is('android')) {
                    console.log("PushwooshService init: Running on push compatible platform "+ this.platform.userAgent() +')');
                    this.initAndroid();
                }
                else {
                    console.log("PushwooshService init: No compatible platform available.  Skipping init.");
                    return;
                }
            }
        });


    }

    initIOS() {
        let pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

        // Set push notification callback before we initialize the plugin.
        document.addEventListener('push-notification', function (event:any) {
            // Get the notification payload.
            let notification = event.notification;

            // Display alert to the user for example.
            alert(notification.aps.alert);

            // Clear the app badge.
            pushNotification.setApplicationIconBadgeNumber(0);
        });

        // Initialize the plugin.
        pushNotification.onDeviceReady({pw_appid: this.PUSHWOOSH_APP_ID});

        // Register for pushes.
        pushNotification.registerDevice(
            function (status) {
                let deviceToken = status['deviceToken'];
                console.warn('registerDevice: ' + deviceToken);
            },
            function (status) {
                console.warn('failed to register : ' + JSON.stringify(status));
                alert(JSON.stringify(['failed to register ', status]));
            }
        );

        // Reset badges on app start.
        pushNotification.setApplicationIconBadgeNumber(0);
    }

    initAndroid() {
        let pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

        // Set push notifications handler.
        document.addEventListener('push-notification', function (event:any) {
            let title    = event.notification.title;
            let message = event.notification.message;
            let userData = event.notification.userdata;

            if (typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }

            alert(message);
        });

        // Initialize Pushwoosh with projectid: GOOGLE_PROJECT_NUMBER, pw_appid : PUSHWOOSH_APP_ID. This will trigger all
        // pending push notifications on start.
        pushNotification.onDeviceReady({
            projectid: this.GOOGLE_PROJECT_NUMBER,
            pw_appid: this.PUSHWOOSH_APP_ID
            // serviceName: "MPNS_SERVICE_NAME"
        });

        // Register for pushes.
        pushNotification.registerDevice(
            function (status) {
                let pushToken = status;
                console.warn('push token: ' + pushToken);
                alert('push token: ' + JSON.stringify(pushToken));
            },
            function (status) {
                console.warn(JSON.stringify(['failed to register ', status]));
            }
        );
    }

}