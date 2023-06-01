import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Dashboard.css";
import { useFirebase } from '../firebase-config';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { CSVLink } from 'react-csv';
import ReactPaginate from 'react-paginate';
import Footer from '../Footer/Footer';



function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const firebase = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    firebase.listAllUsers().then((users) => {
      const filteredUsers = users.docs.filter((user) => {
        return user.data().name.toLowerCase().includes(searchTerm.toLowerCase()) || user.data().email.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setUsers(filteredUsers);
    });
  });

  const [users, setUsers] = useState([]);
  // const halndleload = (e) => {
  //   e.preventDefault();
  //   firebase.listAllUsers().then((users) => setUsers(users.docs));
  // }

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 4;

  const handleDeleteClick = (id,e) => {
    let deletedata = doc(db, "imageUploadsindia", id);
    deleteDoc(deletedata).then(() => {
    })
  }
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Model', key: 'model' },
    { label: 'Credit', key: 'credit' },
    { label: 'Caption', key: 'caption' },
    { label: 'Url', key: 'url' },

  ]
  const filteredUsers = users.filter((user) => {
    if (selectedFilter === 'All') {
      return true;
    } else if (selectedFilter === 'last week') {
      // Filter by date (example)
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const imageDate = new Date(user.data().createdAt);
      return imageDate > lastWeek;
    }
  });

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

  const handleKeyPress = (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
  }
  }
  return (
    <>
      <Navbar />
      <div className='container bg-dark w-75 main-contianer s-1'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row text-center'>
              <h1 className='text-light'>Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container bg-light w-75 main-contianer'>
          <div className='row p-5'>
            <div className='col-10 mx-auto'>
              <div className='row w-50 mx-auto'>
                <div className='col-md-12 d-linline'>
                  <form>
                    <div className='form-group'>
                    <input type="search" className='form-control-dash p-2' placeholder="Search by name or email" onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}/>
                    </div>
                  </form>
                </div>
                <div className='col-md-12 sel'>
                <select class="form-select mt-4 dates" aria-label="Default select example">
                     <option selected>select date</option>
                        <option value="1">Custom</option>
                        <option value="2">Today</option>
                        <option value="3">Last Week</option>
                        <option value="1">Last month</option>
                        <option value="2">Last 7 days</option>
                        <option value="3">Last 30 days</option>
                   </select>
                   </div>
              </div>
              
            </div>
          </div>
          <div className="card-group">
            {currentUsers.map((user) => (
              <div key={user.id} className="container bg-light w-75 main-contianer loadata mt-4">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className='card-image-container mt-5.2'>
                      <img className="img-thumbnail  card-image" src={user.data().url} alt='image-url' />
                    </div>
                  </div>
                  <div className="col-md-6 userdata">
                    <div className="">
                      <p className="form-control-rend mb-1 deta">
                        <b>Name: </b>
                        {user.data().name}
                      </p>
                      <p className="form-control-rend mb-1 deta">
                        <b>Email: </b>
                        {user.data().email}
                      </p>
                      <p className="form-control-rend  mb-1 deta">
                        <span>
                          <b>Model: </b>{" "}
                        </span>
                        {user.data().caption}
                      </p>
                      <p className="form-control-rend mb-1 deta">
                        <span>
                          <b>Credit: </b>
                        </span>
                        {user.data().credit}
                      </p>
                      <p className="form-control-rend mb-1 deta">
                        <span>
                          <b>Caption: </b>
                        </span>
                        {user.data().model}
                      </p>
                      <p className="form-control-rend mb-1 deta">
                        <span>
                          <b>Date: </b>
                        </span>
                        {user.data().Date}
                      </p>
                      <Link path="#" className="btn btn-danger m-2 float-end" onClick={() => handleDeleteClick(user.id)}>
                        Delete
                      </Link>
                      <CSVLink data={filteredUsers.map(user => ({
                        
                        name: user.data().name,
                        email: user.data().email,
                        model: user.data().model,
                        credit: user.data().credit,
                        caption: user.data().caption,
                        url: user.data().url
                      }))} headers={headers} filename='user_data.csv'>
                        <button className="btn btn-success m-2 w-25 success1  float-end" id='download-btn'>Download</button>
                      </CSVLink>
                    </div>
                  </div>

                </div>
              </div>
           
            ))}
          </div>
          <div id="react-paginate" className='mt-4'>
          <ReactPaginate
            previousLabel={<i className="bi bi-arrow-left-circle-fill m-2 "></i>}
            nextLabel={<i className="bi bi-arrow-right-circle-fill m-2"></i>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => setCurrentPage(data.selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'paginate-prev'}
            nextClassName={'paginate-next'}
          />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;





