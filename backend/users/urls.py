from django.urls import path
from .views import RegisterUserView, AllProfilesView, CustomTokenObtainPairView, SingleProfileView
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('member_list/', AllProfilesView.as_view(), name='member_list'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('single_member/<int:id>/', SingleProfileView.as_view(), name='single_member'),
]

# Development mode-এ মিডিয়া ফাইল সার্ভ করার জন্য
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)