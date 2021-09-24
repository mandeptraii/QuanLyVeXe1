from rest_framework.serializers import ModelSerializer
from .models import *


class GheSerializer(ModelSerializer):
    class Meta:
        model = Ghe
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class BenXeSerializer(ModelSerializer):
    class Meta:
        model = BenXe
        fields = ["id", "DiaDiem"]


class XeSerializer(ModelSerializer):
    BenXe = BenXeSerializer()

    class Meta:
        model = Xe
        fields = ["id", "BienSoXe", "GheDaDat", "BenXe"]