import React from 'react';

export const Sentlist = ({ emailStatus, sentEmails, onDoneClick, invalidEmails }) => {
  const handleDoneClick = () => {
    if (onDoneClick) {
      onDoneClick();
    }
  };

  return (
    <div className='d-flex fex-row justify-content-center align-items-center ' style={{ height: '100vh' }}>
      <div className="card">
        <div className="header">
    
          <div className="image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  stroke="#000000"
                  d="M20 7L9.00004 18L3.99994 13"
                ></path>
              </g>
            </svg>
          </div>
        
          <div className="content">
          {sentEmails && sentEmails.length > 0 && (
            <div>
              <span className="title">{emailStatus} to</span>
              <p className="message">{sentEmails.join(', ')}</p>
            </div>
          )}

          {invalidEmails && invalidEmails.length > 0 && (
            <div>
              <span className="title " style={{ color: "red" }}>
                Invalid email address{invalidEmails.length > 1 ? 'es' : ''} are
              </span>
              <br />
              <span className="message ">{invalidEmails.join(', ')}</span>
            </div>
          )}


         
        </div>
            </div>
          <div className="actions">
            <button type="button" className="history" onClick={handleDoneClick}>
              Done
            </button>
          </div>
        </div>
      </div>
  );
};
