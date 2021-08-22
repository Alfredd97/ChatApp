from django.db import models

# Create your models here.
class Users(models.Model):
	
	name = models.CharField()
	phone = models.PhoneNumberField()
	mail = models.EmailField()
	

    class Meta:
        verbose_name = "Users"
        verbose_name_plural =	
       "Userss"
	
    def __str__(self):
        pass
    