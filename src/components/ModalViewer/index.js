import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import MaterialIcon from "../MaterialIcon";
import Viewer from "../Viewer"
import "./styles.scss"


const ModalViewer = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className="modal-content--viewer"
    overlayClassName="modal-overlay">
    <div className="modal-header">
      <h2 className="modal-header__title">{props.title}</h2>
      <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
        <MaterialIcon icon="close"/>
      </button>
    </div>
    <div className="modal-body">
      <Viewer manifest="http://wellcomelibrary.org/iiif/b18035723/manifest" />
    </div>
  </Modal>
)

ModalViewer.propTypes = {
  appElement: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  manifestUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export default ModalViewer
