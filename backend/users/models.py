from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    full_name = models.CharField(max_length=255, null=False, blank=False, default="Unknown")
    general_contact = models.CharField(max_length=20, null=False, blank=False, default="0000000000")
    general_email = models.EmailField(null=False, blank=False, default="unknown@example.com")


    member_type = models.CharField(max_length=50, null=True, blank=True)
    members_role = models.CharField(max_length=50, null=True, blank=True)
    nid_number = models.CharField(max_length=20, null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    photo_low_quality = models.ImageField(upload_to='photos/low_quality/', null=True, blank=True)
    about_us = models.TextField(null=True, blank=True)
    facebook_profile = models.URLField(null=True, blank=True)
    linkedin_profile = models.URLField(null=True, blank=True)
    permanent_address = models.TextField(null=True, blank=True)
    present_address = models.TextField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    occupation = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    marital_status = models.CharField(max_length=20, null=True, blank=True)
    religion = models.CharField(max_length=50, null=True, blank=True)
    nid_front = models.ImageField(upload_to='nid/', null=True, blank=True)
    nid_back = models.ImageField(upload_to='nid/', null=True, blank=True)
    is_org_member = models.BooleanField(default=False)
    is_comm_member = models.BooleanField(default=False)
    delivery_method = models.CharField(max_length=50, null=True, blank=True)
    login_email = models.EmailField(null=True, blank=True)
    login_contact = models.CharField(max_length=20, null=True, blank=True)
    photo_removed = models.BooleanField(default=False)
    nid_front_removed = models.BooleanField(default=False)
    nid_back_removed = models.BooleanField(default=False)

    def __str__(self):
        return f"Member Profile of {self.user.username}"
