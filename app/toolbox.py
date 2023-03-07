from PIL import Image

from io import BytesIO

import numpy as np

import os

import re

import base64

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

    return labels[label_index]

def save_image(image_base_64, saved_image_path, image_name):
    image_data = re.sub("^data:image/.+;base64,", "", image_base_64)
    image = Image.open(BytesIO(base64.b64decode(image_data)))

    image.save(os.path.join(saved_image_path, image_name))
