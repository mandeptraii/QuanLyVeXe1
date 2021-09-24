
from django.urls import path, re_path, include
from . import views
from .admin import admin_site
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('xe', views.XeViewSet, basename='xe')
router.register('benxe', views.BenXeViewSet, basename='benxe')
router.register('user', views.UserViewSet, basename='user')
router.register('ghe', views.GheViewSet, basename='ghe')


urlpatterns = [
    path('', include(router.urls)),
    # path('welcome/<str:year>/', views.welcome, name="welcome"),
    # path('test/', views.TestView.as_view()),
    # re_path(r'^welcome2/(?P<year>[0-9]{4})/$', views.welcome2, name="welcome2"),
    # path('admin/', admin_site.urls)
]