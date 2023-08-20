import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const sentenceParts = [
  { blanks: 4, sentence: '' }, // Will
  { blanks: 1, sentence: '' }, // U
  { blanks: 5, sentence: '' }, // Marry
  { blanks: 2, sentence: '' }, // Me
];

function App() {
  const initialImages = sentenceParts.map((part) => Array(part.blanks).fill(undefined));
  const [uploadedImages, setUploadedImages] = useState(initialImages);
  const [showModal, setShowModal] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleImageUpload = (acceptedFiles, partIndex, blankIndex) => {
    const imageFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      const newImages = [...uploadedImages];
      newImages[partIndex][blankIndex] = imageDataUrl;
      setUploadedImages(newImages);

      // Check if all blanks are filled to show the final message
      if (newImages.flat().every((img) => img !== undefined)) {
        setShowFinalMessage(true);
      }
    };
    reader.readAsDataURL(imageFile);
  };

  const handleImageRemove = (partIndex, blankIndex) => {
    const newImages = [...uploadedImages];
    newImages[partIndex][blankIndex] = undefined;
    setUploadedImages(newImages);

    // Hide the final message modal if a picture is removed
    setShowFinalMessage(false);
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: '1000',
    },
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInstructionsClick = () => {
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      {showModal && (
        <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customModalStyles}>
          <h2>Scavenger Hunt Instructions</h2>
          <p>
            Welcome to the Scavenger Hunt game! PLEASE READ THESE RULES CAREFULLY!! Your task is to upload photos of the random
            letters around this location to fill in the blanks and
            reveal a message for a prize. Click on each blank to upload a photo, and a message will appear
            once all blanks are filled. Have fun and good luck!
          </p>
          <button onClick={handleCloseModal} className="btn btn-primary">
            Start
          </button>
        </Modal>
      )}

      {showFinalMessage && (
        <Modal isOpen={showFinalMessage} onRequestClose={() => setShowFinalMessage(false)} style={customModalStyles}>
          <h2>Final Message</h2>
          <p>Congratulations! You have filled all the blanks. 
            I hope you had fun on this journey. 
            But the fun is just beginning.
            I've also been meaning to ask you.....
            <br></br> Hawi, Will You Marry Me?</p>
          {/* Add any other content or buttons you want in the modal */}
          <button onClick={() => setShowFinalMessage(false)} className="btn btn-primary">
            Close
          </button>
        </Modal>
      )}

<div className="background-container"> {/* The container div */}
      <div className="container mt-5">
        <div className="mb-4 text-center"><u><h1 className='title'>Scavenger Hunt Game</h1></u></div>
        <div><p>Hint: What does the man on one knee say?</p></div>
        <div className="info-icon" onClick={handleInstructionsClick}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        <div className="d-flex justify-content-center">
          {sentenceParts.map((part, partIndex) => (
            <div key={partIndex} className="sentence-line">
              {[...Array(part.blanks)].map((_, blankIndex) => (
                <div key={blankIndex} className="uploaded-image btn btn-light btn-lg">
                  {uploadedImages[partIndex][blankIndex] ? (
                    <>
                      <img src={uploadedImages[partIndex][blankIndex]} alt={`Blank ${blankIndex + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(partIndex, blankIndex)}
                        className="btn btn-danger btn-remove"
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <Dropzone
                      onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles, partIndex, blankIndex)}
                      accept="image/*"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone-inner">
                          <input {...getInputProps()} />
                          <p className="m-0"></p>
                        </div>
                      )}
                    </Dropzone>
                  )}
                </div>
              ))}
              {partIndex < sentenceParts.length - 1 && <br />}
            </div>
          ))}
        </div>
        {uploadedImages.every((partImages) => partImages.every((img) => img !== undefined)) && (
          <p className="proposal-sentence mt-3 text-center h3">Will You Marry Me?</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
