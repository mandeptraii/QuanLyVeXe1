from django.db import models
from django.contrib.auth.models import AbstractUser


class BenXe(models.Model):
    DiaDiem = models.CharField(max_length=255)


class User(AbstractUser):
    NamSinh = models.DateTimeField(null=True)
    avatar = models.ImageField(upload_to='uploads/%Y/%m', default=None)


class NhanVienBanVe(User):
    BenXe = models.ForeignKey(BenXe, on_delete=models.CASCADE, default=None)
    TienLuong = models.DecimalField(max_digits=8, decimal_places=2, null=True)


class TaiXe(User):
    DiemUyTin = models.FloatField()
    LaiChinh = models.BooleanField(default=True)
    ChuyenDaLai = models.IntegerField(default=0)
    BenXe = models.ForeignKey(BenXe, on_delete=models.CASCADE, default=None)
    TienLuong = models.DecimalField(max_digits=8, decimal_places=2, null=True)


class KhachHang(User):
    DoThanThiet = models.IntegerField(default=0)
    SoVeDaDat = models.IntegerField(default=0)


class Ghe(models.Model):
    TenGhe = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.TenGhe


class Xe(models.Model):
    DaKhoiHanh = models.BooleanField(default=True)
    BienSoXe = models.CharField(max_length=20)
    GheDaDat = models.IntegerField()


class XeVaGhe(models.Model):
    Xe = models.ForeignKey(Xe, on_delete=models.CASCADE)
    Ghe = models.ForeignKey(Ghe, on_delete=models.CASCADE)
    GiaTien = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    DaDat = models.BooleanField(default=False)


class Tuyen(models.Model):
    NoiKhoiHanh = models.ForeignKey(BenXe, related_name="TuyenKhoiHanh", on_delete=models.CASCADE, null=True)
    NoiDen = models.ForeignKey(BenXe, related_name="TuyenDen", on_delete=models.CASCADE, null=True)
    GiaTien = models.DecimalField(max_digits=8, decimal_places=2, null=True)


class Chuyen(models.Model):
    Tuyen = models.ForeignKey(Tuyen, on_delete=models.SET_NULL, null=True)
    Xe = models.ForeignKey(Xe, on_delete=models.SET_NULL, null=True)
    ThoiDiemDi = models.DateTimeField()
    ThoiGianDuKien = models.IntegerField()
    DaKhoiHanh = models.BooleanField()
    TaiXe = models.ForeignKey(TaiXe, on_delete=models.SET_NULL, null=True)
    DoanhThu = models.DecimalField(max_digits=8, decimal_places=2, null=True)


class DanhGia(models.Model):
    NguoiDung = models.ForeignKey(KhachHang, on_delete=models.SET_NULL, null=True)
    ThoiGian = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    NoiDung = models.TextField(max_length=200)
    SoSao = models.FloatField()
    Chuyen = models.ForeignKey(Chuyen, on_delete=models.CASCADE)
