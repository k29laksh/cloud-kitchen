from django.db import models
from django.contrib.auth.models import User
from chefAuth.models import KitchenProfile
import uuid

class Reviews(models.Model):
    rid=models.UUIDField(default=uuid.uuid4)
    