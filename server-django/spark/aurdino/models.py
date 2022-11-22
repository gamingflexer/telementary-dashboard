from django.db import models

# Create your models here.

class locationNew(models.Model):
    id = models.AutoField(primary_key=True)
    gpsyear = models.CharField(max_length=100, blank=False, default='')
    gpsmonth = models.CharField(max_length=100, blank=False, default='')
    gpsday = models.CharField(max_length=100, blank=False, default='')
    gpshour = models.CharField(max_length=100, blank=False, default='')
    gpsmin = models.CharField(max_length=100, blank=False, default='')
    gpssec = models.CharField(max_length=100, blank=False, default='')
    gpscentisec = models.CharField(max_length=100, blank=False, default='')
    latdegree = models.CharField(max_length=100, blank=False, default='')
    latmin = models.CharField(max_length=100, blank=False, default='')
    latsec = models.CharField(max_length=100, blank=False, default='')
    lngdegree = models.CharField(max_length=100, blank=False, default='')
    lngmin = models.CharField(max_length=100, blank=False, default='')
    lngsec = models.CharField(max_length=100, blank=False, default='')
    gpsspeed = models.CharField(max_length=100, blank=False, default='')
    gpsheading = models.CharField(max_length=100, blank=False, default='')
    creationTime=models.DateTimeField(auto_now=True)
    
class cellNew(models.Model):
    id = models.AutoField(primary_key=True)
    cell0 = models.CharField(max_length=100, blank=False, default='')
    cell1 = models.CharField(max_length=100, blank=False, default='')
    cell2 = models.CharField(max_length=100, blank=False, default='')
    cell3 = models.CharField(max_length=100, blank=False, default='')
    cell4 = models.CharField(max_length=100, blank=False, default='')
    cell5 = models.CharField(max_length=100, blank=False, default='')
    creationTime=models.DateTimeField(auto_now=True)

class heartNew(models.Model):
    id = models.AutoField(primary_key=True)
    beat = models.IntegerField()
    creationTime=models.DateTimeField(auto_now=True)