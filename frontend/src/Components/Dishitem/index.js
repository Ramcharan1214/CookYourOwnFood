import "./index.css"
import { Link } from "react-router-dom"

const DishesItem=(props)=>{
    const data= {...props.data}
    console.log(data)
     return (
        <Link to={`/dishes/${data.id}`} className="dishitem">
      <img src={data.thumbnailUrl} alt="nano" className="dishimg" />
      <h1>{data.dishname}</h1>
        </Link>
     )
}

export default DishesItem;