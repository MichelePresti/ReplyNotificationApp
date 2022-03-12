import json
import requests
import firebase_admin
from firebase_admin import credentials
from storage_service import StorageService


class PushNotification:

    def __init__(self):
        self.storage = StorageService()
        self.creds, res_cred = self.storage.get_api_key()
        serverkey, res_server = self.storage.get_server_key()
        if res_cred == 0 and res_server == 0:
            cred = firebase_admin.credentials.Certificate(json.loads(self.creds))
            firebase_admin.initialize_app(cred)
            self.serverToken = serverkey
            self.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + self.serverToken,
            }
        else:
            print('CREDENTIAL OR SERVER KEY NOT LOAD')

    def send_broadcast_notification(self, topic: str, message: str, priority='high', title='ReplyAMS', messageID='NO_ID'):
        URL = 'https://fcm.googleapis.com/fcm/send'
        data = {
            "to": "/topics/" + topic,
            "data": {
                "message": message,
                "title": title,
                "messageID": messageID
            },
            "priority": priority
        }
        try:
            r = requests.post(URL, data=json.dumps(data), headers=self.headers)
        except requests.ConnectionError as e:
            print('CONNECTION ERROR - CHECK PLEASE', e.response)
        print(r.content)

