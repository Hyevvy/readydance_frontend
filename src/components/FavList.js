const FavList = ({id, name, location, state, rate, type}) => {
    return(
        <div>
            <img width="130px" height="150px"  alt="img" />
            <div className="FavList__rate">⭐️{rate}</div>
            <div className="FavList__name">{name}</div>
            <div className="FavListt__descripti  on">{location}</div>
        </div>
    )
}
export default FavList;