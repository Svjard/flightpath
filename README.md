# **Flight Path**

[![Build Status](https://travis-ci.org/Svjard/flightpath.svg?branch=master)]

<img src="http://i.imgur.com/OGlO7p1.png" width="250px">

An open-source, free to play, MMO private airline simulation, based on real-life data updated in real-time as well as realistic simulation models.

## Overview

Coming Soon...

## Technology

Flight Path uses the following technologies.

* [Angular 2](https://angular.io/)
* [Redux](https://github.com/reactjs/redux)
* [D3](https://d3js.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Django](https://www.djangoproject.com/)
* [Django REST Framework](http://www.django-rest-framework.org/)

## Getting Started

Preliminaries :
* Python 3.4
* virtualenv (optional)
* npm

You have to git clone this repository.
```
git clone https://github.com/Svjard/flightpath
```

### Installation for Frontend WebApp

In the ['frontend'](https://github.com/Svjard/flightpath/tree/master/frontend) directory **'./frontend/'**

There are a few dependencies that this project relies on: Node.js (v.4.x) & Grunt

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

- `grunt serve` for previewing your site/app on a development server.
 (If you want live debugging, un-comment [django dev setting file](https://github.com/Svjard/flightpath/blob/master/config/settings/dev.py) 69 line
 and install [LiveReload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).)
- `grunt build` for build site/app for django 'static' command.

### Usage for REST API Server 

In the ['server' Root](https://github.com/Svjard/flightpath) directory **'./'**

- `python manage.py runserver`

## Contributing

Contributions, questions and comments are all welcome and encouraged.

## License

[MIT License](http://opensource.org/licenses/MIT).

Copyright 2016 [Marc Fisher](https://github.com/Svjard).