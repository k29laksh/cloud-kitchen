from django.urls import path

from .views import LoginView, SignupView

urlpatterns = [
    path("cheflogin", LoginView.as_view(), name="cheflogin"),
    path("chefsignup", SignupView.as_view(), name="chefsignup"),
]