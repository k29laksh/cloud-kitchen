from django.urls import path

from .views import LoginView, SignupView

urlpatterns = [
    path("userlogin", LoginView.as_view(), name="userlogin"),
    path("usersignup", SignupView.as_view(), name="usersignup"),
]