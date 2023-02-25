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
    case "RESET_ERRORS":
      return {
        ...state,
        errors: {},
      };
    case "RESET_RESULTS":
      return {
        ...state,
        results: {
          twitterData: { type: "TWITTER_DATA" },
          twitchData: { type: "TWITCH_DATA" },
          tiktokData: { type: "TIKTOK_DATA" },
          redditData: { type: "REDDIT_DATA" },
        },
      };
    case "SET_ACTIVE_SEARCH":
      return { ...state, searchActive: action.payload };
    default:
      return state;
  }
};

export const AvailabilityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usernameAvailabilityReducer, {
    results: {
      twitterData: { type: "TWITTER_DATA" },
      twitchData: { type: "TWITCH_DATA" },
      redditData: { type: "REDDIT_DATA" },
      tiktokData: { type: "TIKTOK_DATA" },
    },
    searchActive: false,
    errors: {},
  });
  return (
    <AvailabilityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AvailabilityContext.Provider>
  );
};
