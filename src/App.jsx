// import "bootstrap/dist/css/bootstrap.min.css";
// import Routing from "./routes/Routing";
// import SessionProvider from "./context/SessionProvider";

// function App() {
//   return (
//     <>
//       <SessionProvider>
//         <Routing />
//       </SessionProvider>
//     </>
//   );
// }

// export default App;

import Routing from "./routes/Routing";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";

export default function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}