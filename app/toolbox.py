from PIL import Image

import numpy as np

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
