import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import PostId from './pages/postID';
import './css/App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          {/*Design.map(d => (<Route exact path={`/tasarim/${d.id}`} render={() => {return <DesignId design={d}/>}}></Route>))*/}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;