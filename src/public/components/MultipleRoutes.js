import React from 'react'
import { Link, Route } from 'react-router-dom'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import ProductPage from "./ProductPage"
import ProductReviews from "./ProductReviews"
import SellerPage from "./SellerPage"
import CreateTips from "./CreateTips"
import SearchPage from "./SearchPage"
import About from './About'
import Contact from './Contact'
import Privacy from './Privacy'
import Tos from './Tos'
import EmailAccountVerification from './EmailAccountVerification'
import EmailPasswordReset from './EmailPasswordReset'
import { SEARCH_PATHS } from '../utils/RoutePaths'

const MultipleRoutes = (props) => (
  <div className="App">
    <Route exact path="/(|index.html|index.php|index.js|test)" 
      render={(propz) => <Landing {...propz} user={props.initialData.user} />}
    />
    <Route path={SEARCH_PATHS} 
      render={(propz) => <SearchPage {...propz} user={props.initialData.user} />}
    />
    <Route path="/register" 
      render={(propz) => <Register {...propz} user={props.initialData.user} third_party_login_links={props.initialData.third_party_login_links} />}
    />
    <Route path="/(login|sell|edit-add|profile|settings|messages|notifications|create-review)" 
      render={(propz) => <Login {...propz} user={props.initialData.user} third_party_login_links={props.initialData.third_party_login_links}/>}
    />
    <Route exact path="/products/:title/:id" 
      render={(propz) => <ProductPage {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/products/:title/:preview/:id" 
      render={(propz) => <ProductPage {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/reviews/:id" 
      render={(propz) => <ProductReviews {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/seller/:id" 
      render={(propz) => <SellerPage {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/create-ad-tips" 
      render={(propz) => <CreateTips {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/email-verify/:key" 
      render={(propz) => <EmailAccountVerification {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/password_reset/:key" 
      render={(propz) => <EmailPasswordReset {...propz} user={props.initialData.user} />}
    />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/tos" component={Tos} />
  </div>
)

export default MultipleRoutes
