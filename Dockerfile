FROM python:3

ADD main.py /
ADD google_api_service.py /
ADD push_notification_service.py /
ADD storage_service.py /
ADD controller.py /

RUN pip install requests
RUN pip install firebase_admin
RUN pip install pandas
RUN pip install google-api-python-client
RUN pip install google_auth_oauthlib
RUN pip install google-auth-httplib2

CMD ["python", "./main.py"]