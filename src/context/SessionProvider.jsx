// import { useState, useEffect } from "react";
// import SessionContext from "./SessionContext";
// import supabase from "../supabase/supabase-client";

// export default function SessionProvider({ children }) {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_OUT") {
//         setSession(null);
//       } else if (session) {
//         setSession(session);
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);
  
  
//   return (
//     <SessionContext.Provider
//       value={{
//         session,
//       }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }

// import { useState, useEffect } from "react";
// import SessionContext from "./SessionContext";
// import supabase from "../supabase/supabase-client";

// export default function SessionProvider({ children }) {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     // Recupera la sessione iniziale all'avvio
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     // Ascolta i cambiamenti della sessione
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <SessionContext.Provider value={{ session }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }

import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  // ✅ Compara due sessioni
  const isSameSession = (a, b) => {
    if (!a || !b) return false;
    return (
      a.access_token === b.access_token &&
      a.refresh_token === b.refresh_token &&
      a.expires_at === b.expires_at
    );
  };

  useEffect(() => {
    let isMounted = true;

    const syncSession = (newSession) => {
      setSession((prevSession) => {
        if (!isSameSession(prevSession, newSession)) {
          console.log("🔄 Session aggiornata:", newSession);
          return newSession;
        } else {
          console.log("✅ Session identica, non aggiorno");
          return prevSession;
        }
      });
    };

    // ✅ Recupera la sessione iniziale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        console.log("✅ Initial session:", session);
        syncSession(session);
      }
    });

    // ✅ Listener di login/logout/refresh
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("📢 Auth event:", event);
      syncSession(session);
    });

    return () => {
      isMounted = false;
      subscription.subscription?.unsubscribe();
    };
  }, []); // ✅ Solo all'avvio

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}


