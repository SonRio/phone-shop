import React from 'react';

import CartPage from './components/Cart/CartPage';
import Home from './components/Home/Home';
import Register from './components/Register';
import Account from './components/Account';
import InforProduct from './components/InforProduct';
import Login from './components/Login';
import OrderPage from './components/Order/OrderPage';
import Search from './components/Search';
import ShowKindProducts from './components/ShowKindProducts';

const routes = [
    {
        path : '/',
        exact : true,
        main: () => <Home/>
    },
    {
        path : '/cartPage',
        exact : true,
        main: () => <CartPage/>
    },
    {
        path : '/register',
        exact : true,
        main: () => <Register/>
    }
    ,
    {
        path : '/login',
        exact : true,
        main: () => <Login/>
    }
    ,
    {
        path : '/account/:user/information',
        exact : true,
        main: ({match}) => <Account match={match}/>
    },
    {
        path :'/search/:value/infor',
        exact : true,
        main : ({match}) => <Search match = {match} />
    }
    ,
    {
        path : '/orderPage/:user/detail',
        exact : true,
        main: ({match}) => <OrderPage match={match}/>
    }
    ,
    {
        path : '/products/:id/infor',
        exact : true,
        main: ({match}) => <InforProduct match={match} />
    },
    {
        path : '/products/:kind/show_products',
        exac : true,
        main : ({match}) => <ShowKindProducts match={match} />
    }
];



export default routes;
