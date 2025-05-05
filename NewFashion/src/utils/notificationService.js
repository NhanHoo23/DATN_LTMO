// import messaging from "@react-native-firebase/messaging";
import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function setupNotificationHandlers() {
  const messaging = getMessaging();

  const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
    console.log('📩 Thông báo nhận khi app đang mở:', remoteMessage);

    await notifee.displayNotification({
      title: remoteMessage.data?.title || 'Thông báo mới',
      body: remoteMessage.data?.body || '',
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  });

  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log(
      '⏪ App mở từ background do người dùng bấm vào thông báo:',
      remoteMessage,
    );
  });

  const initialNotification = await getInitialNotification(messaging);
  if (initialNotification) {
    console.log(
      '🚀 App mở từ trạng thái tắt nhờ thông báo:',
      initialNotification,
    );
  }

  return unsubscribeOnMessage;
}
