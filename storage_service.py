import json
import os
import pandas as pd
import pickle


class StorageService:
    imap = 'imap.gmail.com'
    api_type = 'service_account'
    auth_uri = 'https://accounts.google.com/o/oauth2/auth'
    token_uri = 'https://oauth2.googleapis.com/token'
    auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs'
    redirect_uris = ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost']
    filepath_history = 'email_history.json'
    filepath_token = 'token.pickle'
    EV_path = 'REPLYAPP_'
    EV_serverkey = 'ServerKey'
    EV_email_username = 'EmailUsername'
    EV_email_password = 'EmailPassword'
    EV_api_projectid = 'ApiProjectID'
    EV_api_privatekeyid = 'ApiPrivateKeyID'
    EV_api_privatekey = 'ApiPrivateKey'
    EV_api_clientemail = 'ApiClientEmail'
    EV_api_clientid = 'ApiClientID'
    EV_api_clientx509certurl = 'ApiClientCertURL'
    EV_gmail_clientsecret = 'GmailClientSecret'
    EV_gmail_clientid = 'GmailClientID'
    credentials = {}
    api_key = {}
    email = {}
    token = None

    def __init__(self):
        self.cred_initialized = False
        self.apikey_initialized = False
        self.email_initialized = False
        self.token_initialized = False

    def get_token(self) -> {any, int}:
        if self.token_initialized is True:
            return self.token, 0

        if os.path.exists(self.filepath_token):
            try:
                with open(self.filepath_token, 'rb') as token:
                    res = pickle.load(token)
                    self.token = res
                    self.token_initialized = True
                    return res, 0
            except:
                return None, 2
        else:
            return None, 1

    def save_token(self, token: any):
        with open(self.filepath_token, 'wb') as f:
            pickle.dump(token, f)

    def get_ev(self, evname):
        return os.environ.get(self.EV_path + evname)

    def get_server_key(self) -> {str, int}:
        res = self.get_ev(self.EV_serverkey)
        if res is not None:
            return res, 0
        else:
            return '', 1

    def get_credentials(self) -> {str, int}:
        if self.cred_initialized is True:
            return self.credentials
        clientid = self.get_ev(self.EV_gmail_clientid)
        projectid = self.get_ev(self.EV_api_projectid)
        clientsecret = self.get_ev(self.EV_gmail_clientsecret)

        if clientid is not None and projectid is not None and clientsecret is not None:
            res = {
                "installed": {
                    "client_id": clientid,
                    "project_id": projectid,
                    "auth_uri": self.auth_uri,
                    "token_uri": self.token_uri,
                    "auth_provider_x509_cert_url": self.auth_provider_x509_cert_url,
                    "client_secret": clientsecret,
                    "redirect_uris": self.redirect_uris
                }
            }
            self.credentials = res
            self.cred_initialized = True
            return json.dumps(res), 0

        else:
            return '', 1

    def get_api_key(self) -> {str, int}:
        if self.apikey_initialized is True:
            return json.dumps(self.api_key)

        projectid = self.get_ev(self.EV_api_projectid)
        privatekeyid = self.get_ev(self.EV_api_privatekeyid)
        privatekey = '-----BEGIN PRIVATE KEY-----\n' + self.get_ev(self.EV_api_privatekey) + '\n-----END PRIVATE KEY-----\n'
        clientemail = self.get_ev(self.EV_api_clientemail)
        clientid = self.get_ev(self.EV_api_clientid)
        clientx509certurl = self.get_ev(self.EV_api_clientx509certurl)

        if projectid is not None and privatekeyid is not None and privatekey is not None and clientemail is not None and clientid is not None and clientx509certurl is not None:
            res = {
                "type": self.api_type,
                "project_id": projectid,
                "private_key_id": privatekeyid,
                "private_key": privatekey,
                "client_email": clientemail,
                "client_id": clientid,
                "auth_uri": self.auth_uri,
                "token_uri": self.token_uri,
                "auth_provider_x509_cert_url": self.auth_provider_x509_cert_url,
                "client_x509_cert_url": clientx509certurl
            }
            self.api_key = res
            self.apikey_initialized = True
            # print(json.dumps(res))
            return json.dumps(res), 0
        else:
            return '', 1

    def get_email(self) -> {str, int}:
        if self.email_initialized is True:
            return json.dumps(self.email)

        email = self.get_ev(self.EV_email_username)
        password = self.get_ev(self.EV_email_password)
        if email is not None and password is not None:
            res = {
                "email": email,
                "password": password,
                "imap": self.imap
            }
            self.email = res
            self.email_initialized = True
            # print(json.dumps(res))
            return json.dumps(res), 0
        else:
            return '', 1

    # Register new emails in a json file
    # Every email is associated to an expiring value set to 3
    # When the expiring value reach 0, the associated email is ignored as a valid email, even if it is unread yet
    #
    # Register the email and return the expiring value

    def register_new_email(self, email_id) -> int:
        email_history = {}
        try:
            if not os.path.exists(self.filepath_history):
                email_history = {
                    email_id: {
                        "email_id": email_id,
                        "expired": 3
                    }
                }
                email_df: pd.DataFrame = pd.DataFrame(email_history)
                email_df.to_json(self.filepath_history)
                return 3
            else:
                email_history = pd.read_json(self.filepath_history)
                if email_id in email_history.columns:
                    email_df = email_history.loc(axis=1)[email_id]
                    if int(email_df['expired']) > 0:
                        email_history.at['expired', email_id] = email_df['expired'] - 1
                    email_history.to_json(self.filepath_history)
                    return email_df['expired'] - 1
                else:
                    email_history[email_id] = [
                        email_id,
                        3
                    ]
                    email_history.to_json(self.filepath_history)
                    return 3
        except:
            print('ERROR REGISTRATION EMAIL HISTORY')
            return -1
