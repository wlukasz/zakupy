import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => (
  <Modal
    ariaHideApp={false} // Added this myself to avoid a Warning. Default is 'true' and causes main screen to be invisible when modal pos up
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClickOkay}
    contentLabel="Selected Option"
    closeTimeoutMS={300}
    className="modal"
  >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button className="button" onClick={props.handleClickOkay}>Okay</button>
  </Modal>
)

export default OptionModal