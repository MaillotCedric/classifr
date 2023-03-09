from PIL import Image

from io import BytesIO

from decimal import Decimal, ROUND_DOWN

import numpy as np

import os

import re

import base64

import math

def rounded_percentage(number, nb_of_decimals):
    return rounded_decimal(Decimal(math.floor(number * 100 * math.pow(10, nb_of_decimals)) / math.pow(10, nb_of_decimals)))

def rounded_decimal(decimal_number):
    return Decimal(decimal_number).quantize(Decimal('.1'), rounding=ROUND_DOWN)

def formated_path(path):
    return "../" + re.sub(".*classifr/", '', path.replace("\\", "/"))

def get_image(image_path, shape):
    image = Image.open(image_path).resize(shape)

    return image

def get_labels():
    return ["tulipe", "rose", "tournesol", "pizza", "gateau"]

def predict_image(model, image_path, shape):
    image = get_image(image_path, shape)
    np_image = np.asarray(image)
    labels = get_labels()
    predictions = model.predict(np.array([np_image]))
    label_index = np.argmax(predictions)
    resultats = []

    for index, prediction in enumerate(predictions[0]):
        confidence = rounded_percentage(prediction, 1)

        resultats.append({
            "categorie": labels[index],
            "confidence": confidence if confidence < 100 else rounded_decimal(Decimal(99.9))
        })

    # return labels[label_index]
    return resultats

def save_image(image_base_64, saved_image_path, image_name):
    image_data = re.sub("^data:image/.+;base64,", "", image_base_64)
    image = Image.open(BytesIO(base64.b64decode(image_data)))

    image.save(os.path.join(saved_image_path, image_name))
