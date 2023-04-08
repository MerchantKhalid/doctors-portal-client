import React from 'react'

const ConfirmationModal = ({title,message,closeModal,successAction,modalData}) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-error text-lg">{title}</h3>
                    <p className="py-4 font-bold">{message} </p>
                    <div className="modal-action">
                        <label onClick={()=>successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                        <label onClick={closeModal} className="btn btn-accent">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal