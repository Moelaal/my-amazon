import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import MessageBox from '../components/ui/MessageBox';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import Product from '../components/product/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getError } from '../utils';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Products() {
  const [{ error, products, loading }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <main>
        <Helmet>
          <title>My Amazon</title>
        </Helmet>
        <h1>List of Products</h1>
      </main>
      <ul className="products">
        {loading && <LoadingSpinner />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {!loading && !error && (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </ul>
    </div>
  );
}

export default Products;
