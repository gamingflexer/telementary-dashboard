from flask import Flask, render_template , Response , request , jsonify
from pymongo import MongoClient
from config import *
import pandas as pd
import time
import random as rd
from path import heart_beat_csv,location_csv#sample data for testing

app = Flask(__name__)

client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.zuo6mr7.mongodb.net/?retryWrites=true&w=majority")
db = client.flask_db
spark = db.spark


@app.route('/')
def index():
    return render_template('home.html')

#apis

@app.route('/api/heartbeat', methods=['GET'])
def heartbeat():
    if request.method == 'GET':
        t = time.localtime(time.time())
        return jsonify([[t.tm_sec,rd.randint(80.0, 100.0)]])


@app.route('/api/heartbeat-single', methods=['GET'])
def heartbeat_single():
    if request.method == 'GET':
        t = time.localtime(time.time())
        return jsonify(rd.randint(80.0, 100.0))

@app.route('/api/location', methods=['GET'])
def location():
    if request.method == 'GET':
        data = pd.read_csv(location_csv)
        out = data.to_dict(orient='records')
        return jsonify({'data': out})



if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True,port=5000)