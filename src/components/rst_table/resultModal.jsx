import { Modal } from "@mui/material";
import FinalChkList from "./item/finalChklist";

export default function ResultModal({ open, onOpen, updateData, onUpdate }) {




    return (<>
        <Modal
            open={open}
            onClose={onOpen}>

            <div className='final-update-chkbox'>
                {updateData.length !== 0 ?
                    <> {updateData.map((one, index) => <FinalChkList item={one} key={index} />)}
                        <button onClick={onUpdate}>수정완료하기</button>
                    </>
                    :
                    <>
                        <p className='no-data-ment'>수정된 데이터가 없습니다.</p>
                        <button onClick={onOpen}>돌아가기</button>
                    </>

                }

            </div>
        </Modal>

    </>);
}
