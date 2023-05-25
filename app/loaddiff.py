import importlib
import sys


#import app.diff.test
#import autogpt.cli
#print(sys.modules['autogpt.cli'].main)
#sys.modules['autogpt.cli'].main=sys.modules['app.diff.test'].main

#importlib.reload(autogpt.cli)


#import app.diff.llm.llm_utils
#from autogpt.llm import create_chat_completion
#import autogpt.llm.llm_utils


#sys.modules['autogpt.llm'].create_chat_completion=sys.modules['app.diff.llm.llm_utils'].create_chat_completion
#sys.modules['autogpt.llm.llm_utils'].create_chat_completion=sys.modules['app.diff.llm.llm_utils'].create_chat_completion


import autogpt.logs
#import diff.logs

#sys.modules['autogpt.logs']=sys.modules['diff.logs']

def setFast(self):
    print(self.typing_console_handler)
    print(self.console_handler)
    self.typing_console_handler = self.console_handler
    print(self.typing_console_handler)
    print(self)
autogpt.logs.Logger.setFast=setFast
autogpt.logs.logger.setFast()

#logger = autogpt.logs.Logger(1)




#sys.modules['autogpt.logs'].TypingConsoleHandler=sys.modules['autogpt.logs'].ConsoleHandler
#from autogpt.logs import TypingConsoleHandler
#from autogpt.logs import ConsoleHandler
#import autogpt.logs
#autogpt.logs.TypingConsoleHandler=autogpt.logs.ConsoleHandler
#sys.modules['autogpt.logs'].TypingConsoleHandler=sys.modules['autogpt.logs'].ConsoleHandler
#print(autogpt.logs.logger)
#importlib.reload(autogpt.logs.Logger)
#autogpt.logs.logger1 = autogpt.logs.Logger()
#sys.modules['autogpt.logs'].logger=autogpt.logs.Logger()
#print(autogpt.logs.logger1)

#autogpt.logs.typing_console_handler = TypingConsoleHandler()

#importlib.reload(autogpt.logs)

#print(sys.modules['app.diff.llm.llm_utils'].create_chat_completion);
#importlib.reload(autogpt.llm.llm_utils)

'''
import app.diff.llm.llm_utils
import autogpt.llm.llm_utils

print(sys.modules['autogpt.llm.llm_utils'].create_chat_completion)
print(sys.modules['app.diff.llm.llm_utils'].create_chat_completion)

sys.modules['autogpt.llm.llm_utils'].create_chat_completion=sys.modules['app.diff.llm.llm_utils'].create_chat_completion

print(sys.modules['app.diff.llm.llm_utils'].create_chat_completion);
#importlib.reload(autogpt.llm.llm_utils)
'''

# Load diff fucntions
#import app.diff.chat
#import app.diff.cli
#import app.diff.llm_utils
#import app.diff.prompt
#import app.diff.promptgenertor
#import app.diff.agent.agent

# Load original functions
#import autogpt.chat
#import autogpt.cli
#import autogpt.llm_utils
#import autogpt.prompt
#import autogpt.promptgenertor
#import autogpt.agent.agent

# Replace functions

#sys.modules['autogpt.chat']=sys.modules['app.diff.chat']
#sys.modules['autogpt.cli']=sys.modules['app.diff.cli']
#sys.modules['autogpt.llm_utils']=sys.modules['app.diff.llm_utils']
#sys.modules['autogpt.prompt']=sys.modules['app.diff.prompt']
#sys.modules['autogpt.promptgenertor']=sys.modules['app.diff.promptgenertor']
#sys.modules['autogpt.agent.agent']=sys.modules['app.diff.agent.agent']

#print(sys.modules['autogpt.cli'])