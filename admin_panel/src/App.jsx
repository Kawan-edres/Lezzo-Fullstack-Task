import { BrowserRouter , Routes, Route } from "react-router-dom";
import Store from "./components/Store/Store";
import SideBar from "./components/SideBar";
import Category from "./components/Category/Category";
import NotFound from "./NotFound";
import Product from "./components/Products/Product";

const App = () => {


  
  return (
      <BrowserRouter>
        <SideBar>
          <Routes>
            <Route index element={<Store />} />
            <Route path="/categories/store/:storeId" element={<Category />} />
            <Route path="/products/category/:categoryId" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SideBar>
      </BrowserRouter>
  );
};

export default App;
