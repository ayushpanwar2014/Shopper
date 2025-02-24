import "./RelatedProduct.css"
import Item from "../Items/Item"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { ShopContext } from "../../Context/ShopContext"

const RelatedProduct = () => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_products.find((e) => e.id === Number(productId));

    const category_data = all_products.filter((e) => e.category === product.category);

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="wrapper">

                <div className="relatedproducts-item">
                    {category_data.map((item, i) => {

                        return <Item id={item.id} key={i} new_price={item.new_price} old_price={item.old_price} name={item.name} image={item.image} />
                    })
                    }
                </div>
                <div className="relatedproducts-item">
                    {category_data.map((item, i) => {

                        return <Item id={item.id} key={i} new_price={item.new_price} old_price={item.old_price} name={item.name} image={item.image} />
                    })
                    }
                </div>

            </div>
        </div>
    )
}

export default RelatedProduct
