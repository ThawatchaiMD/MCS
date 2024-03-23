import React from "react";

const Modal = (props) => {

    let modalSize = 'modal-dialog modal-dialog-centered';

    if (props.modalSize) {
        modalSize += ' ' + props.modalSize
    }

    return (
        <>
            <div
                className="modal fade"
                id={props.id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className={modalSize}>
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modal title
                            </h1>
                            <button
                                id='btnModalClose'
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div> */}
                        <div className="modal-body">
                            {props.children}
                        </div>
                        {/* <div class="modal-footer"> */}
                            {/* <button type="button" class="btn btn-success">Save</button> */}
                            {/* <button type="button" class="btn btn-success">Print</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
