import React from "react";

export const emailValidator = (email) => {
  email = email.trim();
  email = email.toLowerCase();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidator = (password) => {
  password = password.trim();

  password = password.replace(/\s+/g, "");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
  // const passwordRegex = /^(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // at least 1 lowercase, 1 uppercase, 1 numeric character, and be at least 8 characters long
  if (!passwordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
};
