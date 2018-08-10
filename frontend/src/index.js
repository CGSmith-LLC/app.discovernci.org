import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'font-awesome/css/font-awesome.min.css';
import './base/style.less';

// react-router v3 routes
import routes from './routes';

// GraphQL via Apollo Client
const httpLink = new HttpLink({
  credentials: 'same-origin'
  // react-snap doe not (yet) have proxy support,
  // so it errors when trying to hit localhost:<react-snap port>/graphql
  // there does appear to be a fix just waiting on tests to be written:
  // https://github.com/stereobooster/react-snap/pull/136
  //
  // uri: 'http://localhost:9000/'
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'X-CSRF-Token': Cookies.get('csrftoken')
    }
  });
  return forward(operation);
});

const httpLinkWithCsrfToken = middlewareAuthLink.concat(httpLink);

const client = new ApolloClient({
  // link: httpLink,
  link: httpLinkWithCsrfToken,
  cache: new InMemoryCache(),
  queryDeduplication: true,
  shouldBatch: true
});

// Log page view to Google Analytics
ReactGA.initialize('UA-91553844-1');
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// On every internal route change, scroll the user back to the
// top of the page and log their page view to Google Analyics.
function handleUpdate() {
  if (this.state.location.action === 'PUSH') { window.scrollTo(0, 0); }
  logPageView();
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router
      history={browserHistory}
      routes={routes}
      onUpdate={handleUpdate}
    />
  </ApolloProvider>,
  document.getElementById('root')
);
