from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.conf.urls import url 
from . import consumers

websocket_urlpatterns = [
	url(r'^ws/chat$', consumers.ChatConsumers),
]

application = ProtocolTypeRouter({
	'websocket': AuthMiddlewareStack(
		URLRouter(
			websocket_urlpatterns
			)
		),
	})