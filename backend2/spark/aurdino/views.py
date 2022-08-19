import re,json
from django.shortcuts import render
from pymongo import MongoClient
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from aurdino.serializers import *

# Create your views here.
@csrf_exempt
def index(request):
    return JsonResponse({'data':"Test"})

@csrf_exempt
def location(request):
    if request.method == 'POST':
        data0 = request.body.decode("utf-8")
        gpsyear,gpsmonth,gpsday,gpshour,gpsmin,gpssec,gpscentisec,latdegree,latmin,latsec,lngdegree,lngmin,lngsec,gpsspeed,gpsheading = data0.split(",")
        temp = {'gpsyear':gpsyear,'gpsmonth':gpsmonth,'gpsday':gpsday,'gpshour':gpshour,'gpsmin':gpsmin,'gpssec':gpssec,'gpscentisec':gpscentisec,'latdegree':latdegree,'latmin':latmin,'latsec':latsec,'lngdegree':lngdegree,'lngmin':lngmin,'lngsec':lngsec,'gpsspeed':gpsspeed,'gpsheading':gpsheading}
        dataserlizer = locationNewSerilizer(data=temp)
        if locationNewSerilizer.is_valid(dataserlizer):
            locationNewSerilizer.save(dataserlizer)
        return JsonResponse({'message': 'SUCESS'}, status=201)
    if request.method == 'GET':
        projectData = locationNew.objects.all()
        locSerlier = locationNewSerilizer(projectData, many=True)
        return JsonResponse({'data':locSerlier.data})

@csrf_exempt
def heartbeat(request):
    if request.method == 'POST':
        data0 = request.body.decode("utf-8")
        beat = data0.split(',')
        temp = {'beat':beat}
        dataserlizer = heartNewSerilizer(data=temp)
        if heartNewSerilizer.is_valid(dataserlizer):
            heartNewSerilizer.save(dataserlizer)
        return JsonResponse({'message': 'SUCESS'}, status=201)
    
    if request.method == 'GET':
        projectData = heartNew.objects.all()
        heartbeatSerlier = heartNewSerilizer(projectData, many=True)
        return JsonResponse({'data':heartbeatSerlier.data})
    
@csrf_exempt
def cell(request):
    if request.method == 'POST':
        data0 = request.body.decode("utf-8")
        cell0, cell1, cell2, cell3, cell4, cell5= data0.split(',')
        temp = {'cell0':cell0, 'cell1':cell1, 'cell2':cell2, 'cell3':cell3, 'cell4':cell4, 'cell5':cell5}
        dataserlizer = cellNewSerilizer(data=temp)
        if cellNewSerilizer.is_valid(dataserlizer):
            cellNewSerilizer.save(dataserlizer)
        return JsonResponse({'message': 'SUCESS'}, status=201)
    if request.method == 'GET':
        projectData = cellNew.objects.all()
        cellSerlier = cellNewSerilizer(projectData, many=True)
        return JsonResponse({'data':cellSerlier.data})