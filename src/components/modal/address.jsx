

import { Modal } from '@mui/material';
import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import "../../style/modal.css"


export default function AddressModal({ open, onOpen, onAddress }) {

    const onCompletePost = (data) => {
        console.log(data)
        onAddress(data.roadAddress);
        onOpen();
    };

    return (
        <Modal
            open={open}
            onClose={onOpen}>
            <div className='address-box'>
                <DaumPostcodeEmbed 
                    autoClose
                    onComplete={onCompletePost}
                    className="address-item"
                    style={{ height: "480px" }} />
            </div>
        </Modal>
    );
}