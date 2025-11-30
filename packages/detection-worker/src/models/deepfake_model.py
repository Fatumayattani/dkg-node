import random

class DeepfakeModel:
    def __init__(self):
        pass

    def predict(self, frames):
        # Fake scoring logic for now
        score = random.uniform(0, 1)

        confidence = abs(0.5 - score) * 2  # more distance from 0.5 = higher confidence
        explanation = "Synthetic model placeholder logic"

        return score, confidence, explanation
