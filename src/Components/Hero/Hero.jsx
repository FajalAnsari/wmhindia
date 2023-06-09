import React, { useState, useRef } from "react";
import "../../App.css";
import "../Hero/Hero.css";
import emailjs from '@emailjs/browser';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase-config";
import { toast } from 'react-toastify';
import Submission_detail from "../Submission_detail";



function App() {
  const form = useRef();
  const [imageUploads, setImageUploads] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState(null);
  const [setProgressval, getProgressval] = useState(0);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

  //   image validation start
      if (!files[0].name.match(/\.(jpg|jpeg|png|gif|bmp|tiff|psd|ai|eps|svg|raw|jfif)$/)) {
        toast.warning('Only image formats are allowed !');
       return false;
      }
  // image validation end
  

//pixel validation for images
var fi = document.getElementById('file-input');
if (fi.files.length > 10){
  toast.warning("maximum 10 images allowed!");
  return false;
} else {
  if(imageUploads.length > 9) {
    toast.warning("maximum 10 images are allowed!");
    return false;
  }
  else {
 // FIRST CHECK IF ANY FILE IS SELECTED.
   
 for (var i = 0; i <= fi.files.length - 1; i++) {
  var fileName, fileExtension;

  // FILE NAME AND EXTENSION.
  fileName = fi.files.item(i).name;
  fileExtension = fileName.replace(/^.*\./, '');

  // CHECK IF ITS AN IMAGE FILE.
  // TO GET THE IMAGE WIDTH AND HEIGHT, WE'LL USE fileReader().
  if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'tiff' || fileExtension === 'psd' || fileExtension === 'ai' || fileExtension === 'eps' || fileExtension === 'svg' || fileExtension === 'raw' || fileExtension === 'jfif') {
     readImageFile(fi.files.item(i));             // GET IMAGE INFO USING fileReader().
  }
  
}

var MIN_WIDTH = 1920;
var MIN_HEIGHT = 1080;

// GET THE IMAGE WIDTH AND HEIGHT USING fileReader() API.
function readImageFile(file) {
  var reader = new FileReader(); // CREATE AN NEW INSTANCE.

  reader.onload = function (e) {
      var img = new Image();      
      img.src = e.target.result;

      img.onload = function () {

     if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
        toast.warning(file.name +" is invalid image please upload new image !");
        document.getElementById("mink").disabled = true;
        document.getElementById("file-input").disabled = true;
        document.getElementById("slects").style.opacity = "0.3";
        document.getElementById("fileInfo").style.display = "block";
        setErrors(`Image must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels`);
     } else {

      console.log("not done");
    }
      }
  };
  reader.readAsDataURL(file);
}


//end pixel validation 

  }
}

  


    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        previews.push(reader.result);
      };
    });

    var image = files.map((file) => ({
      file, preview: URL.createObjectURL(file), caption: '', credit: '', model: '',
    })
    )
    setImageUploads((prevImages) => [...prevImages, ...image]);
  };

  const handleDeleteClick = (index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads.splice(index, 1);
    setImageUploads(newImageUploads);
    document.getElementById("file-input").disabled = false;
    document.getElementById("slects").style.opacity = "2";
    document.getElementById("fileInfo").style.display = "none";
  };

  const handleCaptionChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].caption = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleCreditChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].credit = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleModelChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].model = event.target.value;
    setImageUploads(newImageUploads);
  };


  const handleUploadClick = () => {


    //     //email send start
        // emailjs.sendForm('service_us5ym9h', 'template_h1u66ie', form.current, 'oYkFvry-qBnIFFcph')
        //   .then((result) => {
        //     console.log(result.text);
        //     console.log("email has been sent");
        //   }, (error) => {
        //     console.log(error.text);
        //   });
    // //email send end


    if (!name || !email) {
      alert("Please fill name and email before uploading.");
      return;
    }

    // this condition for radio option
    var option = document.getElementsByName("inlineRadioOptions");
    if(document.getElementById('summer').checked) { 
      // alert("checked summer"); 
  } 
  else if(document.getElementById('winter').checked) { 
    //  alert("checked winter");  
  } 
  else if(!option.checked){ 
      alert("You have not selected any option"); 
      return false;
  } 
    

    setImageUploads([]);
    setUploadSuccess(false);

    Promise.all(
      imageUploads.map((image) => {
        const imageRef = ref(storage, `wmh-india/images/${image.file.name}`);


        // progress bar code start    
        const uploadTask = uploadBytesResumable(imageRef, image.file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            getProgressval(progress);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              document.getElementsByClassName("progress")[0].style.display = "none";
              document.getElementsByClassName("thank")[0].style.display = "block";
              document.getElementById("file-input").addEventListener("click", () => {
                document.getElementsByClassName("thank")[0].style.display = "none";
              })
              console.log("File available at", downloadURL);
            });
          }
        );
        // progress bar show
        var prog = document.getElementsByClassName('progress')
        prog[0].style.display = "block";
        // progress bar code end


        return uploadBytes(imageRef, image.file)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref)
              .then((url) => {
                return {
                  url,
                  caption: image.caption,
                  credit: image.credit,
                  model: image.model,
                };
              });
          });
      })
    )
      .then((urls) => {
        console.log(urls);
        setUploadSuccess(true);

        // Upload data to Firestore
        const imageUploadsCollectionRef = collection(db, "imageUploadsindia");
        urls.forEach((url) => {
          addDoc(imageUploadsCollectionRef, {
            url: url.url,
            caption: url.caption,
            credit: url.credit,
            model: url.model,
            name: name,
            email: email,
            Date: new Date().toDateString()
          })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });

        // Show success message
        // alert("Upload successful!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {/* <h1>Hello</h1> */}
      <div className='container bg-dark w-75 main-contianer mt-3 res1'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row' id="responsives1">
              <form className="uniq" ref={form}>
                <div className='col-5' id="responsives1">
                  <input type="text" value={name} className="userinput" name="user_name" required placeholder='Enter Your Name:' onChange={handleNameChange} />
                </div>
                <div className='col-5' id="responsives1">
                  <input type="email" value={email} className="userinput u1" name="user_email" required placeholder='Enter Your Email:' onChange={handleEmailChange} />
                </div>
              </form>
              <div className='col-2 kk' id="responsives2">
                <input type="file" name="file-input" id="file-input" className="file-input__input" multiple onChange={handleImageChange} />
                <label className="file-input__label" for="file-input" id="slects">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>Choose Image</span></label>
                {/* <p className="text-danger" id="extance">Only jpg/jpeg or png file allowed</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='container bg-light w-75 main-contianer res1'>
          <div className='row load p-5'>
            <div className='col-10 mx-auto'>
              
              <div className='row img-form-container ' id="formji">
                {imageUploads.length > 0 && (
                  <div>
                    <div className="previews">

                      {imageUploads.map((image, index) => (
                        <div key={index} className="preview" id="war">
                          <img className="img-thumbnail m-3" src={image.preview} alt={image.file.name} />
                          <div className="inputfields" id="wars">
                            <input className="userinput s1" type="text" placeholder="Caption" value={image.caption} onChange={(event) => handleCaptionChange(event, index)} />
                            <input className="userinput  s1" type="text" placeholder="Credit" value={image.credit} onChange={(event) => handleCreditChange(event, index)} />
                            <input className="userinput s1" type="text" placeholder="Model" value={image.model} onChange={(event) => handleModelChange(event, index)} />
                            <button className="btn btn-danger m-2 float-end delete-btn" onClick={() => handleDeleteClick(index)}><i className="bi bi-trash"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                     <div className="radio-btn p-3">
                      <span className="fs-6 fw-bold  text-success">Are you 18+ and do you own the copyright or have the authority to submit the image?</span>
                      <div className="form-check form-check-inline ms-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions"  id="summer" value="option1" required />
                        <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="winter" value="option2" required />
                        <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                      </div>
                    </div>
                    <button className="btn btn-success float-end w-100" type="submit" id="mink" onClick={handleUploadClick}>Upload</button>        
                  </div>

                )}
              </div>
              {/* {uploadSuccess && ( */}
              <div>
                <p className="text-success text-center thank">Thank you for your submission. Our team will email you back within 3-5 working days. In case of any queries, please feel free to reach us at <a href="mailto:submissions@wmhindia.com">submissions@wmhindia.com</a><br />
                </p>
              </div>
              {/* )} */}
              
            </div>
            <Submission_detail/>
          </div>
          {/* progress bar */}
          
          <div className="progress">
            <div
              className="progress-bar hidebar"
              role="progressbar"
              style={{ width: `${setProgressval}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {setProgressval}%
            </div>
          </div>
          {/* progress bar end */}
          <p id="fileInfo" className="text-danger fs-5 text-center"><b>{errors}</b></p>
        </div>
      </div>
    </>

  );
}

export default App;




