from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class BenXe(models.Model):
    DiaDiem = models.CharField(max_length=255)

    def __str__(self):
        return self.DiaDiem

    class Meta:
        verbose_name_plural = "Bến xe"


class User(AbstractUser):
    NamSinh = models.DateField(null=True)
    avatar = models.ImageField(upload_to='uploads/%Y/%m')
    BenXe = models.ForeignKey(BenXe, on_delete=models.CASCADE, default=None, null=True)
    TienLuong = models.DecimalField(max_digits=12, decimal_places=0, default=None, null=True)
    DiemUyTin = models.FloatField(null=True)
    ThuViec = models.BooleanField(default=None, null=True)
    ChuyenDaLai = models.IntegerField(default=None, null=True)
    DoThanThiet = models.IntegerField(default=None, null=True)
    SoVeDaDat = models.IntegerField(default=None, null=True)

    class Meta:
        verbose_name_plural = "User"


class Ghe(models.Model):
    TenGhe = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.TenGhe

    class Meta:
        verbose_name_plural = "Ghế"


class Xe(models.Model):
    DaKhoiHanh = models.BooleanField(default=False)
    BienSoXe = models.CharField(max_length=20)
    GheDaDat = models.IntegerField()
    BenXe = models.ForeignKey(BenXe, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.BienSoXe

    class Meta:
        verbose_name_plural = "Xe"


class XeVaGhe(models.Model):
    Xe = models.ForeignKey(Xe, on_delete=models.CASCADE)
    Ghe = models.ForeignKey(Ghe, on_delete=models.CASCADE)
    GiaTien = models.DecimalField(max_digits=12, decimal_places=0, null=True)
    DaDat = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Xe và ghế"


class Tuyen(models.Model):
    NoiKhoiHanh = models.ForeignKey(BenXe, related_name="tuyen_khoi_hanh", on_delete=models.CASCADE, null=True)
    NoiDen = models.ForeignKey(BenXe, related_name="tuyen_den", on_delete=models.CASCADE, null=True)
    GiaTien = models.DecimalField(max_digits=12, decimal_places=0, null=True)

    def __str__(self):
        return str(self.NoiKhoiHanh) + " -> " + str(self.NoiDen)

    class Meta:
        verbose_name_plural = "Tuyến"


class Chuyen(models.Model):
    Tuyen = models.ForeignKey(Tuyen, on_delete=models.SET_NULL, null=True)
    Xe = models.ForeignKey(Xe, on_delete=models.SET_NULL, null=True)
    ThoiDiemDi = models.DateTimeField()
    ThoiGianDuKien = models.IntegerField()
    DaKhoiHanh = models.BooleanField()
    TaiXe = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    DoanhThu = models.DecimalField(max_digits=12, decimal_places=0, null=True)

    class Meta:
        verbose_name_plural = "Chuyến"


class VeXe(models.Model):
    KhachHang = models.ForeignKey(User, on_delete=models.CASCADE)
    Chuyen = models.ForeignKey(Chuyen, on_delete=models.CASCADE)
    GiaTien = models.DecimalField(max_digits=12, decimal_places=0, null=True)
    SoLuong = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Vé xe"


class ChiTieu(models.Model):
    NhanVienBanVe = models.ForeignKey(User, related_name="ChiTieuNhanVien", on_delete=models.SET_NULL, null=True)
    TaiXe = models.ForeignKey(User, related_name="ChiTieuTaiXe", on_delete=models.SET_NULL, null=True)
    ThoiDiem = models.DateField()

    class Meta:
        verbose_name_plural = "Chi tiêu"


class XeBaoTri(models.Model):
    Xe = models.ForeignKey(Xe, related_name="xe", on_delete=models.SET_NULL, null=True)
    ThoiDiem = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Xe bảo trì"


class DanhGia(models.Model):
    NguoiDung = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    ThoiGian = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    NoiDung = RichTextUploadingField()
    SoSao = models.FloatField()
    Chuyen = models.ForeignKey(Chuyen, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Đánh giá"
