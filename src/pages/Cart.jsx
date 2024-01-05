import React from 'react';
import { useSelector } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
// import { addToWishlist } from '../redux/slices/wishlistSlice';
import { useDispatch } from 'react-redux';
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice';

function Cart() {
  const cartArray = useSelector((state) => state.cartReducer);
  console.log("======cart array======");
  console.log(cartArray);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  let totalPrice = 0;
  if(cartArray.length>0) {
    for(let i=0; i<cartArray.length; i++) {
      totalPrice = totalPrice+cartArray[i].price;
    }
  }

  const handleCheckout = () => {
    alert("Your order is successfully placed...");
    dispatch(emptyCart())
    navigate('/')
  }

  return (
    <div style={{ marginTop: "150px" }} className='ms-5'>
      <Link to={'/'} style={{textDecoration: "none"}} >
        <button className='btn btn-light shadow border-2'><i class="fa-solid fa-arrow-left"></i> &nbsp; Back to Home</button>
      </Link>
      <div className='row w-100 mt-5'>
        <div className='col-lg-6 col-md-6 m-6'>
          <table className='table shadow border'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                cartArray?.length > 0 ?
                  cartArray.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.title}</td>
                      <td>
                        <img src={item.thumbnail} style={{ height: "100px" }}  alt="" />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className='d-flex align-items-center justify-content-between'>
                          <Button variant='outline-danger border-0' onClick={() => dispatch(removeFromCart(item.id))} > <i class="fa-solid fa-trash"></i> </Button>
                          {/* <Button variant='outline-danger' onClick={() => dispatch(addToWishlist(item))} className='ms-3' > <i class='fa-solid fa-heart'></i> </Button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                  :
                  <p>No Item to Display</p>
              }
            </tbody>
          </table>
        </div>
        
        <div className='col-lg-5 col-md-5 m-5'>
          <div className='col-lg-12 col-md-12 d-flex justify-content-center align-items-center flex-column'>
            <div className="border shadow p-5">
              <h3 className='text-primary'>Cart Summary</h3>
              <h6>Total Number of Products : <span className='fs-4 text-warning'>{cartArray.length}</span></h6>
              <h6>Total Price : <span className='fs-5 text-warning'>$ {totalPrice}</span></h6>
              <button className='btn btn-primary rounded w-100 mt-4 text-white' onClick={handleCheckout} >Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <Row className='m-5 pt-5'>
    //     <Link to={'/'} style={{ textDecoration: "none" }} ><i class="fa-solid fa-arrow-left"></i> &nbsp; Back to Home</Link>
    //     {
    //       cartArray?.length > 0 ?
    //         cartArray?.map((item) => (

    //           <Col className='mb-5'>
    //             <Card style={{ width: '18rem' }} className='mt-4'>
    //               <Card.Img variant="top" src={item.thumbnail} style={{ height: "200px" }} />
    //               <Card.Body>
    //                 <Card.Title>{item?.title}</Card.Title>
    //                 <Card.Text>
    //                   <p>{item.description.slice(0, 50)}...</p>
    //                   <p>Price : ${item.price}</p>
    //                 </Card.Text>

    //                 <div className='d-flex align-items-center justify-content-between'>
    //                   <Button variant='outline-danger' > <i class="fa-solid fa-trash"></i> </Button>
    //                   <Button variant='outline-danger' onClick={() => dispatch(addToWishlist(item))} > <i class='fa-solid fa-heart'></i> </Button>
    //                 </div>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         ))
    //         :
    //         <p>No item to display</p>

    //     }
    //   </Row>
    // </>
  )
};

export default Cart;