from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, template_name='index.html', context={
        "name": 'Man dep trai'
    })


def welcome(request, year):
    return HttpResponse("Hello " + str(year))


def welcome2(request, year):
    return HttpResponse("Welcome " + str(year))