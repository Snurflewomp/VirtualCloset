import './App.css';
import React, { useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useInView } from 'react-hook-inview';

import siteIcon from './img/site-icon.png';
import profileIcon from './img/profile-icon.png';
import arrowLeft from './img/arrow-left.png';
import arrowRight from './img/arrow-right.png';
import addIcon from './img/add-icon.png';
import closeIcon from './img/close-icon.png';


function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <nav id='nav-container'>
            <div id='nav-item-1'>
              <Link to="/">
                <img src={siteIcon} className='nav-item' id='nav-item-site-icon' alt="Site Icon" />
              </Link>
            </div>

            <div id='nav-item-2'>
              <p className='nav-item' id='nav-item-site-name'>Styl</p>
            </div>

            <div id='nav-item-3'>
              <Link to="/wardrobe"><p className='nav-item' id='nav-item-wardrobe'>My Closet</p>
              </Link>
            </div>

            <div id='nav-item-4'>
              <Link to="/profile">
                <img src={profileIcon} className='nav-item' id='nav-item-profile-icon' alt="Profile Icon"></img>
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/wardrobe" Component={Wardrobe} />
            <Route path="/profile" Component={Profile} />
            <Route path="/addItemForm" Component={AddItemForm} />
            <Route path="/addOutfitForm" Component={AddOutfitForm} />
            <Route path="/wardrobe/viewAllOutfits" Component={createViewAll("Outfits")} />
            <Route path="/wardrobe/viewAllShirts" Component={createViewAll("Shirts")} />
            <Route path="/wardrobe/viewAllPants" Component={createViewAll("Pants")} />
            <Route path="/wardrobe/viewAllOuterwear" Component={createViewAll("Outerwear")} />
            <Route path="/createOutfitForm" Component={CreateOutfitForm} />
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
      <p className='smallHeaders'>{props.title}</p>

      <div id='carouselFlexbox'>

        <div id='outfitCarousel' ref={sliderRef}>
          <img src={arrowLeft} className={isLeftVisible ? 'visible' : 'notvisible'} id='left-arrow'
            onClick={() => {
              const container = sliderRef.current;
              container.scrollLeft -= scrollAmount;
            }} alt="Left Arrow" />
          <>
            <div ref={leftRef} className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div className='img-bg'></div>
            <div ref={rightRef} className='img-bg'></div>
          </>
          <img src={arrowRight} className={isRightVisible ? 'visible' : 'notvisible'} id='right-arrow'
            onClick={() => {
              const container = sliderRef.current;
              container.scrollLeft += scrollAmount;
            }} alt="Right Arrow" />
        </div>

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
      <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>

      <div className='rightButtons'>
        <AddFormButton />
        <CreateOutfitButton />
      </div>

      <div className='pageHeaderSection'>
        <h2 className='pageHeader'>My Closet</h2>

        <div>
          <label>Filter by tag<input className='tagSearchInput' /></label>
          <p className='sortTagIcon'>Sort</p>
        </div>
      </div>

      <GenerateItemGroup title="Outfits" link="viewAllOutfits" />
      <GenerateItemGroup title="Shirts" link="viewAllShirts" />
      <GenerateItemGroup title="Pants" link="viewAllPants" />
      <GenerateItemGroup title="Outerwear" link="viewAllOuterwear" />
    </>
  );
}

function AddFormButton() {
  return (
    <div>
      <Link to={"/addItemForm"}>
        <button className='button addItemButtonFlex'>
          <img src={addIcon} className='addItemIcon' />
          <p className='addItemButtonText'>Add Item</p>
        </button>
      </Link>
    </div>
  );
}

