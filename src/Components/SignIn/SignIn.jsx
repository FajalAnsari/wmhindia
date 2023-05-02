import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useFirebase } from '../firebase-config';
import Navbar from "../Navbar/Navbar";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./SignIn.css";
import "../Hero/Hero.css";
import Footer from '../Footer/Footer';


function SignIn() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/dashboard");
    }
    
  }, [firebase, navigate]);


const handleSubmit =(e) => {
  e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(value => {navigate("/dashboard");}).catch((err) => alert(err));

};



  return (
    <>
    <div>
      <Navbar />
    <section className=" bg-image">
        
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-80">
        <div className=" col-md-9 col-lg-7 col-xl-6 sign1">
          <div className="card bg-dark text-light ">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Login</h2>

              <form>
                
                <div className='col-5' id="responsives1">
                  <input type="email"  className="userinput sign1" name="user_email"  required  placeholder='Enter Your Email:' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
         
                <div className='col-5' id="responsives1">
                  <input type="password"  className="userinput sign1" name="user_password"  required  placeholder='Enter Your Password:' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-danger btn-block btn-lg  text-body mt-5" onClick={handleSubmit}>Login</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer />
    </div>
    </>

  );
}

export default SignIn;
