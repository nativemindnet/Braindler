from unittest.mock import patch
import app.server.jrpc.jrpc_server # import serve


import app.autogpt2.cli as app_autogpt_cli
#from app.plugins.autogpt import autogpt
#import app.autogpt as autogpt


#with patch('autogpt.cli', autospec=True) as app_autogpt_cli: #, \
with patch('app.server.jrpc.jrpc_server.autogpt.cli.main', autospec=True) as app_autogpt_cli.main: #, \
     #patch('autogpt.prompt') as app_autogpt.prompt, \
     #patch('autogpt.promptgenerator') as app_autogpt.promptgenerator:


    app.server.jrpc.jrpc_server.serve()