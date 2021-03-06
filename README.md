<img src="http://i.imgur.com/MVmYI0l.png">
# **Flight Path**  [![Build Status](https://travis-ci.org/Svjard/flightpath.svg?branch=master)](https://travis-ci.org/Svjard/flightpath)

## Overview

An open-source, free to play, MMO regional airline simulation, based on real-life data updated in real-time as well as realistic simulation models.

More details and website coming soon...

## Screenshots

<img src="http://i.imgur.com/BuF39i9.png">

## Technology

Flight Path uses the following technologies.

* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)
* [D3](https://d3js.org/)
* [Bootstrap](http://getbootstrap.com/)

## Getting Started

Preliminaries :
* Python 3.4
* virtualenv (optional)
* Node.js & npm

You have to git clone this repository.
```
git clone https://github.com/Svjard/flightpath
```

### Installation for Frontend WebApp

In the ['frontend'](https://github.com/Svjard/flightpath/tree/master/frontend) directory **'./frontend/'**

There are a few dependencies that this project relies on: Node.js (v.4.x)

- `npm install`

### Installation for REST API Server

In the ['server' Root](https://github.com/Svjard/flightpath) directory **'./'**

- `virtualenv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- `python manage.py makemigrations && python manage.py migrate`
- `python manage.py createsuperuser`

### Usage for frontend WebApp

In the ['frontend'](https://github.com/Svjard/flightpath/tree/master/frontend) directory **'./frontend/'**

- `npm start -s`

### Usage for REST API Server 

In the ['server' Root](https://github.com/Svjard/flightpath) directory **'./'**

- `python manage.py runserver`

## Contributing

Contributions, questions and comments are all welcome and encouraged.

## License

[MIT License](http://opensource.org/licenses/MIT).

Copyright 2016 [Marc Fisher](https://github.com/Svjard).
