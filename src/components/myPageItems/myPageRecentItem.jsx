export default function MypageRecentSearchItem({ item }) {
   
    return (<>
      
            <div className="myPagerecentViewContentItem">
                <p className="myPageRecentItemTypo myPageRecentItemTitle">출발공항</p>
                <p className="myPageRecentItemTypo">{item.arr ?item.arr :"정보없음"}</p>
                <p className="myPageRecentItemTypo myPageRecentItemTitle">도착공항</p>
                <p className="myPageRecentItemTypo">{item.arr ?item.arr :"정보없음"}</p>
                <p className="myPageRecentItemTypo myPageRecentItemTitle">항공편</p>
                <p className="myPageRecentItemTypo">{item.line ?item.line :"정보없음"}</p>
                <p className="myPageRecentItemTypo myPageRecentItemTitle">출발시간</p>
                <p className="myPageRecentItemTypo">{item.date ?item.date :"정보없음"}</p>
            </div>
            
    </>);
}




