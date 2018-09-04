import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.jsx').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index/index.jsx').default
      },
      {
        "component": () => React.createElement(require('C:/Users/admin/Desktop/新建文件夹/umi-mobx-ts/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layouts\\\\index.jsx","routes":[{"path":"/","exact":true,"component":"./pages/index/index.jsx"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
