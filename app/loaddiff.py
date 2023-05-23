import importlib
import sys


# Load diff fucntions
import app.diff.test


# Load original functions
import autogpt.cli

# Replace functionsw

sys.modules['autogpt.cli']=sys.modules['app.diff.test']
#print(sys.modules['autogpt.cli'])