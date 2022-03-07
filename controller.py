from push_notification_service import PushNotification
from storage_service import StorageService
from google_api_service import EmailService


class Controller:

    def __init__(self):
        self.email = EmailService()
        self.pushNotification = PushNotification()
        self.storage = StorageService()
        self.push_notification_topic = 'alert'

    def check_and_send(self):
        new_email, message = self.email.get_emails()
        if new_email is True:
            print('NEW EMAIL')
            self.pushNotification.send_broadcast_notification(self.push_notification_topic, message)
