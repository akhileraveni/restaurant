import {useState, useEffect} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'
const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])
  const addItemToCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isAlreadyExist = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExist) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const getUpdateData = tableMenuList =>
    tableMenuList.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))
  const fetchRestarentUrl = async () => {
    const api = 'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = getUpdateData(data[0].table_menu_list)
    setResponse(updatedData)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchRestarentUrl()
  }, [])
  const onUpdateCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(each => {
      const onClickHandler = () => onUpdateCategoryId(each.menuCategoryId)
      return (
        <li
          className={`each-tab-item ${
            each.menuCategoryId === activeCategoryId ? 'active-tab-item' : ''
          }`}
          key={each.menuCategoryId}
          onClick={onClickHandler}
        >
          <button className="mt-0 mb-0 ms-2 me-2 tab-category-button ">{each.menuCategory}</button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    return (
      <ul className="m-0 d-flex flex-column dishes-list-container">
        {categoryDishes.map(each => (
          <DishItem
            key={each.dishId}
            dishDetails={each}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }
  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartItems} />
      <ul className="m-0 ps-0 d-flex tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}
export default Home
