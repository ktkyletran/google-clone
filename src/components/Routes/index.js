import React from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import Results from '../Results';

const routes = ['/search', '/news', '/videos', '/images'];

const Routes = () => {
  return (
    <div className='p-4'>
      <Switch>
        <Route exact path='/' element={<Navigate replace to='/search' />} />
        {routes.map((path, index) => {
          return (
            <Route path={path} element={<Results />} key={index} />
          )
        })}
      </Switch>
    </div>
  )
}

export default Routes
