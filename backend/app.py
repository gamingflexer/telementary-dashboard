from flask import Flask, render_template , Response , request , jsonify
from pymongo import MongoClient
from config import *

app = Flask(__name__)

client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.zuo6mr7.mongodb.net/?retryWrites=true&w=majority")
db = client.flask_db
spark = db.spark


@app.route('/home')
def index():
    return render_template('home.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True,port=5000)