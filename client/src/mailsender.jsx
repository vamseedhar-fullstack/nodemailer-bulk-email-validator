// import React, { useState } from 'react';
// import axios from 'axios';
// import './mailsender.css';
// import { Loadingpage } from './loadingpage';
// import { Sentlist } from './sentlist';


// const EmailSender = () => {
//   const [emailList, setEmailList] = useState('');
//   const [emailBody, setEmailBody] = useState('');
//   const [ccList, setCCList] = useState('');
//   const [bccList, setBCCList] = useState('');
//   const [emailStatus, setEmailStatus] = useState(null);
//   const [sentEmails, setSentEmails] = useState([]);
//   const [subject, setSubject] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showSentList, setShowSentList] = useState(false);

//   const handleSendEmails = async () => {
//     try {

//       const areAllEmpty = !emailList.trim() && !ccList.trim() && !bccList.trim();
//     if (areAllEmpty) {
//       alert('At least one of Email Addresses, CC Email Addresses, or BCC Email Addresses should be filled.');
//       return;
//     }
//       if (!subject.trim() || !emailBody.trim()) {
//         alert('Subject and Email Body are mandatory fields.');
//         return;
//       }

//       setLoading(true);
//       const dataToSend = {
//         emailList: emailList.split(';').map(email => email.trim()),
//         ccList: ccList.split(';').map(email => email.trim()),
//         bccList: bccList.split(';').map(email => email.trim()),
//         emailBody: emailBody,
//         subject: subject,
//       };

//       console.log('Data to send to the backend:', dataToSend);

//       const response = await axios.post('http://localhost:3002/send-emails', dataToSend);

//       console.log(response.data);
//       setEmailStatus(response.data.message);
//       setSentEmails(response.data.sentEmails);
//       setShowSentList(true);
//     } catch (error) {
//       console.error('Error sending emails:', error);
//       alert('Error sending emails. Check the console for more details.');
//       console.log('Error details:', error.response);
//     } finally {
//       setLoading(false); // Set loading to false after the API call completes
//       setEmailList('');
//       setCCList('');
//       setBCCList('');
//       setSubject('');
//       setEmailBody('');
//     }
//   };

//   const handleDoneClick = () => {
//     setShowSentList(false); // Set showBox to false to hide the form
//   };


//   return (
//     <div>
//       {loading && <Loadingpage />}



//       {!loading  && !showSentList && (
//         <div className='d-flex flex-row justify-content-center align-items-center boxxx'>
          
//           <div action="" className="form_main">
//             <p className="heading">Send multiple mails by a single click</p>
            

//             <div className="inputContainer">
//               <label>
//                 Enter Email Addresses (separated by a semicolon):
//                 <br />
//                 <br />
//                 <textarea
//                   value={emailList}
//                   onChange={(e) => setEmailList(e.target.value)}
//                   rows="3"
//                   cols="50"
//                 />
//               </label>
//             </div>
//             <div className="inputContainer">
//               <label>
//                 Enter CC Email Addresses (separated by a semicolon):
//                 <br />
//                 <br />
//                 <textarea
//                   value={ccList}
//                   onChange={(e) => setCCList(e.target.value)}
//                   rows="2"
//                   cols="50"
//                 />
//               </label>
//             </div>
//             <div className="inputContainer">
//               <label>
//                 Enter BCC Email Addresses (separated by a semicolon):
//                 <br />
//                 <br />
//                 <textarea
//                   value={bccList}
//                   onChange={(e) => setBCCList(e.target.value)}
//                   rows="2"
//                   cols="50"
//                 />
//               </label>
//             </div>

//             <div className="inputContainer ">
//               <label>
//                 Enter Subject:
//                 <br />
//                 <br />
//                 <input
//                   type="text"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                 />
//               </label>
//             </div>

//             <div className="inputContainer">
//               <label>
//                 Enter Email Body:
//                 <br />
//                 <br />
//                 <textarea
//                   value={emailBody}
//                   onChange={(e) => setEmailBody(e.target.value)}
//                   rows="4"
//                   cols="50"
//                 />
//               </label>
//             </div>
//             <button id="button" onClick={handleSendEmails}>
//               Send Mails
//             </button>
//           </div>
//         </div>
//       )}

    

     
//       {showSentList && (
//         <Sentlist emailStatus={emailStatus} sentEmails={sentEmails} onDoneClick={handleDoneClick} />
//       )}      

//     </div>
//   );
// };

// export default EmailSender;
