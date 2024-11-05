from django.contrib.auth.models import User
from django.db import models

class KitchenProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="kichenprofile")
    address=models.TextField(max_length=200)
    kitchenname=models.CharField(max_length=30)
    image=models.ImageField(upload_to="kitchenphotos/")
    coverImage=models.ImageField(upload_to="kitchenphotos/")
    documents=models.FileField(upload_to="chefdocs/")
    exprience=models.IntegerField()
    ph=models.IntegerField()
    speciality=models.TextField(max_length=100)
    def __str__(self):
        return self.kitchenname