export default function RecentKeyword({dep,arr}) {


    return ( <><div className="recentChipBox">
    <p className="recentChipTypo recentChipTitle">출발공항</p>
    <p className="recentChipTypo recentChipContent">{dep}</p>
    <p className="recentChipTypo recentChipTitle">도착공항</p>
    <p className="recentChipTypo recentChipContent">{arr}</p>
</div></> );
}
