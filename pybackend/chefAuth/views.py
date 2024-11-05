from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from . import auth
from . import serializers
from . import models
# Create your views here.
class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            if not username or not password:
                return Response(
                    {"Error": "all fields are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = auth.authenticate_user(username, password)
            if user is not None:
                tokens = auth.get_tokens_for_user(user)
                user.save()
                serializer = serializers.userSerializers(user)
                return Response(
                    {
                        "refresh": tokens["refresh"],
                        "access": tokens["access"],
                        "user": serializer.data,
                    },
                    status=status.HTTP_202_ACCEPTED,
                )
            else:
                return Response(
                    {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {"Error": f"Error occured during login {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class SignupView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")
            username = request.data.get("username")
            kitchenname=request.data.get("kitchenname")
            exp=request.data.get("exp")
            ph=request.data.get("ph")
            speciality=request.data.get("speciality")
            address=request.data.get("address")
            if not email or not password or not username:
                return Response(
                    {"Error": "All fileds are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            elif User.objects.filter(email=email).exists():
                return Response(
                    {"error": "Email already exits"}, status=status.HTTP_400_BAD_REQUEST
                )

            elif User.objects.filter(username=username).exists():
                return Response(
                    {"error": "Username already exits"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            else:
                new_user = User.objects.create_user(username=username, email=email)
                new_user.set_password(password)
                new_user.save()
                new_user_profile = models.KitchenProfile.objects.create(user=new_user,address=address,kitchenname=kitchenname,exprience=exp,ph=ph,speciality=speciality)
                serializer = serializers.KitchenSerializers(new_user)
                return Response(
                    {"Success": "User Signuped Successfully"},
                    status=status.HTTP_201_CREATED,
                )
        except Exception as e:
            return Response(
                {"Error": f"Something Went while Signing up {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )