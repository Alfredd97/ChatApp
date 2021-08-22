from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from core.models.users import Users
from core.models.message import Messages

class ChatConsumer(WebsocketConsumer):

	def init_chat(self, data):
		username = data['username']
		user, created = Users.objects.get_or_create(username=username)
		content = {
			'command': 'init_chat'
		}
		
		if not user:
			content['error'] = 'Unable to get or create User with username: ' + username
			self.send_message(content)

		content['success'] = 'Chatt success with username: ' + username
		self.send_message(content)

	
	def fetch_messages(self, data):
		messages = Messages.last_30_messages()
		content = {
			'command': 'messages',
			'messages': self.messages_to_json(messages)
		}
		self.send_message(content)


	def new_message(self, data):
		author = data['from']
		text = data['text']
		author_user, created = Users.objects.get_or_create(username=author)
		message = Messages.objects.create(author=author_user, content=text)
		content = {
			'command': 'new_message',
			'message': self.message_to_json(message)
		}
		self.send_chat_message(content)


	def messages_to_json(self, messages):
		result = []
		for message in messages:
			result.append(self.message_to_json(message))
		return result


	def message_to_json(self, message):
		return{
			'id': str(message.id),
			'author': message.author.username,
			'content': message.content,
			'create_at': str(message.created_at)
		}

	commands = {
		'init_chat': init_chat,
		'fetch_messages': fetch_messages,
		'new_message': new_message
	}


	def connect(self):
		self.room_name = 'room'
		self.room_group_name = 'chat_%s' % self.room_name

		async_to_sync(self.channel_layer.group_add)(
			self.room_group_name,
			self.channel_name
		)


	def recive(self, text_data):
		data = json.loads(text_data)
		self.commands[data['command']](self, data)


	def send_message(self, message):
		self.send(text_data=json.dumps(message))


	def send_chat_message(self, message):
		async_to_sync(self.channel_layer.group_send)(
			self.room_group_name,
			{
				'type': 'chat_message',
				'message': message
			}
		)

	def chat_message(self, event):
		message = event['message']
		self.send(text_data=json.dumps(message))
