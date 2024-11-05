from django.db import models
from django.contrib.auth.models import User
from chefAuth.models import KitchenProfile
from food.models import Food
import uuid

class Reviews(models.Model):
    rid=models.UUIDField(default=uuid.uuid4)
    foodItem=models.ForeignKey(Food,on_delete=models.CASCADE)
    kitchen=models.ForeignKey(KitchenProfile,on_delete=models.CASCADE)
    