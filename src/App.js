import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import PostID from './pages/postID';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profil';
import ProfileEdit from './pages/ProfileEdit';
import NotFoundPage from './pages/404';
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/post/:id" component={PostID} />
            <Route exact path="/hakkinda" component={About} />
            <Route exact path="/iletisim" component={Contact} />
            <Route exact path="/iletisim" component={Contact} />
            <Route exact path="/giris" component={Login} />
            <Route exact path="/kaydol" component={Register} />
            <Route exact path="/profil" component={Profile} />
            <Route exact path="/profil/duzenle" component={ProfileEdit} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;