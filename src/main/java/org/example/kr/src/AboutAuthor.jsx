// AboutAuthor.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AboutAuthor = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Body>
                <h5>Name: Prozorov Konstantin</h5>
                <p>
                    это было очень больно и тяжело
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AboutAuthor;
