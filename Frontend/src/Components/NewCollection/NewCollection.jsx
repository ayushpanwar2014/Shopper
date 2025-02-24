import "./NewCollection.css"
import Item from "../Items/Item";
import { useEffect, useState } from "react";

const NewCollection = () => {

    const [new_collections, setNew_Collections] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8800/newcollection', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json()).then((data) => setNew_Collections(data));

    }, [])

    return (
        <div className="new-collection">

            <h1>NEW COLLECTION</h1>

            <hr />

            <div className="collections">
                {new_collections.map((item, i) => {
                    return (
                        <Item image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} id={item.id} key={i} />
                    )
                })}
            </div>

        </div>
    )
}

export default NewCollection
