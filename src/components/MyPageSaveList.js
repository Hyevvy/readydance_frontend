import {useState, useEffect, useCallback} from "react";
import { GET } from "../shared/Request";
import FavList from "./FavList";
const MyPageSaveList = () => {
    const [favList, setFavList] = useState([]);
    const [favAc, setFavAc] = useState([]);
    const [favDa, setFavDa] = useState([]);
    const [favPr, setFavPr] = useState([]);

    const getFavInfo = async () => {
        const a_token = window.localStorage.getItem("A_TOKEN");
        GET(`/api/my/GetFavList?aToken=${a_token}`).then((res)=>
            {
                const _inputData = res.data.data.map((rowData)=>({
                    id:rowData.id,
                    name:rowData.favName,
                    location:rowData.favLocation,
                    state:rowData.favState,
                    type:rowData.favType,
                    rate:rowData.favRate
                }));
                setFavList(favList.concat(_inputData));
            })
    }
    const getData = useCallback(()=>{
        getFavInfo();
       console.log(favList);
    }, [])

    const filterData = ()=>{
        for(let i=0; i<favList.length; i++){
            if(favList[i].type==="AC") setFavAc(favAc.concat(favList[i]));
            else if(favList[i].type==="DA") setFavDa(favDa.concat(favList[i]));
            else if(favList[i].type==="PR") setFavPr(favPr.concat(favList[i]));
        }
        console.log(favAc);
    };

    useEffect(()=>{
       getFavInfo().then(()=>filterData());
       console.log(favAc);
    }, []);


    return(
        <div className="MyPageSaveList">
           <h4>학원</h4>
           {favAc.map((it)=>(<FavList key={it.id} {...it}/>))}

           <h4>연습실</h4>
           {favPr.map((it)=>(<FavList key={it.id} {...it}/>))}

           <h4>댄서</h4>
           {favDa.map((it)=>(<FavList key={it.id} {...it}/>))}
        </div>
    )
}
export default MyPageSaveList;