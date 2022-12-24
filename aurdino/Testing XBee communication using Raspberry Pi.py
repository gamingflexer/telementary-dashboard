#!/usr/bin/env python

import time

import serial

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

GPIO.setwarnings(False)

GPIO.setup(23,GPIO.OUT)

ser = serial.Serial(

    port='/dev/ttyS0',

    baudrate = 9600,

    parity=serial.PARITY_NONE,

    stopbits=serial.STOPBITS_ONE,

    bytesize=serial.EIGHTBITS,

    timeout=1             

 )

counter=0       

      

while 1:

    #ser.write(str.encode('Write counter: %d \n'%(counter)))

    #time.sleep(1)

    #counter += 1

    x=ser.readline().strip()

    print(x)

    if x == 'a':

        GPIO.output(23,GPIO.HIGH)

        time.sleep(3)

    else:

        GPIO.output(23,GPIO.LOW)


 