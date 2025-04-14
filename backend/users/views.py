from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser

import logging

logger = logging.getLogger(__name__)

from .models import Member
from .serializers import MemberSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    # Customizing the JWT token obtain view to return a custom message
    def post(self, request, *args, **kwargs):
        # Call the parent class's post method to generate JWT tokens
        response = super().post(request, *args, **kwargs)
        
        # If the request is successful, add custom success message with tokens
        if response.status_code == status.HTTP_200_OK:
            return Response({
                'message': 'Login Successful',
                'access_token': response.data['access'],
                'refresh_token': response.data['refresh']
            })
        return response
    
    
 




class RegisterUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MemberSerializer
    parser_classes = (MultiPartParser, FormParser)  # ফাইল আপলোডের জন্য


    def create(self, request, *args, **kwargs):
        # 1. লগ স্টেটমেন্ট দিয়ে রিকোয়েস্ট ডেটা প্রিন্ট করুন
        print("\n\nReceived data from frontend:")
        print("Headers:", request.headers)
        print("Body data:", request.data)
        print("Files:", request.FILES)
        print("\n")

        # 2. ফাইল সহ সম্পূর্ণ ডেটা লগ ফাইলে সেভ করুন (ঐচ্ছিক)
        logger.debug("Full request data: %s", request.data)
        
        # 3. ডিফল্ট ক্রিয়েট মেথড কল করুন
        response = super().create(request, *args, **kwargs)
        
        # 4. রেস্পন্সও প্রিন্ট করে দেখুন
        print("\n\nResponse data:", response.data)
        return response

    def perform_create(self, serializer):
        # 5. সিরিয়ালাইজার ডেটা প্রিন্ট করুন
        print("Serializer validated data:", serializer.validated_data)
        serializer.save()


# lass RegisterUserView(generics.CreateAPIView):
#     queryset = get_user_model().objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = MemberSerializer
#     parser_classes = (MultiPartParser, FormParser)  # ফাইল আপলোডের জন্য

#     def create(self, request, *args, **kwargs):
#         # instance তৈরি করার জন্য ডিফল্ট create মেথড কল করা হচ্ছে
#         super().create(request, *args, **kwargs)
#         data = {
#             'success': True,
#             'message': 'User created successfully.'
#         }
#         return Response(data, status=status.HTTP_201_CREATED)

#     def perform_create(self, serializer):
#         serializer.save()



class AllProfilesView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]  
    serializer_class = MemberSerializer
    queryset = Member.objects.all()
    
class SingleProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]  # Adjust permissions if needed
    serializer_class = MemberSerializer
    queryset = Member.objects.all()
    lookup_field = 'id'

