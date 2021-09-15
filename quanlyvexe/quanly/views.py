from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework.parsers import MultiPartParser
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
# Create your views here.


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]


class XeViewSet(viewsets.ModelViewSet):
    queryset = Xe.objects.all()
    serializer_class = XeSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def get_permissions(self):
    #     if self.action == 'list':
    #         return [permissions.AllowAny()]
    #
    #     return [permissions.IsAuthenticated()]

    @action(methods=['post'], detail=True)
    def hide_xe(self, request, pk):
        try:
            x = Xe.objects.get(pk=pk)
            x.GheDaDat = 45
            x.save()
        except Xe.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(data=XeSerializer(x, context={'request': request}).data, status=status.HTTP_200_OK)


class BenXeViewSet(viewsets.ModelViewSet):
    queryset = BenXe.objects.all()
    serializer_class = BenXeSerializer


# def index(request):
#     return render(request, template_name='index.html', context={
#         "name": 'Man dep trai'
#     })
#
#
# def welcome(request, year):
#     return HttpResponse("Hello " + str(year))
#
#
# def welcome2(request, year):
#     return HttpResponse("Welcome " + str(year))
#
#
# class TestView(View):
#     def get(self, request):
#         return HttpResponse("Testing")
#
#     def post(self, request):
#         pass