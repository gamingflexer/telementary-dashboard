from django.db import models

# Create your models here.
class CarInfo(models.Model):
    id = models.AutoField(primary_key=True)
    hearbeat = models.CharField(max_length=100, blank=False, default='')
    geolocation_lat = models.FloatField(blank=True, null=True, default=0.0)
    geolocation_lng = models.FloatField(blank=True, null=True, default=0.0)
    cell1 = models.CharField(max_length=100, blank=False, default='')
    cell2 = models.CharField(max_length=100, blank=False, default='')
    cell3 = models.CharField(max_length=100, blank=False, default='')
    cell4 = models.CharField(max_length=100, blank=False, default='')
    cell5 = models.CharField(max_length=100, blank=False, default='')
    cell6 = models.CharField(max_length=100, blank=False, default='')