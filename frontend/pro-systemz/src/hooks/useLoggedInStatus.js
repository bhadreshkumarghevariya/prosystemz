import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";

const useLoggedInStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, loading, error } = useQuery(GET_USER_DETAILS);

  useEffect(() => {
    console.log(data);
    if (data && data.getUserDetails) {
      console.log("setting is logged in to true");
      console.log(data.getUserDetails);
      setIsLoggedIn(true);
      //if logged in set cartId to cookies
    }
    return () => {
      setIsLoggedIn(false);
    };
  }, [data]);

  return { isLoggedIn, data };
};

export default useLoggedInStatus;
