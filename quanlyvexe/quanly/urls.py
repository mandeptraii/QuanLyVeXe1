
from django.urls import path, re_path, include
from . import views
from .admin import admin_site
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('xe', views.XeViewSet, basename='xe')
router.register('benxe', views.BenXeViewSet, basename='benxe')
router.register('user', views.UserViewSet, basename='user')
router.register('ghe', views.GheViewSet, basename='ghe')
router.register('tuyen', views.TuyenViewSet, basename='tuyen')
router.register('tuyen1', views.TuyenViewSet1, basename='tuyen1')
router.register('tuyen2', views.TuyenViewSet2, basename='tuyen2')
router.register('tuyen3', views.TuyenViewSet3, basename='tuyen3')
router.register('tuyen4', views.TuyenViewSet4, basename='tuyen4')
router.register('tuyen5', views.TuyenViewSet5, basename='tuyen5')
router.register('tuyen6', views.TuyenViewSet6, basename='tuyen6')
router.register('chuyen', views.ChuyenViewSet, basename='chuyen')
router.register('chuyenchuachay', views.ChuyenChuaChayViewSet, basename='chuyenchuachay')
router.register('chuyendachay', views.ChuyenDaChayViewSet, basename='chuyendachay')
router.register('chuyen1', views.ChuyenViewSet1, basename='chuyen1')
router.register('chuyen2', views.ChuyenViewSet2, basename='chuyen2')
router.register('chuyen3', views.ChuyenViewSet3, basename='chuyen3')
router.register('chuyen4', views.ChuyenViewSet4, basename='chuyen4')
router.register('chuyen5', views.ChuyenViewSet5, basename='chuyen5')
router.register('chuyen6', views.ChuyenViewSet6, basename='chuyen6')
router.register('vexe', views.VeXeViewSet, basename='vexe')
router.register('danhgia', views.DanhGiaViewSet, basename='danhgia')


urlpatterns = [
    path('', include(router.urls)),
    # path('welcome/<str:year>/', views.welcome, name="welcome"),
    # path('test/', views.TestView.as_view()),
    # re_path(r'^welcome2/(?P<year>[0-9]{4})/$', views.welcome2, name="welcome2"),
    # path('admin/', admin_site.urls)
]