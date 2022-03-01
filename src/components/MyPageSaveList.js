import {useState, useEffect} from "react";
import { GET } from "../shared/Request";
const MyPageSaveList = () => {
    const [favList, setFavList] = useState("");
    useEffect(()=>{
        const a_token = window.localStorage.getItem("A_TOKEN");
        GET(`/api/my/GetFavList?aToken=${a_token}`).then(
            (res)=>
            {
                //TODO: 응답 이상하게 들어와서 서버에 요청함
                console.log(res);
            });
    },[]);
    return(
        <div className="MyPageSaveList">
           
        </div>
    )
}
export default MyPageSaveList;