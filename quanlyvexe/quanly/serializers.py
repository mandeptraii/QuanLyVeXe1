from rest_framework.serializers import ModelSerializer
from .models import *


class GheSerializer(ModelSerializer):
    class Meta:
        model = Ghe
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'SoVeDaDat', 'is_staff', 'DoThanThiet', 'ThuViec', 'BenXe', 'ChuyenDaLai', 'DiemUyTin']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class TuyenSerializer(ModelSerializer):
    class Meta:
        model = Tuyen
        fields = "__all__"


class BenXeSerializer(ModelSerializer):
    class Meta:
        model = BenXe
        fields = ["id", "DiaDiem"]


class ChuyenSerializer(ModelSerializer):
    class Meta:
        model = Chuyen
        fields = ["id", "ThoiDiemDi", "Tuyen", "ThoiGianDuKien", "TaiXe", "Xe", "DoanhThu", "DaKhoiHanh"]


class XeSerializer(ModelSerializer):
    BenXe = BenXeSerializer()

    class Meta:
        model = Xe
        fields = ["id", "BienSoXe", "GheDaDat", "BenXe"]


class VeXeSerializer(ModelSerializer):
    class Meta:
        model = VeXe
        fields = "__all__"


class DanhGiaSerializer(ModelSerializer):
    class Meta:
        model = DanhGia
        fields = "__all__"