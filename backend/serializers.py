from rest_framework import serializers
from models import *


class CarInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarInfo
        fields = ('id', 'hearbeat', 'geolocation_lat', 'geolocation_lng',
                  'cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6')
