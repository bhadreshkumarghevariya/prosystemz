import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_CART_MUTATION } from "../../mutations/CREATE_CART_MUTATION";
import { ADD_PRODUCT_TO_CART_MUTATION } from "../../mutations/ADD_PRODUCT_TO_CART_MUTATION";
import Cookies from "js-cookie";

const ProductListItem = (props) => {
  const [createCart] = useMutation(CREATE_CART_MUTATION);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART_MUTATION);

  const handleCreateCart = async (productId) => {
    let cartId = Cookies.get("cartId");

    console.log(productId);
    if (!cartId) {
      createCart({ variables: { productId } })
        .then((response) => {
          // console.log(productId);
          const cartId = response.data.createCart;
          Cookies.set("cartId", cartId);
          console.log("Cart created successfully!");
        })
        .catch((error) => {
          console.error("Error creating cart:", error);
          return;
        });
    } else {
      addProductToCart({ variables: { cartId, productId } })
        .then((response) => {
          // const cart = response.data.addProductToCart;
          console.log(response);
        })
        .catch((error) => {
          console.error("Error adding  creating cart:", error);
          return;
        });
    }
  };
  return (
    <tr>
      <td>{props.productObject.productName}</td>
      <td>{props.productObject.productType.productTypeName}</td>
      <td>{props.productObject.productShortDescription}</td>
      <td>{props.productObject.price}</td>
      <td>
        <Button
          variant="outline-primary"
          className="m-3"
          onClick={() => handleCreateCart(props.productObject.id)}
        >
          SELECT +
        </Button>
      </td>
    </tr>
  );
};

export default ProductListItem;
