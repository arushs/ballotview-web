import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../Routes'

module.exports = (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
};

// function insertBodyIntoHTML(body) {
//   return '<!doctype html>'+
//     '<html>' +
//       '<head>' +
//         '<meta charset="utf-8">' +
//         '<title>BallotView</title>' +
//         '<!-- build:css -->' +
//         '<link rel="stylesheet" href="/dist/styles/main.css">' +
//         '<!-- endbuild -->' +
//         '<meta name="viewport"           content="width=device-width initial-scale=1" />' +
//         '<meta property="og:title"       content="View Your 2016 Ballot" />' +
//         '<meta property="og:description" content="Election day can be confusing, but this website makes voting easy. Not only see your ballot online, but also access non-partisan content to help you make your decisions as an informed voter." />' +
//         '<meta property="og:image"       content="/dist/images/bv-og.png" />' +
//         '<link rel="icon" type="image/png" href="/dist/images/BallotViewLogo.png">' +
//       '</head>' +
//       body +
//     '</html>';
// }
//
// var http = require('http'),
//     browserify = require('browserify'),
//     literalify = require('literalify'),
//     React = require('react'),
//     ReactDOMServer = require('react-dom/server'),
//     DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
//     // This is our React component, shared by server and browser thanks to browserify
//     App = React.createFactory(BVLandingMain);
//
// function serverRenderIndex(req, res) {
//   res.setHeader('Content-Type', 'text/html; charset=utf-8')
//
//     // `props` represents the data to be passed in to the React component for
//     // rendering - just as you would pass data, or expose variables in
//     // templates such as Jade or Handlebars.  We just use some dummy data
//     // here (with some potentially dangerous values for testing), but you could
//     // imagine this would be objects typically fetched async from a DB,
//     // filesystem or API, depending on the logged-in user, etc.
//     var props = {
//       items: [
//         'Item 0',
//         'Item 1',
//         'Item </scRIpt>\u2028',
//         'Item <!--inject!-->\u2029',
//       ]
//     }
//
//     // Here we're using React to render the outer body, so we just use the
//     // simpler renderToStaticMarkup function, but you could use any templating
//     // language (or just a string) for the outer page template
//     var html = ReactDOMServer.renderToStaticMarkup(body(null,
//
//       // The actual server-side rendering of our component occurs here, and we
//       // pass our data in as `props`. This div is the same one that the client
//       // will "render" into on the browser from browser.js
//       div({id: 'app', dangerouslySetInnerHTML: {__html:
//         ReactDOMServer.renderToString(App(props))
//       }}),
//
//       // The props should match on the client and server, so we stringify them
//       // on the page to be available for access by the code run in browser.js
//       // You could use any var name here as long as it's unique
//       script({dangerouslySetInnerHTML: {__html:
//         'var APP_PROPS = ' + safeStringify(props) + ';'
//       }}),
//
//       script({src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2tXT5LfheFBUIMpaX-VXsdaKIK3UX6GY&libraries=places'}),
//
//       // Then the browser will fetch and run the browserified bundle consisting
//       // of browser.js and all its dependencies.
//       // We serve this from the endpoint a few lines down.
//       script({src: '/dist/js/app.js'})
//     ))
//
//     // Return the page to the browser
//     res.end(insertBodyIntoHTML(html))
// }
//
// // A utility function to safely escape JSON for embedding in a <script> tag
// function safeStringify(obj) {
//   return JSON.stringify(obj)
//     .replace(/<\/(script)/ig, '<\\/$1')
//     .replace(/<!--/g, '<\\!--')
//     .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
//     .replace(/\u2029/g, '\\u2029') // Ditto
// }
//
// module.exports = serverRenderIndex;
