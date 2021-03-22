import json
from django.shortcuts import render, redirect
from django.http import JsonResponse

from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required

from .models import *
from .forms import CreateUserForm

# Create your views here.
def registerPage(request):
    
    if request.user.is_authenticated:
        return redirect('index')
    
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'User {username} has been registered')
            return redirect('login')
    else:
        form = CreateUserForm()

    context = {'form':form}
    return render(request, 'frontend/register.html', context)

def loginPage(request):

    if request.user.is_authenticated:
        return redirect('index')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'Username or password is incorrect.')
            return render(request, 'frontend/login.html')

    context = {}
    return render(request, 'frontend/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')

# @login_required(login_url='login')
def BookList(request):
    if request.user.is_anonymous:
        messages.info(request, 'Login before using our library')
        return redirect('login')
    context = {}
    return render(request, 'frontend/index.html', context)

def updateBook(request):
    if request.user.is_anonymous:
        messages.info(request, 'Login before using our library')
        return redirect('login')
    else:
        data = json.loads(request.body)
        title = data['title']
        author = data['author']
        isbn = data['isbn']
        action = data['action']
        # print('title:', title)
    
    book = Book.objects.get(id=bookId)
    book.save()

    if action == 'add':
        Book, created = OrderItem.objects.get_or_create(book=book)

    
    return JsonResponse('Book was added', safe=False)
