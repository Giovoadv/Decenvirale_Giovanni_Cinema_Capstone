// import React, { useState } from "react";
// // import "./Modal.css";

// import Modal from "react-bootstrap/Modal";

// const Modal = ({ searchMovie }) => {
//   const [show, setShow] = useState(false);
//   const apiKey = "api_key=db95773a7fb212ba790d71f6adac0e7e";
//   console.log(searchMovie);

//   const getMovies = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${searchMovie}?${apiKey}`
//       );
//       const data = res.data;
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClose = () => {
//     setShow(false);
//   };
//   const handleShow = () => setShow(true);

//   return (
//     <div>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Dialog className="body">
//           <Modal.Header className="head">
//             <Modal.Title className="text">Add Songs</Modal.Title>
//           </Modal.Header>

//           <Modal.Body className="body">{searchMovie}</Modal.Body>

//           <Modal.Footer className="foot">
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="info" onClick={handleAdd}>
//               Add
//             </Button>
//           </Modal.Footer>
//         </Modal.Dialog>
//       </Modal>
//     </div>
//   );
// };
// export default Modal;
