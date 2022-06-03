import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import {
  Badge,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';
import Rating from '../components/product/Rating';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MessageBox from '../components/ui/MessageBox';
import { Store } from '../store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductDetails() {
  const params = useParams();
  const slug = params.slug;

  const [{ error, product, loading }, dispatch] = useReducer(reducer, {
    product: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((p) => p._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry');
      return;
    }
    ctxDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {!loading && !error && (
        <Row>
          <Col md={5}>
            <img className="img-large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3} className="m-1">
            <ListGroup variant="flush">
              <ListGroupItem>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>
                Description:
                <p>{product.description}</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3} className="m-1">
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Not in Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={() => addToCartHandler(product)}
                      variant="primary"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductDetails;
