// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check user authentication on mount
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     if (token && userId) {
//       fetch(`/api/User/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data && !data.error) {
//             setUser(data);
//             setIsLoggedIn(true);
//           } else {
//             handleLogout();
//           }
//         })
//         .catch(() => handleLogout());
//     }
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     setUser(null);
//     setIsLoggedIn(false);
//     // Redirect to login page (or any other page)
//     window.location.href = "/login";
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
