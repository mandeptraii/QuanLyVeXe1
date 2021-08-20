
from django.urls import path, re_path
from . import views
from .admin import admin_site

urlpatterns = [
    path('', views.index, name="index"),
    path('welcome/<str:year>/', views.welcome, name="welcome"),
    re_path(r'^welcome2/(?P<year>[0-9]{4})/$', views.welcome2, name="welcome2"),
    path('admin/', admin_site.urls)
]