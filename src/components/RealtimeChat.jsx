import { useRef, useCallback, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const chatContainer = {
    marginTop: "5px",
    padding: "0px 3px",
    width: "100%",
    minHeight: "50vh",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#1b1b1f",
    overflowY: "scroll",
};

dayjs.extend(relativeTime);

export default function RealtimeChat({ data, messages, setMessages }) {
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    };

    const getInitialMessages = useCallback(async () => {
        if (!data?.id) return;
        setLoadingInitial(true);
        const { data: initialMessages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", data.id);

        if (error) {
            setError(error.message);
            setLoadingInitial(false);
            return;
        }
        setLoadingInitial(false);
        setMessages(initialMessages || []);
    }, [data?.id, setMessages]);

    useEffect(() => {
        if (data?.id) {
            getInitialMessages();
        }

        const channel = supabase
            .channel(`messages-${data?.id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `game_id=eq.${data?.id}`,
                },
                (payload) => {
                    if (!payload.new || !payload.new.content) return;

                    setMessages((prev) => {
                        const alreadyExists = prev.some(
                            (msg) =>
                                msg.created_at === payload.new.created_at &&
                                msg.profile_id === payload.new.profile_id
                        );
                        if (alreadyExists) return prev;
                        return [...prev, payload.new];
                    });
                }
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [data?.id, getInitialMessages, setMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div className="chat-custom" style={chatContainer} ref={messageRef}>
            {loadingInitial && <progress></progress>}
            {error && <div>{error}</div>}
            {messages &&
                messages.map((message, index) => (
                    <article
                        className=""
                        key={message.id || `${message.created_at}-${index}`}
                    >
                        <p className="text-white my-2">{message.profile_username}</p>
                        <small className="text-white">{message.content}</small>
                        <p className="text-white border-bottom">
                            {dayjs().to(dayjs(message.created_at))}
                        </p>
                    </article>
                ))}
        </div>
    );
}