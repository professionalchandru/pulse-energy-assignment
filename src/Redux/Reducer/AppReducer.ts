import { AppActions, IappState } from "../types"

const AppState: IappState = {
  users: [],
  currentUser: {
    email: '',
    isLoggedIn: false,
    name: '',
    phone: '',
    rememberMe: false
  },
  shops: [],
  // products: [],

}

export const AppReducer = (state = AppState, action: AppActions) => {
  switch (action.type) {
    case 'signupUser':
      return { ...state, users: action.payload }
    case 'signinUser':
      return { ...state, currentUser: action.payload }
    case 'createShop':
      return { ...state, shops: action.payload }
    case 'logout':
      return {
        ...state,
        currentUser: {
          email: '',
          isLoggedIn: false,
          name: '',
          phone: '',
          rememberMe: false
        },
        shops: []
      }
    default:
      return state
  }
}