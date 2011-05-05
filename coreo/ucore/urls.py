from django.conf.urls.defaults import *
from django.conf import settings


urlpatterns = patterns('coreo.ucore.views',
    (r'^$', 'index'),
    (r'^register/(?P<sid>\w*)/$', 'register'), # the regex should probably enforce a min length
    (r'^ge/$', 'ge_index'),
    (r'^gm/$', 'gm_index'),
    (r'^check-username/$', 'check_username'),
    (r'^create-user/$', 'create_user'),
    (r'^future-feature/$', 'future_feature'),
    (r'^update-user/$', 'update_user'),
    (r'^update-password/$', 'update_password'),
    (r'^export-csv/$', 'get_csv'),
    (r'^add-library/$', 'add_library'),
    (r'^create-library/$', 'create_library'),
    (r'^update-library/$', 'update_library'),
    (r'^libraries/$', 'get_libraries'),
    (r'^export-shp/$', 'get_shapefile'),
    (r'^export-kmz/$', 'get_kmz'),
    (r'^get-tags/$', 'get_tags'),
    (r'^user-profile/$', 'user_profile'), 
    (r'^userprofile/$', 'user_profile'), # for backwards compatibility
    (r'^login/$', 'login'),
    (r'^links/$', 'links'),
    (r'^logout/$', 'logout'),
    (r'^manage-libraries/$', 'manage_libraries'),
    (r'^delete-libraries/$', 'delete_libraries'),
    (r'^delete-link/$', 'delete_link'),
    (r'^search/$', 'search', {'models': ('Link', 'LinkLibrary')}),
    (r'^search/links/$', 'search', {'models': ('Link',)}),
    (r'^search/libraries/$', 'search', {'models': ('LinkLibrary',)}),
    (r'^search/mongo/$', 'search_mongo'),
    (r'^library-demo/$', 'library_demo'),
    (r'^notifications/(?P<notification_id>\d+)/$', 'poll_notifications'),
    (r'^notifications/$', 'poll_notifications', {'notification_id': '0'}),
    (r'^notifytest/$', 'notifytest'),
    (r'^trophyroom/$', 'trophy_room'),
    (r'^upload-csv/$', 'upload_csv'),
    (r'^libraries/(?P<username>\w*)/(?P<lib_name>\w*)/', 'get_library'),
    (r'^libraries/(?P<libraryId>\d+)', 'get_library_by_id'),
    (r'^rate/link/(?P<ratee_id>\d+)/$', 'rate', {'ratee': 'link'}),
    (r'^rate/library/(?P<ratee_id>\d+)/$', 'rate', {'ratee': 'library'}),
    # (r'^success/(?P<message>\w+)/$', 'success'),
    # (r'^testchart/$', 'test_chart'),
    (r'^settings/$', 'modify_settings'),
    (r'^success/$', 'success'),
    (r'^map/$', 'map_view'),
    (r'^kmlproxy/$', 'kmlproxy'),
    (r'^kml2json/$', 'kml2json'),
    (r'^links/(?P<linkId>\w*)/', 'get_link'),
    (r'^current-user/$', 'get_current_user'),
    (r'^keywords/$', 'get_keywords'),
    # (r'^testlink/$', 'test_link'),
)

