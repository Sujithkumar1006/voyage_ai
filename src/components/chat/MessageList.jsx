import { useEffect, useRef } from "react";
import { MessageItem } from "@/components/chat/MessageItem";

export function MessageList({ isLoading = false, messages }) {
  const bottomRef = useRef(null);
  const hasScrolledInitially = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: hasScrolledInitially.current ? "smooth" : "auto",
      block: "end",
    });
    hasScrolledInitially.current = true;
  }, [isLoading, messages]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading ? (
        <MessageItem content="VoyageAI is thinking..." role="assistant" />
      ) : null}
      <div className="message-list-anchor" ref={bottomRef} />
    </div>
  );
}
