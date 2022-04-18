import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'it.ams.reply',
  appName: 'Reply AMS',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'alarm.mp3',
    }
  }
};

export default config;
