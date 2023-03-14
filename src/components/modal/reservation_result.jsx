import { Modal } from "@mui/material";
/**예약 결과 모달 */
export default function ReservationModal({open, onOpen}) {

    return (<Modal
        open={open}
        onClose={onOpen}
    >
        <div className="result-modal-box">
            <p>예약완료 모달</p>
        </div>
    </Modal>);
};