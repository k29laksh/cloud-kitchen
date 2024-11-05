from django.db import models
from django.contrib.auth.models import User
from chefAuth.models import KitchenProfile
import uuid
# Create your models here.

class Category(models.Model):
    cat_id=models.UUIDField(default=uuid.uuid4)
    cat_name=models.CharField(max_length=100)
    def __str__(self):
        return self.cat_name

class Food(models.Model):
    kitchen=models.ForeignKey(KitchenProfile,on_delete=models.CASCADE,related_name="kitchen")
    name=models.CharField(max_length=100)
    description=models.TextField()
    price=models.IntegerField()
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name="cat")
    img=models.ImageField(upload_to="Food/")
    time=models.IntegerField()
    kcal=models.IntegerField(blank=True)
    ingredients=models.TextField()
    def __str__(self):
        return self.name
