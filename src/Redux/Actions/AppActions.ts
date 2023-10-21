
import toast from "react-hot-toast";
import { currentUserType, productsType, shopsType } from "../../Config/types";
import { createShopTypes } from "../../Pages/CreaetShop";
import { signUpFormDataType } from "../../Pages/Signup";
import { generateRandomId } from "../../utils/randomIdGen";
import { RootState } from "../store";
import { Idispatch } from "../types";


export const initApp = () => (dispatch: Idispatch) => {
  try {
    const oldUsers = localStorage.getItem("Users");

    const currentUser = localStorage.getItem('Current-User');
    const parsedCurrentUser: currentUserType = JSON.parse(currentUser as string)

    const shops = localStorage.getItem('Shops');
    const parsedShops: shopsType[] = JSON.parse(shops as string);

    const products = localStorage.getItem('Products');
    const parsedProducts = JSON.parse(products as string);

    if (JSON.parse(oldUsers as string)) {
      console.log('oldUsers', oldUsers)
      dispatch({ type: 'signupUser', payload: JSON.parse(oldUsers as string) })
    }

    if (parsedCurrentUser && parsedCurrentUser.rememberMe) {
      dispatch({ type: 'signinUser', payload: parsedCurrentUser })
    } else {
      localStorage.removeItem('Current-User');
    }

    if (parsedShops) {
      dispatch({ type: 'createShop', payload: parsedShops })
    }

    if (parsedProducts) {
      dispatch({ type: 'addProducts', payload: parsedProducts })
    }
  } catch (error) {
    console.log('Init App Error', error)
  }
}

export const logout = () => (dispatch: Idispatch) => {
  try {
    dispatch({ type: 'logout' })
  } catch (error) {
    console.log('Logout Error', error)
  }
}

export const signUpUser = (usersArray: signUpFormDataType[]) => (dispatch: Idispatch) => {
  try {
    if (usersArray.length) {
      localStorage.setItem("Users", JSON.stringify(usersArray));
      dispatch({ type: 'signupUser', payload: usersArray })
    }

  } catch (error) {
    console.log('Signup Error', error)
  }
}

export const signInUser = (currentUser: currentUserType) => (dispatch: Idispatch) => {
  try {
    if (currentUser) {
      localStorage.setItem("Current-User", JSON.stringify(currentUser));
      dispatch({ type: 'signinUser', payload: currentUser })
    }

  } catch (error) {
    console.log('Signup Error', error)
  }
}

export const createShop = (shopDetails: createShopTypes) => (dispatch: Idispatch, getData: () => RootState) => {
  try {
    if (shopDetails) {
      const oldShops: shopsType[] = getData().app.shops;
      if (oldShops.length) {
        const lastShopId = oldShops[oldShops.length - 1].ShopId
        oldShops.push({ ...shopDetails, ShopId: lastShopId as number + 1 })
        localStorage.setItem("Shops", JSON.stringify(oldShops));
        dispatch({ type: 'createShop', payload: oldShops })
      } else {
        localStorage.setItem("Shops", JSON.stringify([{ ...shopDetails, ShopId: 1 }]));
        dispatch({ type: 'createShop', payload: [{ ...shopDetails, ShopId: 1 }] })
      }
    }

  } catch (error) {
    console.log('Create Shop Error', error)
  }
}

export const addProduct = (productDetails: productsType) => (dispatch: Idispatch, getData: () => RootState) => {
  try {
    if (productDetails) {

      const oldProducts = getData().app.products;

      if (Object.keys(oldProducts).length) {
        oldProducts[productDetails.ShopId as number] =
          oldProducts[productDetails.ShopId as number] ?
            [...oldProducts[productDetails.ShopId as number], { ...productDetails, ProductId: generateRandomId() }]
            : [{ ...productDetails, ProductId: generateRandomId() }];
        localStorage.setItem('Products', JSON.stringify(oldProducts));
        dispatch({ type: 'addProducts', payload: oldProducts })
      } else {
        const productsList = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        productsList[productDetails.ShopId] = [{ ...productDetails, ProductId: generateRandomId() }]
        localStorage.setItem('Products', JSON.stringify(productsList))
        dispatch({ type: 'addProducts', payload: productsList })
      }
    }

  } catch (error) {
    console.log('Add Product Error', error)
  }
}

export const editProduct = (productDetails: productsType) => (dispatch: Idispatch, getData: () => RootState) => {
  try {
    if (productDetails) {

      const oldProducts = getData().app.products;

      if (Object.keys(oldProducts).length) {

        const productIndex = oldProducts[productDetails.ShopId as number]
          .findIndex((product: productsType) => product.ProductId === productDetails.ProductId)

        oldProducts[productDetails.ShopId as number][productIndex] = productDetails
        localStorage.setItem('Products', JSON.stringify(oldProducts));
        dispatch({ type: 'addProducts', payload: oldProducts })
      }
    }

  } catch (error) {
    console.log('Edit Product Error', error)
  }
}

export const deleteProduct = (shopId: number, productId: string) => (dispatch: Idispatch, getData: () => RootState) => {
  try {
    if (shopId && productId) {
      const oldProducts = getData().app.products;
      const removeProduct = oldProducts[shopId].filter((item: productsType) => item.ProductId !== productId);
      oldProducts[shopId] = removeProduct
      localStorage.setItem('Products', JSON.stringify(oldProducts))
      dispatch({ type: 'addProducts', payload: oldProducts })
      toast.success('Product Deleted Successfully...');
    }

  } catch (error) {
    console.log('Delete Product Error', error)
  }
}