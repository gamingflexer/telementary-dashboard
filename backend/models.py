from django.db import models

# Create your models here.
class Projects(models.Model):
    projectId = models.AutoField(primary_key=True)
    projectName = models.CharField(max_length=100, blank=False, default='')
    disasterType = models.CharField(max_length=100,blank=False, default='')