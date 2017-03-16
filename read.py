#!/usr/bin/env python

import signal
import sys
import time

from pirc522 import RFID

# start reading RFID
run = True
rdr = RFID()
util = rdr.util()
util.debug = False

def end_read(signal,frame):
    global run
    print("\nCtrl+C captured, ending read.")
    run = False
    rdr.cleanup()

signal.signal(signal.SIGINT, end_read)

print("Starting")
sys.stdout.flush()
while run:
    (error, data) = rdr.request()
    # if not error:
        # print("\nDetected: " + format(data, "02x"))

    (error, uid) = rdr.anticoll()
    if not error:
        # print uid
        # print("[%d,%d,%d,%d]" % (uid[0],uid[1],uid[2],uid[3]))
        # sys.stdout.flush()

        # set tag
        util.set_tag(uid)
        # authorize with student_id card key
        util.auth(rdr.auth_a, [0x20, 0x07, 0x07, 0x31, 0xAB, 0xCD])
        # Read from the first block of sector 14
        error, data = util.read_out(56)
        if (not error):
            student_id = "".join([ chr(x) for x in data[:9] ])
            print('"%s"' % (student_id))
            sys.stdout.flush()
        # deauthorize
        util.deauth()

        time.sleep(1)
