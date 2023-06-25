import  { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/SideBar';
import NotFound from './NotFound';


const Product = lazy(() => import('./components/Products/Product'));
const Store = lazy(() => import('./components/Store/Store'));
const Category = lazy(() => import('./components/Category/Category'));
const VirtualStoreList = lazy(() => import('./components/Store/VirtualizedStore'));
const Analytics = lazy(() => import('./components/Analytics'));

const App = () => {
  return (
    <Router>
      <SideBar>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/store" element={<Store />} />
            <Route index element={<Analytics />} />
            <Route path="/virtualizedstore" element={<VirtualStoreList />} />
            <Route path="/categories/store/:storeId" element={<Category />} />
            <Route path="/products/category/:categoryId" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SideBar>
    </Router>
  );
};

export default App;
