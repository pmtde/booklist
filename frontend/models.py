from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .forms import User
# Create your models here.

# class Account(AbstractBaseUser):
#     username = models.CharField(max_length=50, unique=True)
    

class Book(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.IntegerField()

    def __str__(self):
        return '{self.title} by {self.author}'.format(self=self)
    