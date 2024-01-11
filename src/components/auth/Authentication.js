import { Outlet } from "react-router-dom";

import "../../App.css";

/**
 * Represents the authentication layout component.
 * @returns {JSX.Element} The rendered Authentication component.
 */
const Authentication = () => {
  return (
    <>
      {/* Background Image */}
      <div
        className={`w-full h-screen bg-bgImage absolute -z-10 bg-cover bg-center brightness-[.3] bg-no-repeat`}
      />
      <main
        className={`w-full main h-screen relative grid justify-center content-center`}
      >
        <section
          className={`relative font-semibold text-white grid justify-center content-center p-0`}
        >
          {/* Render child routes */}
          <Outlet />
        </section>
        {/* Additional sections or components can be added here */}
      </main>
    </>
  );
};

export default Authentication;
