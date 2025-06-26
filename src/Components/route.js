import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Electronics from './electronics';
import Layouts from './layout';
import Categories from './categories';
import Jewelery from './jewelery';
import Menclothing from './menclothing';
import Womenclothing from './womenclothing';
import ProdDet from './ProdDet';
import AllProducts from './alrproducts';
import CartViewer from './CartViewer';
import { createContext } from 'react';

export const cartContext = createContext();

function Road() {
  const [cart, setCart] = useState([]);

  return (
    <cartContext.Provider value={{ cart, setCart  }}>

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
            <Route path="/cart" element={<CartViewer />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </cartContext.Provider>
  );
}

export default Road;
