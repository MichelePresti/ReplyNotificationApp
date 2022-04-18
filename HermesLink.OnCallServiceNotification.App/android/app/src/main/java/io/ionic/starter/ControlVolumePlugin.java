package io.ionic.starter;

import android.content.Context;
import android.media.AudioManager;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;


@CapacitorPlugin(name = "VolumeControl")
public class ControlVolumePlugin extends Plugin {


  @PluginMethod()
  public void setMaxVolume(PluginCall call) {
    Context context = getContext();
    AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
    audioManager.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
    int maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
    audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, maxVolume, 0);
  }
}
