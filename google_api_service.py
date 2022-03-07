from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from storage_service import StorageService
import json
import base64
import binascii

class EmailService:

    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

    def __init__(self):
        self.storage = StorageService()
        self.email, res_email = self.storage.get_email()
        self.credentials, res_cred = self.storage.get_credentials()
        if res_email == 1 or res_cred == 1:
            print('CREDENTIALS OR EMAIL INFO NOT LOAD')
        else:
            self.email = json.loads(self.email)
            self.credentials = json.loads(self.credentials)

    def get_emails(self):
        creds = None
        if self.credentials == '' or self.email == '':
            print('CREDENTIALS OR EMAIL INFO NOT LOAD')
            return
        token, res = self.storage.get_token()
        if res == 2:
            print('TOKEN FILE PARSING ERROR')
            return
        elif res == 1:
            with open('cred.json', 'w') as f:
                json.dump(self.credentials, f)
            flow = InstalledAppFlow.from_client_secrets_file('cred.json', self.SCOPES)
            creds = flow.run_local_server(port=0)
            self.storage.save_token(creds)
        else:
            creds = token

        try:
            # Connect to gmail service with given credentials
            service = build('gmail', 'v1', credentials=creds)
            # Request the list of unread messages
            result = service.users().messages().list(userId='me', q='is: unread').execute()
            messages = result.get('messages')
        except:
            print('TOKEN AUTHENTICATION ERROR')
            return

        if messages is not None:
            for msg in messages:
                if self.storage.register_new_email(msg['id']) > 0:
                    # Get the message from its id
                    txt = service.users().messages().get(userId='me', id=msg['id']).execute()
                    payload = txt['payload']
                    parts = payload.get('parts')[0]
                    data = parts['body']['data']
                    data.replace("-", "+").replace("_", "/")
                    try:
                        decoded_data = base64.b64decode(data)
                    except binascii.Error:
                        decoded_data = 'MESSAGE PARSING ERROR, NEW EMAIL INCOMING'
                    if str(decoded_data).lower().find('very high') or str(decoded_data).lower().find('veryhigh') > 0:
                        return True, data
        else:
            return False, None

        return False, None





