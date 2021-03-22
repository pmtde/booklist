from django.shortcuts import render
from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookList, name='index'),

    path('register/', views.registerPage, name='register'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),

    path('update_book', views.updateBook, name='update_book'),
]
