from rest_framework.serializers import ModelSerializer
from .models import *


class BenXeSerializer(ModelSerializer):
    class Meta:
        model = BenXe
        fields = ["id", "DiaDiem"]


class XeSerializer(ModelSerializer):
    BenXe = BenXeSerializer()

    class Meta:
        model = Xe
        fields = ["id", "BienSoXe", "GheDaDat", "BenXe"]