function CreateOutfitButton() {
  const [isActive, setActive] = useState("active");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div>
      <button onClick={ToggleClass} className='innerButton'>Create Outfit</button>

      <div className={isActive ? "inactive" : "active"}>
        <div className='outfitOverlayContainer'>
          <div className='outfitOverlay'>
            <h1 className='pageHeader outfitBuilderHeader'>Outfit Builder</h1>
            <button onClick={ToggleClass} className='innerButton cancelButton'>Cancel</button>
          </div>

          <div className='itemSection'>
            <div className='itemDiv'>

            </div>
            <div className='itemDiv'>

            </div>
            <div className='itemDivInactive'>
              <img src={addIcon} className='addOutfitItemIcon' />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CreateOutfitForm() {
  return (
    <>
      <div>
        <h2>Create Outfit</h2>
      </div>
    </>
  );
}

function GenerateItemGroup(props) {
  return (
    <>
      <div>
        <div className='itemGroupHeaderSection'>
          <p className='itemGroupHeaderText'>{props.title}</p>
          <Link to={props.link} className='viewAllLink'>View All</Link>
        </div>

        <div className='imgContainer'>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
          <div className='itemImg'></div>
        </div>
      </div>
    </>
  );
}

function createViewAll(title) {

  return function ViewAll() {
    const navigate = useNavigate();

    return (
      <>
        <div>
          <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>
          <h2>{title}</h2>
        </div>
      </>
    );
  };
}

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>
      <h2 className='pageHeader'>Profile</h2>
    </>
  );
}

function ImageDisplay(props) {
  const [tagContent, setTagContent] = useState('');

  const handleChange = (event) => {
    setTagContent(event.target.value);
  };

  const tags = props.tags || [];
  const setTags = props.setTags;

  const loadTags = () => {
    setTags([...tags, tagContent]);
    console.log([...tags, tagContent]);
  };

  const handleClick = () => {
    loadTags();
    setTagContent('');
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      handleClick();
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  let tagElements = tags.map(function (tag) {
    return <li className='itemTag' key={tag}>{tag}<img src={closeIcon} className='close-icon' onClick={() => removeTag(tag)} /></li>
  });

  const oldBlob = useRef(null);

  const blob = useMemo(() => {
    if (oldBlob.current) URL.revokeObjectURL(oldBlob.current);

    oldBlob.current = props.image && URL.createObjectURL(props.image);

    return oldBlob.current;
  }, [props.image]);

  return (
    <>
      <div className='formContainer'>
        <div className='filePreviewContainer'>
          <img alt='file preview' className={props.isActive ? 'imageDefault' : 'imageScaled'} id='imagePreview' src={blob} onClick={props.onActive} />
        </div>

        <div className='innerFlex'>
          <div className='tagSection'>
            <input type='text' className='tagInput' onChange={handleChange} onKeyUp={handleKeyPress} value={tagContent} placeholder='Enter tags' />
            <button onClick={handleClick} className='innerButton addTagButton'>Add Tag</button>
          </div>

          <ul className='tagList'>{tagElements}</ul>
          <div className='delete-item-container'><button className='delete-item-btn innerButtonDelete'>Delete Item</button></div>
        </div>
      </div>
    </>
  );
}

function AddItemForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeImage, setActiveImage] = useState();
  const [images, setImages] = useState([]);
  const [imageTags, setImageTags] = useState({});

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>
      <h2 className='pageHeader'>Add Item</h2>

      <div>
        <div>
          <button onClick={handleImageUploadClick} className='innerButton selectImgButton'>Select Image</button>

          <input id='fileInput' ref={fileInputRef} onChange={e => {
            setImages([...images, ...Array.from(e.target.files)])
          }} type='file' multiple hidden />
        </div>

        {images.map(image => (
          <ImageDisplay
            key={image.name}
            image={image}
            isActive={image === activeImage}
            onActive={() => setActiveImage(image)}
            tags={imageTags[image.name]}
            setTags={(tags) => {
              const imageTags2 = { ...imageTags };
              imageTags2[image.name] = tags;
              setImageTags(imageTags2);
            }} />
        ))}

        <button className='formSubmitButton innerButton'>Add Item</button>
      </div>
    </>
  );
}

function AddOutfitForm() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)} className='backBtn button'>Back</button>
      <h2>Add Outfit</h2>
    </>
  );
}


export default App;
