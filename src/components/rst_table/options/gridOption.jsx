
export function DateFormatter(params) {
    let date = Object.keys(params).includes("value") ? params.value : params;

    let year = String(date).slice(2, 4);
    let mon = String(date).slice(4, 6);
    let day = String(date).slice(6, 8);
    let hour = String(date).slice(8, 10);
    let min = String(date).slice(10, 12);

    
    return `${year}/${mon}/${day} ${hour}:${min}`

}

export function priceFormatter (params){
    
    let formatter = new Intl.NumberFormat("ko",{
        maximumSignificantDigits:3
    })

    if(params.value === undefined) params.value =0;

    return `${formatter.format(params.value)}`
}

export const columnDefs = [
    {
        maxWidth: 200,
        width: 65,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: false,
        resizeBy: true
    },
    { headerName: '항공사', field: "airlineNm", cellClass: 'titleLeftAlign' },
    { headerName: '항공편', field: "vihicleId", cellClass: 'titleLeftAlign' },
    { headerName: '출발공항', field: "depAirportNm", cellClass: 'titleCenterAlign' },
    { headerName: '출발시간', field: "depPlandTime", valueFormatter: DateFormatter, cellClass: 'titleRightAlign' },
    { headerName: '도착공항', field: "arrAirportNm", cellClass: 'titleCenterAlign' },
    { headerName: '도착시간', field: "arrPlandTime", valueFormatter: DateFormatter, cellClass: 'titleRightAlign' },
    { headerName: '이코노미석운임(₩)', field: "economyCharge",  cellClass: 'titleRightAlign' , valueFormatter: priceFormatter, },
    { headerName: '비즈니스석운임(₩)', field: "prestigeCharge",  cellClass: 'titleRightAlign' ,  valueFormatter: priceFormatter, },

];

export const defaultColDef = {
    sortable: true,
    filter: true,
    editable: true,
}

