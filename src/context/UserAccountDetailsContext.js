import { createContext, useState } from "react";

const UserAccountDetailsContext = createContext(null);

export const UserAccountDetailsProvider = ({ children }) => {
  const [userAccountDetails, setUserAccountDetails] = useState(0);

  return (
    <UserAccountDetailsContext.Provider
      value={{ userAccountDetails, setUserAccountDetails }}
    >
      {children}
    </UserAccountDetailsContext.Provider>
  );
};

export default UserAccountDetailsContext;
