import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Landing } from './pages';

const Routes: React.FC = () => {
   return (
     <BrowserRouter>
      <Switch>
         <Route path="/" component={Landing} exact/>
      </Switch>
     </BrowserRouter>
   );
}

export default Routes