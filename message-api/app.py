#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from flask_cors import CORS
from views import *

app = Flask(__name__)
CORS(app)

app.add_url_rule('/api/message', view_func=Message.as_view('message'), methods=['GET','POST'])

if __name__ == '__main__':
    app.run()
