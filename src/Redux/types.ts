/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUserType, productsType, shopsType } from "../Config/types";
import { createShopTypes } from "../Pages/CreaetShop";
import { signUpFormDataType } from "../Pages/Signup";
import { ThunkDispatch } from 'redux-thunk'

export interface ApplicationState {
  App: IappState
}

export interface productsStateType {
  [key: string]: productsType
}

export interface IappState {
  users: signUpFormDataType[];
  currentUser: currentUserType;
  shops: shopsType[];
  // products: productsType[];
  products: productsStateType
}

export type ApplicationAction = AppActions;

export type Idispatch = ThunkDispatch<ApplicationState, any, ApplicationAction>

export interface initApp {
  type: 'initApp';
}

export interface signUpUser {
  type: 'signupUser';
  payload: signUpFormDataType[]
}

export interface signinUser {
  type: 'signinUser';
  payload: currentUserType
}

export interface createShop {
  type: 'createShop';
  payload: createShopTypes[]
}

export interface addProducts {
  type: 'addProducts';
  payload: any
}

export interface logout {
  type: 'logout';
}


export type AppActions =
  | initApp
  | signUpUser
  | signinUser
  | createShop
  | addProducts
  | logout