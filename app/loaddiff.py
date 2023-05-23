import importlib
import sys


# Load diff fucntions
import app.diff.chat
import app.diff.cli
import app.diff.llm_utils
import app.diff.prompt
import app.diff.promptgenertor
import app.diff.agent.agent

# Load original functions
import autogpt.chat
import autogpt.cli
import autogpt.llm_utils
import autogpt.prompt
import autogpt.promptgenertor
import autogpt.agent.agent

# Replace functions

sys.modules['autogpt.chat']=sys.modules['app.diff.chat']
sys.modules['autogpt.cli']=sys.modules['app.diff.cli']
sys.modules['autogpt.llm_utils']=sys.modules['app.diff.llm_utils']
sys.modules['autogpt.prompt']=sys.modules['app.diff.prompt']
sys.modules['autogpt.promptgenertor']=sys.modules['app.diff.promptgenertor']
sys.modules['autogpt.agent.agent']=sys.modules['app.diff.agent.agent']

#print(sys.modules['autogpt.cli'])