import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

const BackDrop = (props) => {
    return <div className="backdrop" onClick={props.onConfirm} />
}

const RootModal = (props) => {
    return <div className="modal">{props.children}</div>
}

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <BackDrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <RootModal>{props.children}</RootModal>,
                document.getElementById('modal-root')
            )}
        </>
    )
}
export default Modal
