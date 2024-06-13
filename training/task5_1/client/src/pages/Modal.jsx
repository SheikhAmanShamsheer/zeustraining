import PropTypes from "prop-types"; // Import PropTypes

const Modal = ({ show, handleClose }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose}>Close</button>
                <p>File uploaded!</p>
            </section>
        </div>
    );
};

// Define propTypes
Modal.propTypes = {
    show: PropTypes.bool.isRequired, // show prop is required and should be a boolean
    handleClose: PropTypes.func // handleClose prop is required and should be a function
};

export default Modal;
