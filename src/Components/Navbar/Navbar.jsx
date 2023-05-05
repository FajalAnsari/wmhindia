import React, {useEffect, useState} from 'react';
import logo from "../../images/Logo-header.png";
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { signOut} from 'firebase/auth';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


function Navbar() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const fetchUserName = async () => {
  
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username);
    
  };
  useEffect(() => {
    if (loading) return;
    fetchUserName();
  }, [user, loading]);

if (user === null){
  return (
    <>
    {/* <h1>Hello</h1> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark nav">
       
        <div className="container-fluid">
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
          <Link to={"/"} className="navbar-brand">
            <img src={logo} alt="logo" className='logos' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          </div>
         
        </div>
        <div className='col-lg-8 col-md-8 col-sm-6 col-xs-12'>
          <div className="collapse navbar-collapse bg-light  navbar_home" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul className='navbar-nav'>
                <li className='"nav-item'>
                  <Link to={"/"} className='nav-link m-2 Home fw'>Home</Link>
                </li>
                <li className='"nav-item f-1'>
                  <a href="https://wmhindia.com/category/magazine/" className='nav-link m-2 text-dark fw'>Magazine</a>
                </li>
                <li className='"nav-item f-1' id="dropdownMenuButton">
                  <a href="https://wmhindia.com/category/blog/" className='nav-link m-2 text-dark fw'>Blog</a>
                </li>
                <li className='"nav-item f-1'>
                  <a href="https://wmhindia.com/category/interviews/" className='nav-link m-2 text-dark fw'>Interviews</a>
                </li>
                <li className='"nav-item f-1' id="dropdownMenuButton">
                  <a href="https://wmhindia.com/category/video/" className='nav-link m-2 text-dark fw'>Talk Show</a>
                </li>
              </ul>
            </div>
            <p className='mt-3 back'><Link to={"https://wmhindia.com/"} className="btn btnxd mt-2 d-inline m-2"><i class="bi bi-arrow-left-circle"></i><span> Back</span> </Link></p>
           
          </div>
          </div>
      </nav>
    </>
  );
}

return (
  <div className='App'>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar">
        <div className="container-fluid">
          <div className='col-lg-4 col-md-4  col-sm-6 col-xs-12'>
          <Link to={"/"} className="navbar-brand" >
            <img src={logo} alt="logo" className='logos' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          </div>
         
        </div>
        <div className='col-lg-8 col-md-8 col-sm-6 col-xs-12'>
          <div className='row'>
            
          <div className="collapse navbar-collapse bg-light p-2 navbar" id="navbarNavAltMarkup">
            <div className='col-lg-8'>
            <div className="navbar-nav">
              <ul className='navbar-nav'>
                <li className='"nav-item'>
                  <Link to={"/"} className='nav-link m-2 Home fw'>Home</Link>
                </li>
                <li className='"nav-item f-1'>
                  <a href="https://wmhindia.com/category/magazine/" className='nav-link m-2 text-dark fw'>Magazine</a>
                </li>
                <li className='"nav-item f-1' id="dropdownMenuButton">
                  <a href="https://wmhindia.com/category/blog/" className='nav-link m-2 text-dark fw'>Blog</a>
                </li>
                <li className='"nav-item f-1'>
                  <a href="https://wmhindia.com/category/interviews/" className='nav-link m-2 text-dark fw'>Interviews</a>
                </li>
                <li className='"nav-item f-1' id="dropdownMenuButton">
                  <a href="https://wmhindia.com/category/video/" className='nav-link m-2 text-dark fw'>Talk Show</a>
                </li>
                <li className='"nav-item'>
                  <Link to={"/signup"} className='nav-link m-2 text-dark fw'>Create User</Link>
                </li>
                <li className='"nav-item'>
                  <Link to={"/dashboard"} className='nav-link m-2 text-dark fw'>Dashboard</Link>
                </li>
              </ul>
            </div>
            </div>
         <div className='col-lg-4 mt-4'>
          <div className='row'>
         <div className='col-lg-8'> <p className="text-end me-4 mt-2.4 text-dark fw">Hello, {name}</p></div>
          
           
            <div className='col-lg-4'><Link to={"/"} className="btn btnxd mt-2 d-inline m-2 fw" onClick={() => signOut(auth)}>Logout</Link></div>
            </div>
            </div>
          </div>
          
          
              </div>
              </div>
      </nav>
  </div>
)
}

export default Navbar;
