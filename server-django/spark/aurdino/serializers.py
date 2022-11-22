from rest_framework import serializers
from aurdino.models import *


class locationNewSerilizer(serializers.ModelSerializer):
    class Meta():
        model = locationNew
        fields = ('id', 'gpsyear', 'gpsmonth', 'gpsday', 'gpshour', 'gpsmin', 'gpssec', 'gpscentisec', 'latdegree',
                  'latmin', 'latsec', 'lngdegree', 'lngmin', 'lngsec', 'gpsspeed', 'gpsheading', 'creationTime')


class cellNewSerilizer(serializers.ModelSerializer):
    class Meta():
        model = cellNew
        fields = ('id', 'cell0', 'cell1', 'cell2', 'cell3',
                  'cell4', 'cell5', 'creationTime')


class heartNewSerilizer(serializers.ModelSerializer):
    class Meta():
        model = heartNew
        fields = ('id', 'beat', 'creationTime')
