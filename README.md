# Ionic-Pushwoosh

Sample project that shows how to integrate Pushwoosh in Ionic.

* FrontEnd: Ionic App.

## Configuration

    1) [Register in Pushwoosh](https://go.pushwoosh.com/register)
    2) Login in Pushwoosh
    3) Create new App
        - Enter Application title.
        - Click Save application.
        - Click configure in Android Platform: you need API Key and GCM Sender ID.
    4) [Go to google developers console](https://console.developers.google.com)
        - Create new project.
        - Create credentials > API Key.
    5) [FCM (former GCM) Configuration](http://docs.pushwoosh.com/docs/fcm-configuration)
    6) Go to step 3 -> configure Android. 
        -  In your application click on Android->Edit to change the configuration for Android application. 
        - Copy your Firebase Cloud Messaging Token to the API Key.
        - Copy your Sender ID to the GCM Sender ID field.
    7) In providers/pushwoosh-service/pushwoosh-service.ts replace:
        PUSHWOOSH_APP_ID : string = 'XXXXX-XXXXX'; // Your pushwoosh app id.
        GOOGLE_PROJECT_NUMBER : string = 'XXXXXXXXXXXX'; // Project number from firebase.
        
        with your data.

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

Only work in mobile devices.

* Test in Android: 

```bash
ionic cordova add platform android
ionic cordova run android
```

* Test in iOS: 

```bash
ionic cordova add platform ios
ionic cordova run ios
```


## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic Cordova](https://ionicframework.com/docs/intro/installation/)

## License
   
The MIT License (MIT) Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   
Original work Copyright (c) 2017 Adrián Brito
