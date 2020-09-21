import React from 'react';
import './Home.css';
import './css/res640.css'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


import routes from './routes';
import Nav from './components/Home/Nav';
import Footer from './components/Footer';
import Cart from './components/CartIcon'

class App extends React.Component {

  render (){
    return (
      <Router>
      <header className="bg-header">
          {/* Banner */}
          {/* <Banner /> */}
          {/* Nav */} 
          <Nav />
          <Cart />
        </header>
        <main>
          {this.showRouter(routes)}
        </main>
        <footer className="">
         {/* <!-- Show gift --> */}
         <div class='show_gift mt-4'>
            <div class='endow'>
              <div class='transport'>
                <i className="fa fa-plane" style={{fontSize : "48px"}}></i>
                <p>Miễn phí vận chuyển trên toàn quốc</p>
              </div>
              <div class='gift'>
                <i className="fa fa-cog" style={{fontSize : "48px"}}></i>
                <p>Chế độ bảo hành lên đến 12 tháng</p>
              </div>
              <div class='sale'>
                <i className="fa fa-gift" style={{fontSize : "48px"}}></i>
                <p>Giảm 10% với đơn hàng trên 5.000.000<sup>đ</sup></p>
              </div>
            </div>
          </div>
        <Footer />
        </footer>
      </Router>
    );
  }
  showRouter = (routes) =>{
    let result = null;
    if(routes.length > 0){
      result = routes.map((route,index) => {
        return (
          <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      })
    }
    return result;
  }
}



export default App;
