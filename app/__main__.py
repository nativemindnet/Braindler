from unittest.mock import patch
from server.jrpc.jrpc_server import serve


from ..app.autogpt import autogpt as app_autogpt
from ..plugins.autogpt import autogpt




with patch('autogpt.cli') as app_autogpt.cli, \
     patch('autogpt.prompt') as app_autogpt.prompt, \
     patch('autogpt.promptgenerator') as app_autogpt.promptgenerator:

    
    serve()