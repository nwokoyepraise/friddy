# Friddy
Backend Application for Friddy Project Assessment

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="https://avatars.githubusercontent.com/u/87851933?s=200&v=4" alt="Logo" width="100" height="100">
  </a>
 
 <h2>Backend Application for Friddy Project Assessment </h2>
 
  
  <p align="center">
    <br />
    <a href="https://github.com/nwokoyepraise/friddy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nwokoyepraise/friddy">View Demo</a>
    ·
    <a href="https://github.com/nwokoyepraise/friddy/issues">Report Bug</a>
    ·
    <a href="https://github.com/nwokoyepraise/friddy/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#uml-diagrams">UML Diagrams</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project is a demo backend assessment for Friddy project.  It consists of endoints for user registeration and login, real-time chat functionality with socket.io, chat room creation and management, session handling and logging as well as user interaction logging.

Friddy project is linked at <a href="https://friddy.com/">here</a>

<!-- END POINTS -->
## Services Available on the Demo Backend
- User Registeration
- User Login
- Chat Room - Creation
- Chat Room - Joining
- Chat - Remove Item
- Real time chat with sockets
- User Session Logging
- User Interaction Logging


### Built With

The project was built natively with the following technologies
* [Node.js](https://nodejs.org)
* [ExpressJs](https://expressjs.com)
* [Passport.Js](https://paassportjs.org)
* [MongoDB](https://mongodb.com)
* [Socket.IO](https://socket.io)



<!-- GETTING STARTED -->
## Getting Started

To build the project locally, simply clone the github repository. Navigate to root project folder and run the following to install packages:

`npm install`

After packages have been installed. Proceed to run:

`node src/app.js`

## API Endpoints

### User Registeration Endpoint

This endpoint is used to for user registeration

```http

POST /api/user_reg
Host: localhost:3000
Content-Type: application/json

{"email": "string", "username": "string", "password": "string"}

Response:
{
  "status": true,
    "data":
        {
            "user_id": "string",
            "username": "string",
            "email": "string",
            "jwt": "string"
        }
}
```
### User Login Endpoint

Endpoint used of user login

```http

POST /api/user_login
Host: localhost:3000
Content-Type: application/json

{"email": "string", "password": "string"}

Response:
{
  "status": true,
    "data":
        {
            "user_id": "string",
            "username": "string",
            "email": "string",
            "jwt": "string"
        }
}
```

### Chat Room - Creation

This endpoint is used to create rooms which are typically mongodb documents. This returns an id which represents the room ID. This room ID will be used in storing real-time chat linked in respect to the particular room.

Users are automatically added to groups they created.

```http

POST /api/room_chats/create_room
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer Token(JWT)

{"room_name": "string"}

Response:
{
  "status": true,
    "data":
        {
            "room_name": "string",
            "members": "[]",
            "members_count": "string",
            "message_count": "number",
            "timestamp": "string",
            "_id": "string",
            "__v": "number"
        }
}
```

### Chat Room - Joining

For a user to send a message to a chat room, the user has to be a member of the chat room. This endpoint is used to add users to a chat room.

```http

POST /api/room_chats/join_room
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer Token(JWT)

{"room_name": "string"}

Response:
{
  "status": true,
    "data":
        {
            "nessage": "string"
        }
}
```
### Reatime Chat with Sockets

#### Connection
Realtime chat should be done by the client to `https://localhost:3000/chat_room` with authorization header containing the user Bearer Token (jwt) in request header. Once connection is done, the user can proceed to emit a message to join room of choice (to get messages in real-time). This message should be sent in the following format:

```js
socket.emit('join_room', 'room_id');
```

Room id is the ID of the room where the user wants to send the message to. The room_id is also to store the chatin DB.


#### Sending Messages
To send a message to chat, client should emit messages in the following format:

```js
socket.emit('message', {'room_id': 'room_id', 'message_string': 'message' },  function (ack) {
//ack = acknowledgement from server
        });
```

There is an event emmision from server if a message was sent unsuccefully with the reason also sent along. Clients can listen the following format to get notified if the chat they sent could not be completed successfully:

```js
socket.on('message_error', function(reason){

});
```

#### Listening for Messages
To receive real-time messages in chat room, clients should listen to events in the following format:

```js
socket.on('new_message', function(data){
 //data = {'room_id': 'room_id', 'message_string': 'message', 'sender_id': 'string'}
        });
```

#### Additional Events

1. To make the chat system more interactive, clients can signify when they have started typing by emiting even in the following manner:

```js
socket.emit('typing', 'room_id');
```

Similarly, clients can listen to know when another has started typing as follows:

```js
socket.on('user_typing', function(data){
 //data = {'status': 'true', 'user_id': 'string'}
        });
```

2. When a user stops typing, they can emit as below:
```js
socket.emit('typing_stopped', 'room_id');
```

Other clients can listen to know when another client has stopped typing as below:

```js
socket.on('user_typing', function(data){
 //data = {'status': 'false', 'user_id': 'string'}
        });
```

### Session Logging
 Client connections to sockets are logged with start time and end time being the main fields of interest.
 
 
### Interaction Logging
USer activity is also logged when user performs activity such as joining/becoming member of chat rooms and Interactions such as sending messages to chat rooms along with timestamps of the events.



<!-- UML DIAGRAM -->
## UML Diagrams

### Class Diagram:

![class_diagram drawio](https://user-images.githubusercontent.com/65955286/132888538-76908b14-22a7-4518-a3cf-95c32daccd7c.png)

### DB Diagram:

![db_diagram drawio](https://user-images.githubusercontent.com/65955286/132888598-9fbf18ac-9f6c-469e-a6d1-cf39bce6c4c4.png)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/nwokoyepraise/friddy/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GNU-V3 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/nwokoyepraise/friddy](https://github.com/nwokoyepraise/friddy)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [othneildrew](https://github.com/othneildrew)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/nwokoyepraise/foodslify/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/praise-chibuike-7bb76718a
