import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import './index.css'; // Import CSS file for styling

const DishInstructionsModal = ({ dishName, onClose }) => {
  const [show, setShow] = useState(true);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose(); // Ensure parent component handles modal closing properly
  };

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/chat", {
          session_id: "user123",
          message: `How to cook ${dishName}? Provide clear step-by-step instructions without unnecessary formatting.`
        });

        let formattedResponse = response.data.response
          .replace(/\*/g, "") // Remove * bullet points
          .replace(/\n\s*\n/g, "\n") // Remove excessive line breaks
          .trim();

        setInstructions(formattedResponse);
      } catch (error) {
        console.error("Error fetching cooking instructions:", error);
        setInstructions("Failed to generate instructions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (dishName) {
      fetchInstructions();
    }
  }, [dishName]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>How to Cook {dishName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? <p>Loading instructions...</p> : <p className="modal-text">{instructions}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DishInstructionsModal;
