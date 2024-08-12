import React, { useState } from 'react';
import './test.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sentlist } from './sentlist';
import { Loadingpage } from './loadingpage';
import './mailsender.css';




const Test = () => {
  const [step, setStep] = useState(1);
  const [emailList, setEmailList] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [ccList, setCCList] = useState('');
  const [bccList, setBCCList] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSentList, setShowSentList] = useState(false);
  const [emailid,setemailid] = useState('');
  const [apppassword,setapppassword] = useState('');
  const [invalidEmails,setinvalidEmails] = useState('');


  const handleSendEmails = async () => {
    try {
      const areAllEmpty = !emailList.trim() && !ccList.trim() && !bccList.trim();
      if (areAllEmpty) {
        alert('At least one of Email Addresses, CC Email Addresses, or BCC Email Addresses should be filled.');
        return;
      }
      if (!subject.trim() || !emailBody.trim()) {
        alert('Subject and Email Body are mandatory fields.');
        return;
      }
  
      setLoading(true);
      const dataToSend = {
        emailList: emailList.trim().replace(/;+$/, '').split(';').map(email => email.trim()),
        ccList: ccList.trim().replace(/;+$/, '').split(';').map(email => email.trim()),
        bccList: bccList.trim().replace(/;+$/, '').split(';').map(email => email.trim()),
        emailBody: emailBody,
        subject: subject,
        emailid: emailid,
        apppassword: apppassword,
      };
  
      console.log('Data to send to the backend:', dataToSend);
  
      const response = await axios.post('http://localhost:3002/send-emails', dataToSend);
  
      console.log(response.data);
      setEmailStatus(response.data.message);
      setSentEmails(response.data.sentEmails);
      setinvalidEmails(response.data.invalidEmails);
      setShowSentList(true);  
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails. Check the console for more details.');
      console.log('Error details:', error.response);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
      setEmailList('');
      setCCList('');
      setBCCList('');
      setSubject('');
      setEmailBody('');
      setemailid('');
      setapppassword('');
    }
  };
  

  const handleDoneClick = () => {
    setShowSentList(false); // Set showBox to false to hide the form
    setinvalidEmails([]); 
  };

  
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
   <div className='htmll'>
     <form id="msform" >
      <ul id="progressbar">
        <li className={step === 1 ? 'active' : ''}>Account Setup</li>
        <li className={step === 2 ? 'active' : ''}>Send Bulk Emails</li>
      </ul>

      {step === 1 && (
        <fieldset>
        <div className='firstboxxx'>
        <h2 className="fs-title">Create your Gmail account</h2>
         
          <h3 className="fs-subtitle" style={{marginTop:"20px"}}>This is step 1</h3>
          <input type="text" name="email" placeholder="Gmail"  onChange={(e) => setemailid(e.target.value)}/>
          <input type="password" name="pass" placeholder="App Password"  onChange={(e) => setapppassword(e.target.value)}/>
          <input type="button" name="next" className="next action-button" value="Next" onClick={handleNext} />

          <br/>
          <br/>

          <Link to='/video'>
          <b>Watch this video to setup</b><br/>
          </Link>
          <br/>
          <p >OR</p>
          <p>Go to this url <a href='https://myaccount.google.com/security' target='_blank'>Link</a></p>

          <p style={{textAlign:"left"}}>
          In security Option,<br/>
          1. two step verification<br/>
          2. turn on the 2 step verification<br/>
          3. scrool down in the page<br/>
          4. open app passwords<br/>
          5. Enter your App Name<br/>
          6. click on  Create.<br/>
          7. A password pops up<br/>
          8. remove the spaces of the received passwords <br/>
          9. copy this password and paste it in the app password field above.
          </p>
          

        </div>
         
      

        </fieldset>
       
      )}

      {step === 2 && (
        <div>
           <fieldset className='itemsalign'>

           <div >
           {loading && <Loadingpage />}
           </div>

           <div>
           {!loading  && !showSentList && (
            <div>
                <h2 className="fs-title">Send multiple mails by a single click</h2>
                  <h3 className="fs-subtitle"> Enter Email Addresses (separated by a semicolon)</h3>
                <div className="inputContainer">
                    <textarea
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      rows="1"
                      cols="50"
                    />
                </div>
                <h3 className="fs-subtitle">  Enter CC Email Addresses (separated by a semicolon):</h3>
                <div className="inputContainer">
      
                    <textarea
                      value={ccList}
                      onChange={(e) => setCCList(e.target.value)}
                      rows="1"
                      cols="50"
                    />
                </div>
                <h3 className="fs-subtitle"> Enter BCC Email Addresses (separated by a semicolon)</h3>
                <div className="inputContainer">
                
                  
                    <textarea
                      value={bccList}
                      onChange={(e) => setBCCList(e.target.value)}
                      rows="1"
                      cols="50"
                    />
              
                </div>
                <h3 className="fs-subtitle"> Enter Subject:</h3>
              
                  <label>  
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </label>
              
                <h3 className="fs-subtitle">Enter Email Body:</h3>
                <div className="inputContainer"> 
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows="5"
                      cols="50"
                    />
                </div>
                <div className='d-flex'>
                <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePrevious} />
                <button id="button" onClick={handleSendEmails} >
                  Send Mails
                </button>
                </div>
          </div>
        
      )}
           </div>


           {showSentList && (
        <Sentlist
         emailStatus={emailStatus}
          sentEmails={sentEmails}
          invalidEmails={invalidEmails}
           onDoneClick={handleDoneClick} />
      )}  
        
           
        </fieldset>
        </div>
       
       
      )}

    </form>
   </div>
  );
};

export default Test;
