import os
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_migrate import Migrate
#import trend_app_protect.start


app = Flask(__name__)
CORS(app)

database_settings = 'postgresql://'+os.environ['POSTGRES_USER'] + \
    ':'+os.environ['POSTGRES_PASSWORD']+'@' + \
    os.environ['POSTGRES_ADDR']+'/app'

logging.warning(database_settings)

app.config['SQLALCHEMY_DATABASE_URI'] = database_settings
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Init db
db = SQLAlchemy(app)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)
    photo = db.Column(db.String(200))

    def __init__(self, name, description, price, qty):
        self.name = name
        self.description = description
        self.price = price
        self.qty = qty
        self.photo = photo


migrate = Migrate(app, db)
