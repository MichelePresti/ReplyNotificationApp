package io.ionic.starter;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.transistorsoft.tsbackgroundfetch.BGTask;
import com.transistorsoft.tsbackgroundfetch.BackgroundFetch;

import java.io.IOException;

public class BackgroundFetchHeadlessTask{
  public void onFetch(Context context,  BGTask task) {
    // Get a reference to the BackgroundFetch Android API.
    BackgroundFetch backgroundFetch = BackgroundFetch.getInstance(context);
    // Get the taskId.
    String taskId = task.getTaskId();
    // Log a message to adb logcat.
    Log.d("MyHeadlessTask", "BackgroundFetchHeadlessTask onFetch -- CUSTOM IMPLEMENTATION: " + taskId);

    boolean isTimeout = task.getTimedOut();
    // Is this a timeout?
    if (isTimeout) {
      backgroundFetch.finish(taskId);
      return;
    }
    /*
      RequestQueue queue = Volley.newRequestQueue(context);
      String url = "http://localhost:5000/message";
      StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
        new Response.Listener<String>() {
          @Override
          public void onResponse(String response) {
            Log.d("HeadlessTask_Response", "Data:" + response);
            if(!response.equals("")){
              NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "my-defaul-notification")
                .setContentTitle("Reply AMS Background")
                .setContentText("Reply AMS Background Service")
                .setPriority(NotificationCompat.PRIORITY_MAX);
              NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
              notificationManager.notify(1000, builder.build());

              AudioManager myAudioManager = (AudioManager)context.getSystemService(Context.AUDIO_SERVICE);
              myAudioManager.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
              MediaPlayer mediaPlayer = MediaPlayer.create(context, Uri.parse("assets/public/assets/music/Alarm.mp3"));
              mediaPlayer.setAudioAttributes(
                new AudioAttributes.Builder()
                  .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                  .setUsage(AudioAttributes.USAGE_MEDIA)
                  .build()
              );
              try {
                mediaPlayer.prepare();
              } catch (IOException e) {
                e.printStackTrace();
              }
              mediaPlayer.start();
            }
          }
        }, new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {
          System.out.println(".onErrorResponse" + error.getMessage());
        }
      });*/

    backgroundFetch.finish(taskId);
  }
}
