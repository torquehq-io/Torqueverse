import React from "react";
import styles from "./modal.module.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}> 
        <button  onClick={onClose} className={`${styles.btnClose} btn-close`} >✕</button>
        
        {children}
       </div>
    </div>
      
  );
};

export default Modal;