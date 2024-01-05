/* eslint-disable react/prop-types */
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
const cityContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  city: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return { ...state, isLoading: false, city: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,

        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        city: [...state.city, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        city: state.city.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
function CityContexProvider({ children }) {
  // const [city, setCity] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ city, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCity() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCity();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    },
    [currentCity.id]
  );
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting cities...",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating cities...",
      });
    }
  }

  return (
    <>
      <cityContext.Provider
        value={{
          city,
          isLoading,
          getCity,
          createCity,
          deleteCity,
          currentCity,
        }}
      >
        {children}
      </cityContext.Provider>
    </>
  );
}
function useCities() {
  const context = useContext(cityContext);
  if (context === undefined)
    throw new Error("CitiesContex was used outside the cityProvider...");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityContexProvider, useCities };
