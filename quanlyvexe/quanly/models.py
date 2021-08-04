from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.f

class User(AbstractUser):
    avatar=models.ImageField(upload_to='uploads/%y/%m')

class Tuyen(models.Model):
    NoiBatDau=models.CharField(max_length=100, null=False,unique=True)
    NoiDen=models.CharField(max_length=100,null=False,unique=True)


class Xe(models.Model):
    DaKhoiHanh=models.BooleanField(default=True)
    BienSoXe=models.CharField(max_length=20)
    GheDaDat=models.IntegerField()

class Ghe(models.Model):
    TinhTrang=models.BooleanField()



class Chuyen(models.Model):
    Tuyen=models.ForeignKey(Tuyen,on_delete=models.CASCADE)
    Xe=models.ForeignKey(Xe,on_delete=models.CASCADE)
    ThoiDiemDi=models.DateTimeField()
    ThoiGianDuKien=models.IntegerField()
    DaKhoiHanh=models.BooleanField()
    TaiXe=models.CharField(max_length=100,null=True)
    SoKhach=models.IntegerField()

class DanhGia(models.Model):
    NoiDung=models.TextField(max_length=200)
    SoSao=models.IntegerField()
    Chuyen=models.ForeignKey(Chuyen,on_delete=models.CASCADE)

