import { Card, Table } from "react-bootstrap";
import { useGetShoppingCart } from "../hooks/useGetShoppingCart";
import ProductListItem from "../components/build-your-own/ProductListItem";
import { useEffect } from "react";

const OrderItems = (props) => {
  const shoppingCartId = props.shoppingCartId;
  const userId = props.userId;
  let tempCartSubTotal = 0;
  const { data, loading, error } = useGetShoppingCart(
    shoppingCartId,
    userId,
    "Not-Active"
  );

  useEffect(() => {
    console.log("useEffect");
  }, [data]);
  console.log(data);
  return (
    <Card className="mb-5 p-0">
      <Card.Header>
        <h4 className="mb-0">Order Items</h4>
      </Card.Header>
      <Card.Body className="m-1 p-1">
        <Table className="table text-nowrap table-centered table-hover">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          {/* {isData} */}
          <tbody>
            {data &&
              data.getShoppingCart.carts.map((cart) => {
                return (
                  <>
                    <tr>
                      <td colSpan="6">
                        <h5>
                          {cart.cartName ? cart.cartName : "Personal Build"}
                        </h5>
                      </td>
                    </tr>
                    {cart.products.map((product) => {
                      tempCartSubTotal = tempCartSubTotal + product.price;

                      return (
                        <ProductListItem
                          key={product.id}
                          productObject={product}
                          selectBtnIsHide="true"
                          showProductDetails="false"
                          showProductType="false"
                          className="m-3"
                        />
                      );
                    })}
                  </>
                );
              })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>

    // <div>
    //   <h1>Order Items {shoppingCartId}</h1>
    //   <h1>User Id {userId}</h1>
    // </div>
  );
};

export default OrderItems;
