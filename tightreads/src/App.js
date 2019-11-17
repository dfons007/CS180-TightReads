import React, {Component} from 'react';
import Header from './Header';
import logo from './logo.svg';
import './App.css';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect
// } from "react-router-dom";

// //Pages
// import LoginPage from "./pages";
// import NotFoundPage from "./pages/404";
// import MakeAccountsPage from "./pages/makeaccounts";
// import BookProfile from "./pages/book_UI";
// import HomePage from "./pages/homepage";
// import Books from "./Books"
// // import Search from "./pages/search";
// // import Gallery from "./pages/gallery";



// function App() {
//   return (
//     <Router>
//       <Switch>
//       <Route exact path="/" component={LoginPage}/>
//       <Route exact path="/makeaccounts" component={MakeAccountsPage}/>
//       <Route exact path="/bookprofile" component={BookProfile}/>
//       <Route exact path="/homepage" component={HomePage}/>
//       {/* <Route exact path="/search" component={Search}/> */}
//       <Route exact path="/Header" component={Header}/>
//       {/* <div className="Header">
//         <Books />
//       </div> */}

//       <Route exact path="/404" component={NotFoundPage}/>  {/*} Redirect to 404 Page at end of component if no other component found */}
//       <Redirect to="/404"/>
//       </Switch>
//       {/* <div className="App">
//         <Header />
//       </div> */}
//     </Router>
    
//   );
// }

class App extends Component
{

  render()
  {
    return(
      <div className="App">
        <Header />
      </div>
    );

  }

}

export default App;
