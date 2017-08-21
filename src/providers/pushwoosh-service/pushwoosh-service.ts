import {Injectable} from "@angular/core";

import { Platform } from 'ionic-angular';

//import { Device } from '@ionic-native/device';
declare var cordova : any;

// For iOS, open your project .pList file in xCode and add:
// 1) "Pushwoosh_APPID" key  with the Pushwoosh App Id value
// 2a) Add a new row and, on the left column, select "Required background modes".
// 2b) Open that row to see "Item 0" row, click on the right column and type: remote-notification. Press Enter.

@Injectable()
export class PushwooshService {

    PUSHWOOSH_APP_ID : string = 'XXXXX-XXXXX'; // Your pushwoosh app id.
    GOOGLE_PROJECT_NUMBER : string = 'XXXXXXXXXXXXX'; // Project number from firebase.

    constructor(public platform : Platform){

        this.platform.ready().then(() => {
            console.log("Platform ready");
            if (this.platform.is('ios')) {
                console.log("PushwooshService init: Running on push compatible platform "+ this.platform.userAgent() +')');
                this.initIOS();
            } else {
                if (this.platform.is('android')) {
                    console.log("PushwooshService init: Running on push compatible platform "+ this.platform.userAgent() +')');
                    this.initAndroid();
                }
                else {
                    console.log("PushwooshService init: No compatible platform available.  Skipping init.)");
                    return;
                }
            }
        });


    }

    /*
    init() {
        console.log("PushwooshService init");

        if(!Device.device) {
            console.log("PushwooshService init: No device object available.  Skipping init.  (Probably not running in a deployed Cordova app.)");
            return;
        }

        switch (Device.device.platform) {
            case 'iOS':
                console.log('Starting iOS Pushwoosh initialization');
                this.initIOS();
                break;
            case 'Android':
                console.log('Starting Android Pushwoosh initialization');
                this.initAndroid();
                break;
            default:
                console.log('Unknown Cordova platform', Device.device.platform, '. Skipping Pushwoosh initialization');
        }
    }
    */

    initIOS() {
        let pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

        //set push notification callback before we initialize the plugin
        document.addEventListener('push-notification', function (event:any) {
            //get the notification payload
            let notification = event.notification;

            //display alert to the user for example
            alert(notification.aps.alert);

            //clear the app badge
            pushNotification.setApplicationIconBadgeNumber(0);
        });

        //initialize the plugin
        pushNotification.onDeviceReady({pw_appid: this.PUSHWOOSH_APP_ID});

        //register for pushes
        pushNotification.registerDevice(
            function (status) {
                var deviceToken = status['deviceToken'];
                console.warn('registerDevice: ' + deviceToken);
            },
            function (status) {
                console.warn('failed to register : ' + JSON.stringify(status));
                alert(JSON.stringify(['failed to register ', status]));
            }
        );

        //reset badges on app start
        pushNotification.setApplicationIconBadgeNumber(0);
    }

    initAndroid() {
        let pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

        //set push notifications handler
        document.addEventListener('push-notification', function (event:any) {
            let title    = event.notification.title;
            let userData = event.notification.userdata;

            if (typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }

            alert(title);
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
                var pushToken = status;
                console.warn('push token: ' + pushToken);
                alert('push token: ' + JSON.stringify(pushToken));
            },
            function (status) {
                console.warn(JSON.stringify(['failed to register ', status]));
            }
        );
    }

}