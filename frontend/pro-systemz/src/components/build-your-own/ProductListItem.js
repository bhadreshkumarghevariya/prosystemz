import { Button, Image } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_CART_MUTATION } from "../../mutations/CREATE_CART_MUTATION";
import { ADD_PRODUCT_TO_CART_MUTATION } from "../../mutations/ADD_PRODUCT_TO_CART_MUTATION";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import DetailsButton from "../DetailsButton";
import SelectButton from "../SelectButton";
import { useNavigate } from "react-router-dom";

const ProductListItem = (props) => {
  const [createCart] = useMutation(CREATE_CART_MUTATION);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART_MUTATION);
  const navigate = useNavigate();

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
          props.setProductAddedToBuild(true);
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
          props.setProductAddedToBuild(true);
        })
        .catch((error) => {
          console.error("Error adding  creating cart:", error);
          return;
        });
    }
  };

  const handleViewDetails = (productID) => {
    console.log("View Details");
    navigate("/product-details/" + productID);
  };
  return (
    <tr>
      <td className="p-auto">
        <Image
          src={props.productObject.imageURL}
          alt="ImageTest"
          width="100"
          height="100"
          className="mx-auto"
          fluid
        />
      </td>
      <td>{props.productObject.productName}</td>
      <td>{props.productObject.productType.productTypeName}</td>
      <td>{props.productObject.productShortDescription}</td>
      <td>${props.productObject.price}</td>
      <td>
        {/* <Link to={"/product-details/" + props.productObject.id}> */}
        <DetailsButton
          onClick={() => handleViewDetails(props.productObject.id)}
        />
        {/* </Link> */}
      </td>

      {!props.selectBtnIsHide && (
        <td>
          <SelectButton
            onClick={() => handleCreateCart(props.productObject.id)}
          />
          {/* <Button
            variant="outline-primary"
            className="m-3"
            onClick={() => handleCreateCart(props.productObject.id)}
          >
            SELECT+
          </Button> */}
        </td>
      )}
    </tr>
  );
};

export default ProductListItem;
