from rest_framework.serializers import ModelSerializer
from . import models
from chefAuth.serializers import KitchenSerializers

class CategorySerailizer(ModelSerializer):
    class Meta:
        model=models.Category
        fields="__all__"

class FoodSerializer(ModelSerializer):
    cat=CategorySerailizer()
    kitchen=KitchenSerializers()
    class Meta:
        model=models.Food
        fields="__all__"



