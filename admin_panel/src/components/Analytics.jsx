import StoreCount from "./Store/StoreCount"
import CategoryCount from "./Category/categoryCount"
import ProductCount from "./Products/ProductCount"

const Analytics = () => {
  return (
    <section style={{display:"flex",gap:"2rem"}}>
        
        <StoreCount />
        <CategoryCount />
        <ProductCount />
    </section>
  )
}

export default Analytics