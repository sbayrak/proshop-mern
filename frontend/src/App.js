import './App.css';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import { Fragment } from 'react';

const App = () => {
  return (
    <Fragment>
      <div className='App'>
        <Header></Header>
        <main>
          <Container maxWidth='lg'>
            <h1>app</h1>
          </Container>
        </main>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export default App;
