import './App.css';
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useInView } from 'react-hook-inview'

import siteIcon from './img/site-icon.png';
import wardrobeIcon from './img/wardrobe-icon.png';
import profileIcon from './img/profile-icon.png';
import arrowLeft from './img/arrow-left.png';
import arrowRight from './img/arrow-right.png';
import addIcon from './img/add-icon.png';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <nav id='nav-container'>
            <div id='nav-item-1'>
              <Link to="/"><img src={siteIcon} className='nav-item' id='nav-item-site-icon' alt="Site Icon" /></Link>
            </div>

            <div id='nav-item-2'>
              <p className='nav-item' id='nav-item-site-name'>Virtual Closet</p>
            </div>

            <div id='nav-item-3'>
              <Link to="/wardrobe">
                <img src={wardrobeIcon} className='nav-item' id='nav-item-wardrobe-icon' alt="Wardrobe Icon"></img>
              </Link>
            </div>

            <div id='nav-item-4'>
              <Link to="/profile"><img src={profileIcon} className='nav-item' id='nav-item-profile-icon' alt="Profile Icon"></img></Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/wardrobe" Component={Wardrobe} />
            <Route path="/profile" Component={Profile} />
            <Route path="/addItemForm" Component={AddItemForm} />
            <Route path="/addOutfitForm" Component={AddOutfitForm} />
          </Routes>

        </main>
      </Router>
    </div>
  );
}

function OutfitCarousel(props) {
  const sliderRef = useRef(null);
  const scrollAmount = 500;

  const [leftRef, isLeftVisible] = useInView({ threshold: 1 })
  const [rightRef, isRightVisible] = useInView({ threshold: 1 })

  return (
    <>
      <h3 className='small-headers'>{props.title}</h3>

      <div id='outfitCarousel' ref={sliderRef}>

        <img src={arrowLeft} class={isLeftVisible ? 'visible' : 'notvisible'} id='left-arrow'
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft -= scrollAmount;
          }}
          alt="Left Arrow" />

        <>
          <div><div ref={leftRef} className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div className='img-bg'></div></div>
          <div><div ref={rightRef} className='img-bg'></div></div>
        </>

        <img src={arrowRight} class={isRightVisible ? 'visible' : 'notvisible'} id='right-arrow'
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft += scrollAmount;
          }}
          alt="Right Arrow" />

        <Link to={props.link} className='add-icon'><img src={addIcon} id='add-icon' alt='Add Item' /></Link>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <OutfitCarousel title="Recent Items" link="addItemForm" />
      <OutfitCarousel title="Recent Outfits" link="addOutfitForm" />
    </>
  );
}

function Wardrobe() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Wardrobe</h2>
      <button onClick={() => navigate(-1)} className='backBtn'>Back</button>
    </>
  );
}

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Profile</h2>
      <button onClick={() => navigate(-1)} className='backBtn'>Back</button>
    </>
  );
}

function AddItemForm() {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const [tagContent, setTagContent] = useState('');
  const [update, setUpdate] = useState(tagContent);

  const handleChange = (event) => {
    setTagContent(event.target.value);
  };

  const handleClick = () => {
    setUpdate(tagContent);
  };

  return (
    <>
      <h2 className='pageHeader'>Add Item</h2>
      <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>

      <div class='formContainer'>

        <p id='filePreviewContainer'><img alt='file preview' id='imagePreview' src={image} /></p>
        <button onClick={handleImageUploadClick} className='selectFileBtn'>Select Image</button>
        <input ref={fileInputRef} type='file' onChange={onImageChange} hidden />


        <input type='text' className='tagSelector' onChange={handleChange} value={tagContent} placeholder='Enter tags' />

        <button onClick={handleClick} className='selectFileBtn'>Add Tag</button>
        <p>{update}</p>
      </div>
    </>
  );
}

function AddOutfitForm() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Add Outfit</h2>
      <button onClick={() => navigate(-1)} className='backBtn'>Back</button>
    </>
  );
}


export default App;
