import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase-config';
import "./SignIn.css";
import "../Hero/Hero.css";
import Footer from '../Footer/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';



function SignUp() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
const [user , loading] = useAuthState(auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all the value!");
    } else {
      if (password === confirmPassword) {
        const res = createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
          const user = res.user;
          console.log(user);
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            username,
            authProvider: "local",
            email,
          });
          navigate('/admin');
        });

      } else {
        setError("Your password and confirm password is doesn't match!");
      }
    }
  }
  useEffect(() => {
    if(loading){
      return;
    }
    if(!user) 
      navigate("/admin");
    
  },[user, loading]);
    
  


  return (
    <>

      <div>
        <Navbar />
        <section className=" bg-image">

          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center h-80">
                <div className=" col-md-9 col-lg-7 col-xl-6">
                  <div className="card bg-dark text-light ">
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Create a user</h2>

                      <form>
                        <div className='col-5' id="responsives1">
                          <input type="text" className="userinput" name="user_name" required placeholder='Enter Your Name:' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className='col-5' id="responsives1">
                          <input type="email" className="userinput" name="user_email" required placeholder='Enter Your Email:' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='col-5' id="responsives1">
                          <input type="password" className="userinput" name="user_password" required placeholder='Enter Your Password:' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='col-5' id="responsives1">
                          <input type="password" className="userinput" name="confirm_password" required placeholder='Confirm Your Password:' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <p className='text-danger fs-5'>{error}</p>
                        <div className="d-flex justify-content-center">
                          <button type="button"
                            className="btn btn-danger btn-block btn-lg  text-body mt-5" onClick={handleSubmit}>Create Account</button>
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

export default SignUp;

