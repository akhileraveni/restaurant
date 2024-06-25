import './index.css'
const DishItem = ({
  dishDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails
  const onIncreaseQuantity = () => addItemToCart(dishDetails)

  const onDecreaseQuantity = () => removeItemFromCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }
  const renderController = () => (
    <div className="controller-container d-flex align-items-center bg-success">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p>{getQuantity()}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-container d-flex mb-3 p-3">
      <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderController()}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not Available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-calories text-warning">{dishCalories} calories</p>
      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}
export default DishItem
