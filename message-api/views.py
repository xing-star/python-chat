from flask.views import MethodView
from flask import json, request


class Message(MethodView):
    global NameList
    global MessageList
    NameList = []
    MessageList = []

    def __init__(self):
        pass

    def get(self):
        if len(NameList) != 0 or len(MessageList) != 0:
             outStr = {'name': NameList, 'message': MessageList}
             return json.dumps(outStr)
        # testStr = {'name': ['Mark','Star'], 'message': ['Hello','World']}
        # return ''
        return json.dumps({'name': [], 'message': []})

    def post(self):
        data = json.loads(request.form.get('data'))
        print (data['name'])
        print (data['Text'])
        NameList.append(data['name'])
        MessageList.append(data['Text'])
        return 'success'
