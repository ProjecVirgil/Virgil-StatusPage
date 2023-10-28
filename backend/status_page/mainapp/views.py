from django.shortcuts import render

# Create your views here.
def ciao(request):
    return render(request,'mainapp/rolls.html')
