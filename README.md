# Reply Notificaton App
This repository is for internal use of Hermes Reply only.

## Introduction
The purpose of this app is to provide a way to loudly notify you during the night in those days when you are in charge of the on-call service.

## Technology used
The core of the application is developed using Python as language.
The python service check an email-box every minutes to find new emails with 'Very High' tag. (Future improvements, personalized tag).
Once an email is found, through Firebase Messaging service by Google a notification containing a short description of the email is sended to
all the client devices.

The client device is developed using Angular with Ionic + Clapacitor plugin and works only for android devices at the moment.
Every client is connected to the Firebase service and subscribed to a specific topic.
When they receive the notification, an alarm start loudly on your phone until you switch off entering the app an closing the popup.

Sorry to awake you but you have to resolve a ticket :)

 ## Installation Guide
 To be written
 
 ## Reference
 - [Ionic framework](https://ionicframework.com/)
 - [Capacitor plugin](https://capacitorjs.com/)
 - [Firebase Messaging](https://firebase.google.com/)

# Contribute
- [Michele Presti](https://github.com/MichelePresti)
