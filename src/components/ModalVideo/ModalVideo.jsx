import React from 'react';
import './ModalVideo.css';
import { FaRegTimesCircle  } from 'react-icons/fa';

const ModalVideo = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>
          <FaRegTimesCircle  />
        </button>
      </div>
    </div>
  );
};

export default ModalVideo