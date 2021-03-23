import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Fragment } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Fragment>
        <div className='App'>
          <Header></Header>
          <main>
            <Route exact path='/login' component={LoginScreen}></Route>
            <Route exact path='/product/:id' component={ProductScreen}></Route>
            <Route exact path='/cart/:id?' component={CartScreen}></Route>
            <Route exact path='/' component={HomeScreen}></Route>
          </main>
          <Footer></Footer>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
