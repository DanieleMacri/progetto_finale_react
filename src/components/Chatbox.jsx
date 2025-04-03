import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import RealtimeChat from "./RealtimeChat"
import supabase from "../supabase/supabase-client"


export default function Chatbox({ data }) {

    const { session } = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === 'string' && message.trim().length !== 0) {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message
                    }
                ])
                .select();
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    }
    return (
        <>
            <div>
                <h4 className="text-white mt-5 mb-3 display-6">Chat del gioco</h4>
            </div>
            <div className="col-12">
                <RealtimeChat data={data && data} />
            </div>
            <div>
                <form onSubmit={handleMessageSubmit}>
                    <fieldset role="group">
                        <input type="text" className="form-chat-custom py-1 ps-2" name="message" placeholder="Scrivi un messaggio..."></input> 
                        <button type="submit" className="button-chat-custom mt-3 py-1 pe-2">Invia</button>
                    </fieldset>
                </form>
            </div>
        </>
    )
}