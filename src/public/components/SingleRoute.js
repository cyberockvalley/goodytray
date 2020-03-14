import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Sell from './SellEdit'

const SingleRoute = (props) => (
  <div className="App">
    <Route 
      path="/(sell|edit-ad)" 
      render={(propz) => <Sell {...propz} initialData={props.initialData} />}
    />
  </div>
)

export default SingleRoute