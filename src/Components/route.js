import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Electronics from './electronics';
import Layouts from './layout';
import Categories from './categories';
import Jewelery from './jewelery';
import Menclothing from './menclothing';
import Womenclothing from './womenclothing';
import ProdDet from './ProdDet';
import AllProducts from './alrproducts';

function Road() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Categories />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="jewelery" element={<Jewelery />} />
          <Route path="mens-clothing" element={<Menclothing />} />
          <Route path="womens-clothing" element={<Womenclothing />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="product/:id" element={<ProdDet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Road;
