import './App.css';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import { Fragment } from 'react';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Fragment>
      <div className='App'>
        <Header></Header>
        <main>
          <HomeScreen></HomeScreen>
        </main>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export default App;
