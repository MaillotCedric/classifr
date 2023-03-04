from PIL import Image

import numpy as np

import tensorflow as tf

def get_image(image_path, shape):
    image = Image.open(image_path).resize(shape)

    return image

def get_labels(datasets_path):
    labels = tf.keras.preprocessing.image_dataset_from_directory(datasets_path).class_names

    return labels

def predict_image(model, image_path, shape, datasets_path="data/images"):
    image = get_image(image_path, shape)
    np_image = np.asarray(image)
    labels = get_labels(datasets_path)
    predictions = model.predict(np.array([np_image]))
    label_index = np.argmax(predictions)

    return labels[label_index]
