import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';

function WishList() {
  const wishlistArray = useSelector((state) => state.wishlistReducer);
  console.log("======wished array======");
  console.log(wishlistArray);

  const dispatch = useDispatch();

  return (
    <>
      <Row className='m-5 pt-5'>
      <Link to={'/'} style={{textDecoration: "none"}} >
        <button className='btn btn-light shadow border-2'><i class="fa-solid fa-arrow-left"></i> &nbsp; Back to Home</button>
      </Link>
        {
          wishlistArray?.length > 0 ?
            wishlistArray?.map((item) => (

              <Col className='mb-5'>
                <Card style={{ width: '18rem' }} className='mt-4'>
                  <Card.Img variant="top" src={item.thumbnail} style={{ height: "200px" }} />
                  <Card.Body>
                    <Card.Title>{item?.title}</Card.Title>
                    <Card.Text>
                      <p>{item.description.slice(0, 50)}...</p>
                      <p>Price : ${item.price}</p>
                    </Card.Text>

                    <div className='d-flex align-items-center justify-content-between'>
                    <Button variant='outline-danger' onClick={() => dispatch(removeFromWishlist(item.id))} > <i class="fa-solid fa-trash"></i> </Button>
                    <Button variant='outline-success' onClick={() => dispatch(addToCart(item))} > <i class='fa-solid fa-cart-plus'></i> </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
            :
            <p>No item to display</p>

        }
      </Row>
    </>
  )
};

export default WishList;