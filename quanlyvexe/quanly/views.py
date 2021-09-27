from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
# Create your views here.


class GheViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Ghe.objects.all()
    serializer_class = GheSerializer
    pagination_class = None


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def current_user(self, request):
        return Response(self.serializer_class(request.user).data)

    # def get_permissions(self):
    #     if self.action == 'retrieve':
    #         return [permissions.IsAuthenticated()]
    #
    #     return [permissions.AllowAny()]


class XePagination(PageNumberPagination):
    page_size = 3


class XeViewSet(viewsets.ModelViewSet):
    queryset = Xe.objects.all()
    serializer_class = XeSerializer
    pagination_class = XePagination

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
    pagination_class = None


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