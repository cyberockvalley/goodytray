import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import MultipleRoutes from './components/MultipleRoutes'
import MultipleRoutesLogin from './components/MultipleRoutesLogin'
import SingleRoute from './components/SingleRoute'

if(process.env.NODE_ENV == "production") {
  console.log = () => {}
}

console.log("window.__initialData__", window.__initialData__)
const initialData = window.__initialData__
delete window.__initialData__

console.log("isSingle", initialData.isSingle)
const AppLogout = () => (
  <Router>
    <MultipleRoutes initialData={initialData} />
  </Router>
)

const AppLogin = () => (
  <Router>
    <MultipleRoutesLogin initialData={initialData} />
  </Router>
)

const AppSingle = () => (
  <Router>
    <SingleRoute initialData={initialData} />
  </Router>
)

var App = initialData.user == null? AppLogout : AppLogin;
/*
if(initialData.isSingle) {
  App = AppSingle

} else {
  App = initialData.user == null? AppLogout : AppLogin
}*/

ReactDOM.hydrate(<App suppressHydrationWarning={true} />, document.getElementById('root'))