from django.db import models

# Create your models here.
class FoodItem(models.Model):
    name = models.CharField(max_length=100, unique=True)
    frequently_bought_with = models.TextField(null=True)

    def __str__(self):
        return self.name    
    
class Notification(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content