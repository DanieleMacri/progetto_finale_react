import { article, sup } from "framer-motion/client";
import { useRef, useCallback, useEffect, useState, } from "react"
import supabase from "../supabase/supabase-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


const chatContainer = {
    marginTop: '5px',
    padding: '0px 3px',
    width: '100%',
    minHeight: '50vh',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#1b1b1f',
    overFlowY: 'scroll'
}

dayjs.extend(relativeTime);



export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from('messages')
            .select()
            .eq('game_id', data?.id);
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        const channel = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                },
                () => getInitialMessages()
            )
            .subscribe();
        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    // console.log(messages.profile_username);
    

    return (
        <div className="chat-custom" style={chatContainer} ref={messageRef}>
            {loadingInitial && <progress></progress>}
            {error && <div>{error}</div>}
            {messages &&
                messages.map((message) => (
                    <article className="" key={message.id}>
                        <p className="text-white my-2">{message.profile_username}</p>
                        <small className="text-white">{message.content}</small>
                        <p className="text-white border-bottom">{dayjs().to(dayjs(message.created_at))}</p>
                    </article>
                ))}

        </div>
    )
}