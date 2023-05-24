#import app.loaddiff

import importlib
import sys


#import app.diff.cli
#import autogpt.cli

#sys.modules['autogpt.cli']=sys.modules['app.diff.cli']



import app.server.jrpc.jrpc_server # import serve


app.server.jrpc.jrpc_server.serve()
