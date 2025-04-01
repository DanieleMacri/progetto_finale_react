import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

export default function AccountPage() {

    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore
        const getProfile = async () => {
            setLoading(true);
            if (!session) return;
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name, avatar_url')
                .eq('id', user?.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.log(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        };

        getProfile();

        return () => {
            ignore = true;
        }
    }, [session])

    const updateProfile = async (event) => {
        event.preventDefault();

        setLoading(true);
        const { user } = session

        const updates = {
            id: user.id,
            username: username,
            first_name: firstName,
            last_name: lastName,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }



        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false);
    }



    return (
        <>
        <div className="main-custom pb-5">

            <div className="container-fluid main-custom d-flex justify-content-center py-5">
                <h2 className="text-white">Impostazioni profilo</h2>
            </div>
            <div className="d-flex justify-content-center vh-100 container-fluid col-11 col-md-6 d-flex justify-content-center container-form-custom ">
                <form onSubmit={updateProfile} className="d-flex flex-column justify-content-center">
                    <Avatar
                        url={avatarUrl}
                        size={150}
                        onUpload={(event, url) => {
                            updateProfile(event, url);
                        }} />
                    <div className="d-flex flex-column justify-content-center">
                        <label htmlFor="email" className="text-white mt-3 mb-2">Email</label>
                        <input
                            className="rounded-3"
                            id="email"
                            type="text"
                            value={session?.user?.email || ""}
                            disabled />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <label htmlFor="username" className="text-white mt-3 mb-2">Username</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="username"
                            required
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <label htmlFor="first_name" className="text-white mt-3 mb-2">Nome</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="first_name"
                            value={firstName || ""}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <label htmlFor="last_name" className="text-white mt-3 mb-2">Cognome</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="last_name"
                            value={lastName || ""}
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="d-flex flex-column justify-content-center">
                        <button
                            className="button-custom-login-register rounded-3 mt-3 mb-2 "
                            type="submit"
                            disabled={loading}>
                            {loading ? 'Salvando...' : 'Salva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>


        </>
    );
}

// import { useState, useEffect, useContext } from "react";
// import supabase from "../../supabase/supabase-client";
// import SessionContext from "../../context/SessionContext";
// import Avatar from "../../components/Avatar";

// export default function AccountPage() {
//     const { session } = useContext(SessionContext);

//     const [loading, setLoading] = useState(true);
//     const [username, setUsername] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [avatarUrl, setAvatarUrl] = useState("");

//     // useEffect(() => {
//     //     let ignore = false;
//     //     const getProfile = async () => {
//     //         setLoading(true);
//     //         if (!session) return;
//     //         const { user } = session;

//     //         const { data, error } = await supabase
//     //             .from("profiles")
//     //             .select("username, first_name, last_name, avatar_url")
//     //             .eq("id", user?.id)
//     //             .single();

//     //         if (!ignore) {
//     //             if (error) {
//     //                 console.log(error);
//     //             } else if (data) {
//     //                 setUsername(data.username);
//     //                 setFirstName(data.first_name);
//     //                 setLastName(data.last_name);
//     //                 setAvatarUrl(data.avatar_url);
//     //             }
//     //         }

//     //         setLoading(false);
//     //     };

//     //     getProfile();

//     //     return () => {
//     //         ignore = true;
//     //     };
//     // }, [session]);

//     useEffect(() => {
//         let ignore = false;
    
//         const getProfile = async () => {
//             if (!session || !session.user) return; // 🔥 Evita errori se session è null
//             setLoading(true);
    
//             const { user } = session;
    
//             const { data, error } = await supabase
//                 .from("profiles")
//                 .select("username, first_name, last_name, avatar_url")
//                 .eq("id", user.id)
//                 .single();
    
//             if (!ignore) {
//                 if (error) {
//                     console.log(error);
//                 } else if (data) {
//                     setUsername(data.username || "");
//                     setFirstName(data.first_name || "");
//                     setLastName(data.last_name || "");
//                     setAvatarUrl(data.avatar_url || "");
//                 }
//             }
    
//             setLoading(false);
//         };
    
//         getProfile();
    
//         return () => {
//             ignore = true;
//         };
//     }, [session]);

