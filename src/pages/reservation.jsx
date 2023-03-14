import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ReservationReq } from "../util/reservationAPI";

export default function Reservation() {
    let params = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [reservation, setReservation] = useState();
    const [person, setPerson] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [selectOpen, setSelectOpen] = useState(false);
    const [seatSelectOpen, setSeatSelectOpen] = useState(false);
    const [seatType, setSeatType] = useState("");
    const [personnel, setPersonnel] = useState(0);
    const [flightId, setFlightId] = useState();

    useEffect(() => {
        setFlightId(params?.flightId)
        if (location.state) {
            setLoading(true)
            setData(location.state[0])
            console.log(location, '!@')
        } else {
            navigate("/searching")
        }

    }, [])

    const handleSelectOpen = () => {
        setSelectOpen(c => !c)
    }

    function DateFormatter(date) {
        let year = String(date).slice(0, 4);
        let mon = String(date).slice(4, 6);
        let dayNum = String(date).slice(6, 8);
        let time = String(date).slice(8, 10);

        let minute = String(date).slice(10, 12);
        let newDate = `${year}년 ${mon}월 ${dayNum}일 ${time}:${minute}`;

        return newDate;
    }

    function priceFormatter(price) {
        let formatter = new Intl.NumberFormat("ko", {
            maximumSignificantDigits: 3
        })

        if (price === undefined) price = 0;

        return `${formatter.format(price)}`
    }

    const handleSeatSelect = () => {
        setSeatSelectOpen(c => !c)
    }

    const handleReservationClick = async () => {

        if (personnel == 0) return alert("인원정보를 선택하세요.");
        if (!seatType) return alert("좌석정보를 선택하세요.");

        let reservationData = {
            flightId: flightId,
            seatType: seatType,
            personnel: personnel,
        }

        let result = await ReservationReq(reservationData)

        console.log(result, 'reservation-result')
    }


    const handleSeatType = (evt) => {

        if ((evt.target.innerText).startsWith("일")) {

            if (data.economyCharge == 0) {
                alert("가격정보가 없는 좌석은 예약할 수 없습니다.")
                setSeatType("")
            } else {
                setSeatType("economy")
            }
            setSeatSelectOpen()
        } else {
            if (data.prestigeCharge == 0) {
                alert("가격정보가 없는 좌석은 예약할 수 없습니다.")
                setSeatType("")
            } else {
                setSeatType("prestige")
            }
            setSeatSelectOpen()
        }

    }

    const handlePersonnel = (val) => {
        setPersonnel(val)
        setSelectOpen()
    }

    return (<section className="reservationPage">
        <div className="reservationBox">
            <div className="reservationHeader">
                <h2 className="reservationHeaderTypo">인원 / 좌석</h2>
                <p className="reservationHeaderTypo">{params?.flightId}</p>
            </div>
            <div className="reservationContent">
                <div className="reservationContentTitle">
                    <p className="reservationContentTitleTypo">교통</p>
                    <p className="reservationContentTitleTypo">출발정보</p>
                    <p className="reservationContentTitleTypo">도착정보</p>
                    <p className="reservationContentTitleTypo">좌석선택</p>
                    <p className="reservationContentTitleTypo">인원선택</p>
                    <p className="reservationContentTitleTypo">예약</p>
                </div>

                <div className="reservationContentBox">
                    <div className="reservationContentItem">
                        <p className="reservationContentDetailTitle">{data.airlineNm}</p>
                        <p className="reservationContentDetail">{data.vihicleId}</p>
                    </div>

                    <div className="reservationContentItem">
                        <p className="reservationContentDetailTitle">{data.depAirportNm}</p>
                        <p className="reservationContentDetail">{DateFormatter(data.depPlandTime)}</p>
                    </div>

                    <div className="reservationContentItem">
                        <p className="reservationContentDetailTitle">{data.arrAirportNm}</p>
                        <p className="reservationContentDetail">{DateFormatter(data.arrPlandTime)}</p>
                    </div>

                    <div className="reservationContentItem">
                        <div className="customSelectBox " onClick={handleSeatSelect}>
                            <p className="selectBoxPlaceholder priceZero">{seatType ? seatType === "economy" ? "일반석" : "비즈니스석" : "좌석"}</p>
                            <ArrowDropDownIcon />
                        </div>
                        <div className={seatSelectOpen ? "selectOpenOption selectSeat" : "selectCloseOption"}>
                            <p onClick={handleSeatType}
                                className={priceFormatter(data.economyCharge) == 0 ? "reservationPriceZero" : "selectOptionTypo"}>일반석 {priceFormatter(data.economyCharge)}</p>
                            <p
                                onClick={handleSeatType}
                                className={priceFormatter(data.prestigeCharge) == 0 ? "reservationPriceZero" : "selectOptionTypo"}>비즈니스석 {priceFormatter(data.prestigeCharge)}</p>
                        </div>
                    </div>

                    <div className="reservationContentItem">
                        <div className="customSelectBox" onClick={handleSelectOpen}>
                            <p className="selectBoxPlaceholder">{personnel > 0 ? personnel + "명" : "인원"}</p>
                            <ArrowDropDownIcon />
                        </div>

                        <div className={selectOpen ? "selectOpenOption" : "selectCloseOption"}>
                            {person.map((one) => {
                                return <p onClick={() => handlePersonnel(one)} key={one} className="selectOptionTypo">{one}명</p>
                            })}
                        </div>

                    </div>

                    <div className="reservationContentItem">
                        <button onClick={handleReservationClick}>예약하기</button>
                    </div>
                </div>
            </div>

        </div>
    </section>);
}