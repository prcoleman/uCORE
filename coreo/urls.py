from django.conf.urls.defaults import *
from django.contrib import databrowse

from coreo.ucore.models import Link, LinkLibrary, Skin, Tag, Trophy, TrophyCase, CoreUser

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^coreo/', include('coreo.foo.urls')),
    (r'^ucore/', include('coreo.ucore.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    (r'^databrowse/(.*)', databrowse.site.root),
)

databrowse.site.register(Link)
databrowse.site.register(LinkLibrary)
databrowse.site.register(Skin)
databrowse.site.register(Tag)
databrowse.site.register(Trophy)
databrowse.site.register(TrophyCase)
databrowse.site.register(CoreUser)
