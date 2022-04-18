package io.ionic.starter;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;


import com.getcapacitor.Plugin;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;

@SuppressLint("MissingFirebaseInstanceTokenRefresh")
public class MyFirebaseMessagingService extends FirebaseMessagingService {

  @Override
  public void onMessageReceived(@NonNull RemoteMessage remoteMessage){
    super.onMessageReceived(remoteMessage);
    PushNotificationsPlugin.sendRemoteMessage(remoteMessage);
  }

}