//     // const updateProfile = async (event) => {
//     //     event.preventDefault();
//     //     setLoading(true);

//     //     const { user } = session;

//     //     const updates = {
//     //         id: user.id,
//     //         username: username,
//     //         first_name: firstName,
//     //         last_name: lastName,
//     //         avatar_url: avatarUrl,
//     //         updated_at: new Date(),
//     //     };

//     //     const { error } = await supabase.from("profiles").upsert(updates);

//     //     if (error) {
//     //         alert(error.message);
//     //     } else {
//     //         setAvatarUrl(avatarUrl);
//     //     }

//     //     setLoading(false); // Ora è correttamente dentro la funzione
//     // };

//     // const updateProfile = async (event) => {
//     //     event.preventDefault();
//     //     setLoading(true);

//     //     try {
//     //         const { user } = session;

//     //         const updates = {
//     //             id: user.id,
//     //             username,
//     //             first_name: firstName,
//     //             last_name: lastName,
//     //             avatar_url: avatarUrl,
//     //             updated_at: new Date(),
//     //         };

//     //         const { error } = await supabase.from("profiles").upsert(updates);

//     //         if (error) {
//     //             throw new Error(error.message);
//     //         }
//     //     } catch (error) {
//     //         alert("Errore: " + error.message);
//     //     } finally {
//     //         setLoading(false); // Ora si esegue SEMPRE, anche in caso di errore
//     //     }
//     // };

//     const updateProfile = async (event) => {
//         event.preventDefault();
        
//         if (!session || !session.user) {  // 🔥 Verifica se session è null prima di procedere
//             alert("Sessione non valida. Effettua nuovamente il login.");
//             return;
//         }
    
//         setLoading(true);
    
//         try {
//             const { user } = session;
    
//             const updates = {
//                 id: user.id,
//                 username,
//                 first_name: firstName,
//                 last_name: lastName,
//                 avatar_url: avatarUrl,
//                 updated_at: new Date(),
//             };
    
//             const { error } = await supabase.from("profiles").upsert(updates);
    
//             if (error) {
//                 throw new Error(error.message);
//             }
//         } catch (error) {
//             alert("Errore: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <div className="container-fluid main-custom d-flex justify-content-center py-5">
//                 <h2 className="text-white">Impostazioni profilo</h2>
//             </div>
//             <div className="d-flex justify-content-center main-custom vh-100">
//                 <form onSubmit={updateProfile} className="d-flex flex-column justify-content-center">
//                     {/* <Avatar
//                         url={avatarUrl}
//                         size={150}
//                         onUpload={(event, url) => {
//                             updateProfile(event, url);
//                         }}
//                     /> */}
//                     <Avatar
//                         url={avatarUrl}
//                         size={150}
//                         onUpload={(event, url) => {
//                             if (!url) return; // Evita aggiornamenti con URL vuoto
//                             setAvatarUrl(url); // Aggiorna lo stato dell'avatar
//                             updateProfile(event); // Aggiorna il profilo
//                         }}
//                     />
//                     <div className="d-flex flex-column justify-content-center">
//                         <label htmlFor="email" className="text-white mt-3 mb-2">Email</label>
//                         <input id="email" type="text" value={session?.user?.email || ""} disabled />
//                     </div>
//                     <div className="d-flex flex-column justify-content-center">
//                         <label htmlFor="username" className="text-white">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             required
//                             value={username || ""}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className="d-flex flex-column justify-content-center">
//                         <label htmlFor="first_name" className="text-white">Nome</label>
//                         <input
//                             type="text"
//                             id="first_name"
//                             value={firstName || ""}
//                             onChange={(e) => setFirstName(e.target.value)}
//                         />
//                     </div>
//                     <div className="d-flex flex-column justify-content-center">
//                         <label htmlFor="last_name" className="text-white">Cognome</label>
//                         <input
//                             type="text"
//                             id="last_name"
//                             value={lastName || ""}
//                             onChange={(e) => setLastName(e.target.value)}
//                         />
//                     </div>

//                     <div className="d-flex flex-column justify-content-center">
//                         <button type="submit" >
//                             {loading ? "Salvando..." : "Salva"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }
