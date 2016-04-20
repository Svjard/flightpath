from django.conf.urls import include, patterns, url
from django.contrib import admin

urlpatterns = patterns(
  '',
  url(r'', include('main.urls')),
  url(r'^api/v1/', include('authentication.urls')),
  url(r'^api/v1/', include('posts.urls')),
  url(r'^admin/', include(admin.site.urls))
)

urlpatterns += [
  url(r'^api-auth/', include('rest_framework.urls',
    namespace='rest_framework'))
]

# Redirect to webapp URL
# TODO Server-side rendering
urlpatterns += [
  url(r'^.*$', include('main.urls')),
]
