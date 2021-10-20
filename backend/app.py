import os
import logging
import random
import string
from flask import Flask, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

database_settings = 'postgresql://'+os.environ['POSTGRES_USER'] + \
    ':'+os.environ['POSTGRES_PASSWORD']+'@' + \
    os.environ['POSTGRES_ADDR']+'/app'
UPLOAD_FOLDER = './files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

logging.warning(database_settings)

app.config['SQLALCHEMY_DATABASE_URI'] = database_settings
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Product Class/Model


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)
    photo = db.Column(db.String(200))

    def __init__(self, name, description, price, qty, photo):
        self.name = name
        self.description = description
        self.price = price
        self.qty = qty
        self.photo = photo


# Product Schema


class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'price', 'qty', 'photo')


# Init schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

# Create a Product


@app.route('/product', methods=['POST'])
def add_product():

    print('----------product-------------')
    print('Request', request.json)
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']
    photo = request.json['photo']
    new_product = Product(name, description, price, qty, photo)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

# Get All Products


@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    # return jsonify(result.data)
    print('Result: ', result)

    return jsonify(result)
# Get Single Products


@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)

    return product_schema.jsonify(product)

# Update a Product


@app.route('/product/<id>', methods=['POST'])
def update_product(id):
    print('----------Update-------------')
    print('Request', request.json)
    product = Product.query.get(id)

    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']
    # photo = request.json['photo']

    product.name = name
    product.description = description
    product.price = price
    product.qty = qty
   # product.photo = photo
    db.session.commit()
  #  print(product)
    return product_schema.jsonify(product)

# Delete Product


@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

    return product_schema.jsonify(product)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    logging.warning('Uploading')
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            logging.warning('no Files')
          #  flash('No file part')
            return "No Post Data", 400
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            logging.warning('No Selected File')
            return "No File", 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_uuid = ''.join(random.SystemRandom().choice(
                string.ascii_letters + string.digits) for _ in range(5))

            final_filename = file_uuid + '-' + filename
            logging.warning(final_filename)
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], final_filename))
            return (final_filename)
    return "No File", 400


# Run Server
if __name__ == '__main__':
    app.run(debug=True)
