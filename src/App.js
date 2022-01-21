import { useState } from 'react';
import './App.css';
import Navbar from './components/NavBar';
import Checkout from './components/Checkout';
import AllProducts from './components/AllProducts';
import Products from './data_files/products';
import UpButton from './components/UpButton';
import CategoricalProducts from './components/Categories'
import SearchResults from './components/SearchResults'
import { Settings } from './components/settings';
import AddProduct from './components/add_product'
import DelProduct from './components/Delete'
import SingleProduct from'./components/Singleproduct'
import TrackAdminOrder from './components/TrackAdminOrder';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './components/Landing';

function App() {
  const [user, setUser] = useState(null);
  // {
  //   id:"unknown",
  //   name:"unknown",
  //   status:"user",
  // });
//   {
//     id: 2,
//     name: "Maria",
//     password: "maria123",
//     email: "maria123@gmail.com",
//     shippingaddress: "crown plaza",
//     billingaddress: "crown plazacrown plazacrown plazacrown plazacrown plaza",
//     phoneno: "6983764",
//     status: "user"
// });
// {

//   1: {
//     id: 1,
//     name: "Ethnic",
//     url: "1.jpg",
//     price: 1000,
//     stock: 10,
//     category: "Western",
//     fabric: "Linen",
//     color: "red",
//     date: "1-10-21",
//     description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u",
//     quantity:2,
//   },
//   2: {
//     id: 2,
//     name: "Clothes",
//     url: "2.jpg",
//     price: 2000,
//     stock: 4,
//     category: "Eastern",
//     fabric: "Cotton",
//     color: "Blue",
//     date: "3-10-21",
//     description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u",
//     quantity:1,
//   }

// }
const [products, setProducts] = useState(Products); 
const [orders, setOrders] = useState(
{
  1: {
      id: 1,
      userid: 1,
      name: "Maha",
      email: "maha@gmail.com",
      date: "10-12-21",
      ids:
      [

           {
              quantity:2,
              id: 1,
              name: "Ethnic",
              url: "1.jpg",
              price: 1000,
              stock: 10,
              category: "Western",
              fabric: "Linen",
              color: "red",
              date: "1-10-21",
              description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u"
          }
        ],
      total: 2000,
      status: "delivered",
      shippingaddress: "iqbal plaza",
      billingaddress: "iqbal plaza",
      phoneno: "6983764",

  },
  2:{
      id: 2,
      userid: 2,
      name: "Maria",
      email: "maria@gmail.com",
      date: "11-12-21",
      ids:
      [

          {
            quantity:2,
              id: 1,
              name: "Ethnic",
              url: "1.jpg",
              price: 1000,
              stock: 10,
              category: "Western",
              fabric: "Linen",
              color: "red",
              date: "1-10-21",
              description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u"
          },
         {
            quantity:4,
              id: 2,
              name: "Clothes",
              url: "2.jpg",
              price: 2000,
              stock: 4,
              category: "Eastern",
              fabric: "Cotton",
              color: "Blue",
              date: "3-10-21",
              description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u"
          }

        ],
      total: 1000,
      status: "delivered",
      shippingaddress: "crown plaza",
      billingaddress: "crown plaza",
      phoneno: "6983764",

  },
});
  const [carts, setCarts] = useState(
{
    "unknown": {
      userid: "unknown",
      product_ids:{},
      total: 0,
      total_items: 0,
    },
    1: {
      userid: 1,
      product_ids:{},
      total: 0,
      total_items: 0,
    },
    2: {
      userid: 2,
      product_ids:
      {

        1: {
          id: 1,
          name: "Ethnic",
          url: "1.jpg",
          price: 1000,
          stock: 10,
          category: "Western",
          fabric: "Linen",
          color: "red",
          date: "1-10-21",
          description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u",
          quantity:2,
        },
        2: {
          id: 2,
          name: "Clothes",
          url: "2.jpg",
          price: 2000,
          stock: 4,
          category: "Eastern",
          fabric: "Cotton",
          color: "Blue",
          date: "3-10-21",
          description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u",
          quantity:1,
        }

      },
      total: 4000,
      total_items : 3

    },
    3: {
      userid: 3,
      product_ids:{},
      total: 0,
      total_items: 0,
    },
  });
const [users, setUsers] = useState({
  
1: {
    id: 1,
    name: "Maria",
    password: "maria123",
    email: "maria123@gmail.com",
    shippingaddress: "crown plaza",
    billingaddress: "crown plaza",
    phoneno: "6983764",
    status:"user"

},
2: {
    id: 2,
    name: "Maria",
    password: "lala123",
    email: "lala123@gmail.com",
    shippingaddress: "crown plaza",
    billingaddress: "crown plaza",
    phoneno: "6983764",
    status:"user"
},
3: {
    id: 3,
    name: "Farzeen Zehra",
    password: "farzeen",
    email: "farzeen.fz@gmail.com",
    shippingaddress: "crown plaza",
    billingaddress: "crown plaza",
    phoneno: "6983764",
    status:"admin"
}
});


  return (
    <Router>
      <Navbar carts={carts} setCarts = {setCarts} products = {products} currentUser = {user} setCurrentUser={setUser} users={users} setUsers={setUsers} />
      {/* <UpButton/> */}
      <Routes>
        <Route path="/checkout" element={<Checkout carts={carts} setCarts = {setCarts} products = {products} currentUser = {user} setOrders={setOrders}/>}></Route>
        <Route path="/products" element={<><AllProducts data={products}/><UpButton/></>}></Route>
        <Route exact path="/products/:category" element={<><CategoricalProducts data={products}/><UpButton/></>}></Route>
        <Route exact path="/products/search/:query" element={<><SearchResults data={products}/><UpButton/></>}></Route>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/product/add" element={<AddProduct products = {products} setProducts={setProducts}/>}></Route>
        <Route path="/product/del" element={<DelProduct products = {products} setProducts={setProducts}/>}></Route>
        <Route path="/settings" element={<Settings currentUser={user} setCurrentUser={setUser} setUsers={setUsers} />}></Route>
        <Route path="/user/orders" element={<TrackAdminOrder currentUser={user} order={orders}/>}></Route>
        <Route path="/admin/orders" element={<TrackAdminOrder currentUser={user} order={orders} setOrders={setOrders}/>}></Route>
        <Route path="/product/:id" element={<SingleProduct product={Products} setCarts={setCarts} currentUser={user}/>}></Route>
      </Routes>
    </Router>
    

  );
}

export default App;
