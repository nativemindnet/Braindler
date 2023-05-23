#pip install aiohttp
from aiohttp import web

#pip install python-socketio
import socketio

## creates a new Async Socket IO Server
sio = socketio.AsyncServer()
## Creates a new Aiohttp Web Application
app = web.Application()
# Binds our Socket.IO server to our Web App
## instance
sio.attach(app)

## we can define aiohttp endpoints just as we normally
## would with no change
async def index(request):
    with open('G:\\Unreal Projects\\AA_SocketIOClient-Unreal-Python-Example\\PythonServer\\index.html') as f:
        print('PYTHON SERVER: index called')
        return web.Response(text=f.read(), content_type='text/html')

## If we wanted to create a new websocket endpoint,
## use this decorator, passing in the name of the
## event we wish to listen out for
@sio.on('chatMessage')
async def print_message(sid, message):
    ## When we receive a new event of type
    ## 'message' through a socket.io connection
    ## we print the socket ID and the message
    print('PYTHON SERVER: chatMessage Called')
    print("Socket ID: " , sid)
    print(message)
    ## await a successful emit of our reversed message
    ## back to the client
    #await sio.emit('chatMessage', message[::-1])
    sid_message = str(sid) + "_" + message
    await sio.emit('chatMessage', sid_message)

## We bind our aiohttp endpoint to our app
## router
app.router.add_get('/', index)

## We kick off our server
if __name__ == '__main__':

    print("PYTHON SERVER STARTING")
    web.run_app(app,port=3000)