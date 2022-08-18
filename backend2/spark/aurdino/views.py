from django.shortcuts import render
from pymongo import MongoClient
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from aurdino.serializers import *

# Create your views here.


@csrf_exempt
def location(request):
    if request.method == 'POST':
        data0 = JSONParser().parse(request)
        dataserlizer = locationNewSerilizer(data=data0)
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
        data0 = JSONParser().parse(request)
        dataserlizer = heartNewSerilizer(data=data0)
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
        data0 = JSONParser().parse(request)
        dataserlizer = cellNewSerilizer(data=data0)
        if cellNewSerilizer.is_valid(dataserlizer):
            cellNewSerilizer.save(dataserlizer)
        return JsonResponse({'message': 'SUCESS'}, status=201)
    if request.method == 'GET':
        projectData = cellNew.objects.all()
        cellSerlier = cellNewSerilizer(projectData, many=True)
        return JsonResponse({'data':cellSerlier.data})