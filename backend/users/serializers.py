# import random
# import string
# import json
# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from django.core.mail import send_mail
# from .models import Member

# # Function to generate random username
# def generate_random_username():
#     username = f"user{random.randint(1000, 9999)}"
#     while get_user_model().objects.filter(username=username).exists():
#         username = f"user{random.randint(1000, 9999)}"
#     return username

# # Function to generate random password
# def generate_random_password():
#     length = 12
#     characters = string.ascii_letters + string.digits + string.punctuation
#     return ''.join(random.choice(characters) for _ in range(length))

# # User Serializer
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=False)
#     username = serializers.CharField(required=False)

#     class Meta:
#         model = get_user_model()
#         fields = ['username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         email = validated_data.get('email')
#         username = validated_data.get('username', generate_random_username())
#         password = validated_data.get('password', generate_random_password())
#         user = get_user_model().objects.create_user(
#             username=username,
#             email=email,
#             password=password
#         )
#         # send_mail(
#         #     'Your Account Credentials',
#         #     f'Username: {username}\nPassword: {password}',
#         #     'mdfirojhasan.info@gmail.com',
#         #     [email],
#         #     fail_silently=False,
#         # )
#         return user

# # Member Serializer
# class MemberSerializer(serializers.ModelSerializer):
#     user = UserSerializer()

#     class Meta:
#         model = Member
#         fields = [
#             'id', 'user', 'member_type', 'members_role', 'full_name', 'general_contact', 'general_email',
#             'nid_number', 'photo', 'photo_low_quality', 'about_us', 'facebook_profile', 'linkedin_profile',
#             'permanent_address', 'present_address', 'date_of_birth', 'occupation', 'gender', 'marital_status',
#             'religion', 'nid_front', 'nid_back', 'is_org_member', 'is_comm_member', 'delivery_method',
#             'login_email', 'login_contact', 'photo_removed', 'nid_front_removed', 'nid_back_removed'
#         ]

#     def to_internal_value(self, data):
#         # If data is a QueryDict (from FormData), make a mutable copy
#         try:
#             data = data.copy()
#         except AttributeError:
#             # Already a dict (as in JSON payload)
#             pass

#         user_data = data.get("user")
#         if isinstance(user_data, str):
#             try:
#                 data["user"] = json.loads(user_data)
#             except json.JSONDecodeError:
#                 raise serializers.ValidationError({"user": "Invalid JSON format."})
#         return super().to_internal_value(data)
    



    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     username = user_data.get('username', generate_random_username())
    #     password = user_data.get('password', generate_random_password())
    #     email = user_data.get('email')

    #     user = get_user_model().objects.create_user(
    #         username=username,
    #         email=email,
    #         password=password
    #     )
    #     # send_mail(
    #     #     'Your Account Credentials',
    #     #     f'Username: {username}\nPassword: {password}',
    #     #     'mdfirojhasan.info@gmail.com',
    #     #     [email],
    #     #     fail_silently=False,
    #     # )
    #     return Member.objects.create(user=user, **validated_data)

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop('user', None)
#         if user_data:
#             user_instance = instance.user
#             for attr, value in user_data.items():
#                 setattr(user_instance, attr, value)
#             user_instance.save()

#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance


import random
import string
import json
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from .models import Member

def generate_random_username():
    return f"user{random.randint(1000, 9999)}"

def generate_random_password():
    chars = string.ascii_letters + string.digits + "!@#$%^&*()"
    return ''.join(random.choice(chars) for _ in range(12))

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {'required': False},
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('username', generate_random_username())
        password = validated_data.get('password', generate_random_password())
        
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )
        send_mail(
            'Your Account Credentials',
            f'Username: {username}\nPassword: {password}',
            'mdfirojhasan.info@gmail.com',
            [email],
            fail_silently=False,
        )
        return user

# class MemberSerializer(serializers.ModelSerializer):
#     user = UserSerializer(required=True)

#     class Meta:
#         model = Member
#         fields = '__all__'
#         extra_kwargs = {
#             'photo': {'required': False},
#             'nid_front': {'required': False},
#             'nid_back': {'required': False}
#         }

#     def to_internal_value(self, data):
#         # Handle multipart form data with nested user
#         if isinstance(data.get('user'), str):
#             try:
#                 data['user'] = json.loads(data['user'])
#             except json.JSONDecodeError:
#                 raise serializers.ValidationError({'user': 'Invalid JSON format'})
        
#         return super().to_internal_value(data)

#     def create(self, validated_data):
#         user_data = validated_data.pop('user')
        
#         # Generate username if not provided
#         if not user_data.get('username'):
#             user_data['username'] = generate_random_username()
        
#         # Generate password if not provided
#         if not user_data.get('password'):
#             user_data['password'] = generate_random_password()

#         # Create user
#         user_serializer = UserSerializer(data=user_data)
#         if user_serializer.is_valid(raise_exception=True):
#             user = user_serializer.save()

#         # Create member
#         member = Member.objects.create(user=user, **validated_data)
       
#         return member
    
    
    

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Member
        fields = '__all__'
        extra_kwargs = {
            'photo': {'required': False},
            'nid_front': {'required': False},
            'nid_back': {'required': False}
        }

    def to_internal_value(self, data):
        # Handle multipart form data with nested user
        if isinstance(data.get('user'), str):
            try:
                data['user'] = json.loads(data['user'])
            except json.JSONDecodeError:
                raise serializers.ValidationError({'user': 'Invalid JSON format'})
        return super().to_internal_value(data)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        username = user_data.get('username', generate_random_username())
        password = user_data.get('password', generate_random_password())
        email = user_data.get('email')

        # Create user using Django's create_user method
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Send email with account credentials
        send_mail(
            'Your Account Credentials',
            f'Username: {username}\nPassword: {password}',
            'mdfirojhasan.info@gmail.com',
            [email],
            fail_silently=False,
        )

        # Create and return member instance
        member = Member.objects.create(user=user, **validated_data)
        return member

     
    
    
    
    
    
    
    

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        
        # Update user
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid(raise_exception=True):
                user_serializer.save()

        # Update member
        return super().update(instance, validated_data)
