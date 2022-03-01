import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import MyDiv from "../components/MyDiv";
import MyMap from "../components/MyMap";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import { GET } from "../shared/Request";

const DetailPage = () => {
  const { id, type } = useParams();

  const [cau, setCau] = useState("");
  const [info, setInfo] = useState("");
  const [int, setInt] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [coordX, setCoordX] = useState("");
  const [coordY, setCoordY] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    GET(`/api/main/SearchDetailed?FAD_NO=${id}&FAD_TYPE=${type}`).then(
      (res) => {
        const ans = res.data.data;
        console.log(ans);
        setName(ans.fadName);
        setRate(ans.fadRate);
        setImgUrl(ans.fadImg);
        setLocation(ans.fadLocation);
        setCau(ans.fadCau);
        setInfo(ans.fadInfo);
        setInt(ans.fadInt);
        setPrice(ans.fadPrice);
        setUrl(ans.fadUrl);
        setCoordX(ans.fadX);
        setCoordY(ans.fadY);
      }
    );
  }, []);

  return (
    <>
      <MyHeader/>
      <div className="DetailPage">
        <div className="DetailPage__header">
          <img
            width="130px"
            src={process.env.PUBLIC_URL + imgUrl}
            alt="시설 사진"
          />
          <div className="DetailPage__header__info">
            <div className="DetailPage__header__name">
              <h4>{name}</h4>
              <AiOutlineStar />
              <AiFillStar />
            </div>
            <h6>⭐️ {rate}</h6>
            <h6>주소 | {location}</h6>
            <h6>홈페이지 | {url}</h6>
          </div>
        </div>
        <MyDiv head={"소개"} innerText={int} />

        <MyDiv head={"시설 안내"} innerText={info} />

        <MyDiv head={"가격 안내"} innerText={price} />

        <MyDiv head={"주의 사항"} innerText={cau} />

        <MyMap head={"위치 안내"} address={location} cx={coordX} cy={coordY}/>
      </div>
      <MyFooter />
    </>
  );
};
export default DetailPage;
