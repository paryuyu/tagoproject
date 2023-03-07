import { DateFormatter, PriceFormmater } from "./formatter";

/** grid column 설정 */
export const columnDefs = [
    {
        maxWidth: 200,
        width: 65,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: false,

    },
    { headerName: '항공사', field: "airlineNm", },
    { headerName: '항공편', field: "vihicleId", },
    { headerName: '출발공항', field: "depAirportNm", },
    { headerName: '출발시간', field: "depPlandTime", valueFormatter: DateFormatter },
    { headerName: '도착공항', field: "arrAirportNm", },
    { headerName: '도착시간', field: "arrPlandTime", valueFormatter: DateFormatter },
    { headerName: '일반석운임', field: "economyCharge", valueFormatter: PriceFormmater },
    { headerName: '비즈니스석운임', field: "prestigeCharge", valueFormatter: PriceFormmater },

];


/**column 설정 */
export const defaultColDef = {
    sortable: true,
    filter: true,
    editable: true,
}
