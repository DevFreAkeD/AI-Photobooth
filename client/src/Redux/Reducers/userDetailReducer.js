import { USER_DETAIL, USER_IMAGE } from "../Actions/Types";

// Defining Initial State
const initialState = {
  userDetailList: {},
};

// Defining Reducer Function
export const userDetailState = (state = initialState, action) => {
  // Destructuring Action
  const { type, payload } = action;

  switch (type) {
    // Add USER_DETAIL Case
    case USER_DETAIL: {
      return {
        ...state,
        userDetailList: {
          ...payload,
        },
      };
    }

    // Default Case
    default: {
      return state;
    }
  }
};
