import "./Popular.css"
import Item from "../Items/Item"
import { useEffect, useState } from "react"

const Popular = () => {

    const [popular_in_women, setPopular_in_women] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8800/popularinwomen',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => setPopular_in_women(data));

    },[])


    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popular_in_women.map((item, i) => {
                    return (
                        <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
                    )
                })}
            </div>
        </div>
    )
}

export default Popular
