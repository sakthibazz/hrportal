import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom CSS

// Import other components
import Username from './Components/Username';
import Password from './Components/Password';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Recovery from './Components/Recovery';
import Reset from './Components/Reset';
import Pagenotfound from './Components/Pagenotfound';
import Homescreen from './Components/Homescreen';
import Recuterpost from './Components/Recuterpost';
import SearchForm from './Components/SearchForm';
import UpdateRecuterpost from './Components/UpdateRecuterpost';
import Arohabench from './Components/Arohabench';
import Adminpost from './Components/Adminpost';
import SearchAdminPost from './Components/SearchAdminPost';
import UpdateAdminPost from './Components/UpdateAdminPost';
import { ProtectRoute,AuthorizeUser } from './middleware/auth';
import CountsByTicketAndStatus from './Components/CountsByTicketAndStatus';
import Admindetailsacess from './Components/Admindetailsacess'
import Viewadminpost from './Components/Viewadminpost';

function App() {
  return (
    <Router>
            <main>
              <Routes>
                <Route path="/" element={<Username />} />
                <Route path="/register" element={<AuthorizeUser><Register /></AuthorizeUser>} />
                <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
                <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
                <Route path="/recovery" element={<ProtectRoute><Recovery /></ProtectRoute>} />
                <Route path="/reset" element={<ProtectRoute><Reset /></ProtectRoute>} />
                <Route path="/home" element={<AuthorizeUser><Homescreen /></AuthorizeUser>} />


                <Route path="/admindetailsacess" element={<AuthorizeUser><Admindetailsacess/></AuthorizeUser>} />

                
                <Route path="/recutepost/:userId" element={<AuthorizeUser><Recuterpost /></AuthorizeUser>} />
                
                <Route path="/searchform" element={<AuthorizeUser><SearchForm /></AuthorizeUser>} />
                <Route path="/updatepost/:userId" element={<AuthorizeUser><UpdateRecuterpost /></AuthorizeUser>} />
                <Route path="/arohabenchresource" element={<AuthorizeUser><Arohabench /></AuthorizeUser>} />
                <Route path="/adminpost" element={<AuthorizeUser><Adminpost /></AuthorizeUser>} />
                <Route path="/searchadminpost" element={<AuthorizeUser><SearchAdminPost /></AuthorizeUser>} />
                <Route path="/updateadminpost/:userId" element={<AuthorizeUser><UpdateAdminPost /></AuthorizeUser>}/>
                <Route path="/viewadminpost/:userId" element={<AuthorizeUser><Viewadminpost /></AuthorizeUser>}/>
                <Route path="/getCountByTicket" element={<AuthorizeUser><CountsByTicketAndStatus/></AuthorizeUser>}/>
                <Route path="*" element={<Pagenotfound />} /> 
              </Routes>
            </main>
    </Router>
  );
}

export default App;