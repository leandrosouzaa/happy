import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Landing, OrphanagesMap } from './pages';

const Routes: React.FC = () => {
   return (
     <BrowserRouter>
      <Switch>
         <Route path="/" component={Landing} exact/>
         <Route path="/app" component={OrphanagesMap} exact/>
      </Switch>
     </BrowserRouter>
   );
}

export default Routes