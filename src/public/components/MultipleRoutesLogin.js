import React from 'react'
import { Route } from 'react-router-dom'
import Landing from './Landing'
import Profile from './Profile'

import ProductPage from "./ProductPage"
import ProductReviews from "./ProductReviews"
import CreateReview from "./CreateReview"
import SellerPage from "./SellerPage"
import CreateTips from "./CreateTips"
import SearchPage from "./SearchPage"

import Settings from "./Settings"
import Messages from "./Messages"
import About from './About'
import Contact from './Contact'
import Privacy from './Privacy'
import Tos from './Tos'
import Register from './Register'
import Login from './Login'

import Sell from './SellEdit'
import EmailPasswordReset from './EmailPasswordReset'
import EmailAccountVerification from './EmailAccountVerification'
import { SEARCH_PATHS } from '../utils/RoutePaths'

const MultipleRoutesLogin = (props) => (
  <div className="App">
    <Route path="/(|index.html|index.php|index.js)" 
      render={(propz) => <Landing {...propz} user={props.initialData.user} />}
    />
    <Route path={SEARCH_PATHS} 
      render={(propz) => <SearchPage {...propz} user={props.initialData.user} />}
    />
    <Route 
      exact path="/(profile|login)" 
      render={(propz) => <Profile {...propz} user={props.initialData.user} />}
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
    <Route exact path="/create-review/:id" 
      render={(propz) => <CreateReview {...propz} user={props.initialData.user} />}
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
    <Route exact path="/settings" 
      render={(propz) => <Settings {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/messages" 
      render={(propz) => <Messages {...propz} user={props.initialData.user} />}
    />
    <Route exact path="/messages/:id" 
      render={(propz) => <Messages {...propz} user={props.initialData.user} />}
    />
    <Route 
      path="/(sell|edit-ad)" 
      render={(propz) => <Sell {...propz} initialData={props.initialData} />}
    />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/tos" component={Tos} />
  </div>
)

export default MultipleRoutesLogin
