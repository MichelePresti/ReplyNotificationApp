import time
from controller import Controller

controller = Controller()

while True:
    # Check new email every minute
    print('Sleep for 60 seconds')
    time.sleep(60)

    # Check new email and send push if needed
    controller.check_and_send()
