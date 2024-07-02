// store.js
import { configureStore } from '@reduxjs/toolkit';

// Define your initial state
const initialState = {
  imageData: '/images/im2.jpg',
  userData: {
    penName: '',
    email: '',
    backgroundImage:'',
    description:''
  },
  title: '',
  routineType: '',
  genre: '',
  writingStyle: '',
  selectedRoutine: null,
  signupSuccess: false,
  addIconStates: {},
  episodeCount: 0,
};

// Define your reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_IMAGE':
      return { ...state, imageData: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    
    case 'SAVE_DATA':
        return {
          ...state,
          ...action.payload,
        };
        case 'UPDATE_EPISODE_COUNT':
      return { ...state, episodeCount: action.payload };
        case "SET_SELECTED_ROUTINE":
          return { ...state, selectedRoutine: action.payload };

          case "SET_SIGNUP_SUCCESS":
          
      return {
        ...state,
        signupSuccess: action.payload,
      };
      
    
    default:
      return state;
  }
};

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
});

export default store;
