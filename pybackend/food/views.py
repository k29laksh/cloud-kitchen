from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models
from chefAuth.models import KitchenProfile

class KitchenFood(APIView):
    def get(self,request,pk=None):
        if pk is None:
            try:
                food=models.Food.objects.get.all()
                serial=serializers.FoodSerializer(food,many=True)
                if serial.is_valid():
                    serial.save()
                    return Response(serial.data,status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"Error": f"An error occurred: {str(e)}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            try:
                kitchen=models.KitchenProfile.objects.get(kitchenname=pk)
                food=models.Food.objects.get(kitchen=kitchen)
                serial=serializers.FoodSerializer(food,many=True)
                if serial.is_valid():
                    serial.save()
                    return Response(serial.data,status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"Error": f"An error occurred: {str(e)}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)