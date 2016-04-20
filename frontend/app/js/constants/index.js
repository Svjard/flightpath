'use strict';

export default = {

  route: '/',

  apiPath: '/api/v1',

  page: {
    title: 'Home',
    description: 'Page Component - default',
    keywords: null,
    location: '/',
    returnpage: null,
    returnquery: null,
    transition: null
  },

  account: {
    id:'',
    email: '',
    username: '',
    firstName: '',
    lastName: ''
  },

  auth: {
    loggedIn: false,
    language: 'en-us'
  },

  globalMessages: {
    overlayMessages: null,
    info: null,
    success: null,
    errors: null
  },

  componentMessages: {
    progressed: null,
    completed: null,
    failed: null
  },

  sortingOption: {
    defaultSorting: 'upvotes',
    //currentSorting: 'upvotes',
    optionValues: {
      'upvotes': 'upvotes',
      'newest': 'newest',
      'comments': 'comments'
    }
  },

  GA_TRACKING_ID : 'UA-63089389-1'

};
