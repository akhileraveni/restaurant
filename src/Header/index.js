import './index.css'
import {FiShoppingCart} from 'react-icons/fi'
const Header = ({cartItems}) => {
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const renderCartIcon = () => (
    <div className="cart-icon-container">
      <FiShoppingCart className="cart-icon" />
      <div className="cart-count-badge d-flex justify-content-center align-items-center">
        <p className="cart-count">{getCartItemsCount()}</p>
      </div>
    </div>
  )
  return (
    <header className="p-4 d-flex flex-row align-items-center nav-header">
      <h1 className="m-0 logo-heading">UNI Resto Cafe</h1>
      <div className="d-flex flex-row align-items-center ms-auto ">
        <p className="mt-0 mb-0 me-2 d-sm-block my-orders-text">my orders</p>
        {renderCartIcon()}
      </div>
    </header>
  )
}
export default Header
