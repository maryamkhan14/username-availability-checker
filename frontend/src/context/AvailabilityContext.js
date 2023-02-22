import { createContext, useReducer } from "react";
export const AvailabilityContext = createContext();

export const usernameAvailabilityReducer = (state, action) => {
  switch (action.type) {
    case "SET_TWITTER_DATA":
      return {
        ...state,
        results: { ...state.results, twitterData: action.payload },
      };
    case "SET_TWITCH_DATA":
      return {
        ...state,
        results: { ...state.results, twitchData: action.payload },
      };
    case "SET_REDDIT_DATA":
      return {
        ...state,
        results: { ...state.results, redditData: action.payload },
      };
    case "SET_TIKTOK_DATA":
      return {
        ...state,
        results: { ...state.results, tiktokData: action.payload },
      };
    case "SET_SSE_ERROR":
      return {
        ...state,
        errors: { ...state.errors, sseError: action.payload },
      };

    case "SET_INPUT_ERROR":
      return {
        ...state,
        errors: { ...state.errors, inputError: action.payload },
      };
    case "SET_SEARCH_ACTIVE":
      return { ...state, searchActive: action.payload };
    case "SET_SEARCH_INACTIVE":
      return { ...state, searchActive: action.payload };
    default:
      return state;
  }
};

export const AvailabilityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usernameAvailabilityReducer, {
    results: {},
    searchActive: false,
    errors: {},
  });
  return (
    <AvailabilityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AvailabilityContext.Provider>
  );
};
