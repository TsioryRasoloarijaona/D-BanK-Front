import React from 'react'


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: string | null | undefined,
    color: string,
    tittle: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, color, tittle }) => {
    if (!isOpen) return null;
    return (
        <div className="relative">
            <div className="fixed inset-0 z-50" style={{ backdropFilter: 'blur(5px)' }}>
                <div className="modal-box absolute top-1/2 left-1/2 opacity-100  transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <h3 className="font-bold text-lg">{tittle}</h3>
                    <p className={`py-4 ${color}`} >{children}</p>
                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn" onClick={onClose}>Close</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Modal;

