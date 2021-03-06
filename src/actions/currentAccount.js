import { clearFoodtrucks } from "../reducers/foodtruckReducer";
import { getAllFoodtrucks } from "./foodTruck";
import { resetLoginForm } from "./handleLoginForm";
import { resetSignupForm } from "./handleSignupForm";

export const setCurrentAccount = (account) => {
  return {
    type: "SET_CURRENT_ACCOUNT",
    action: account,
  };
};

export const clearCurrentAccount = () => {
  return {
    type: "CLEAR_CURRENT_ACCOUNT",
  };
};

export const login = (credentials, history) => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          dispatch(setCurrentAccount(response.account));
          dispatch(getAllFoodtrucks(response.account.id));

          dispatch(resetLoginForm());

          alert("You have logged in successfully.");
          history.push("/");
        }
      })
      .catch(console.log);
  };
};

export const signup = (credentials, history) => {
  return (dispatch) => {
    const accountInfo = {
      account: credentials,
    };
    return fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountInfo),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          dispatch(setCurrentAccount(response.account));
          dispatch(resetSignupForm());
          alert("account created successfuly.");
          history.push("/login");
        }
      })
      .catch(console.log);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(clearCurrentAccount());
    dispatch(clearFoodtrucks());
    return fetch("http://localhost:3000/api/v1/logout", {
      method: "DELETE",
    });
  };
};

export const getCurrentAccount = () => {
  return (dispatch, getState) => {
    return fetch("http://localhost:3000/api/v1/get_current_account", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.account);
          dispatch(getAllFoodtrucks(response.account.id));
          if (
            response.loggedIn &&
            getState().currentAccount.loggedIn === false
          ) {
            dispatch(setCurrentAccount(response.account));
            dispatch(getAllFoodtrucks(response.account.id));
          }
        }
      })
      .catch(console.log);
  };
};
