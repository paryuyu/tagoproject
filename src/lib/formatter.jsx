
/**데이터그리드의 내 가격 포맷터 */
export function PriceFormmater(params) {
    let formatter = new Intl.NumberFormat("ko", {
        style: 'currency',
        currency: "krw"
    })

    if (params.value) {
        return `${formatter.format(params.value)}`
    } else {
        return `${formatter.format(0)}`
    }
}

/**날짜 및 시간 포맷터 */
export function DateFormatter(params) {
    let date = Object.keys(params).includes("value") ? params.value : params;

    let year = String(date).slice(2, 4);
    let mon = String(date).slice(4, 6);
    let day = String(date).slice(6, 8);
    let hour = String(date).slice(8, 10);
    let min = String(date).slice(10, 12);

    return `${year}/${mon}/${day} ${hour}:${min}`

}
