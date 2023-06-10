const ProductListItem = (props) => {
  return (
    <tr>
      <td>{props.productObject.productName}</td>
      <td>{props.productObject.productType.productTypeName}</td>
      <td>{props.productObject.productShortDescription}</td>
      <td>{props.productObject.price}</td>
    </tr>
  );
};

export default ProductListItem;
