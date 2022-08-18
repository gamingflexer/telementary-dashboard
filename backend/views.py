from config import *
from pymongo import MongoClient
from models import CarInfo
from serializers import CarInfoSerializer

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo

from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId

# client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.zuo6mr7.mongodb.net/?retryWrites=true&w=majority")
# db = client.flask_db
# spark = db.spark





# dumb code #fetch data from mongodb
'''    projectData = Projects.objects.get(projectId=project_id)
    project_serializer = ProjectsSerializer(projectData)'''
    
# save data to mongodb
    
'''     statistic_serializer = StatisticSerializers(data=save_data)
        if statistic_serializer.is_valid():
            print("True")
            statistic_serializer.save()'''

'''TwitterQueryset = Twitter.objects.all().filter(projectId=39)'''