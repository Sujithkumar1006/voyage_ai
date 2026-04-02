import { EmptyChatState } from "@/components/chat/EmptyChatState";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageList } from "@/components/chat/MessageList";

export function ChatPanel({
  conversation,
  errorMessage,
  inputValue,
  isLoading = false,
  onSubmit,
  onSuggestionSelect,
  onValueChange,
  suggestions,
}) {
  const shouldShowEmptyState =
    !conversation || conversation.messages.length === 0;

  return (
    <section className="chat-panel">
      {shouldShowEmptyState ? (
        <>
          <EmptyChatState
            errorMessage={errorMessage}
            inputValue={inputValue}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onSuggestionSelect={onSuggestionSelect}
            onValueChange={onValueChange}
            suggestions={suggestions}
          />
        </>
      ) : (
        <div className="chat-thread-shell">
          <div className="chat-thread-inner">
            <div className="chat-thread-body">
              <MessageList
                isLoading={isLoading}
                messages={conversation.messages}
              />
            </div>
            <div className="chat-thread-composer">
              <ChatInput
                isLoading={isLoading}
                onSubmit={onSubmit}
                onValueChange={onValueChange}
                value={inputValue}
              />
              {errorMessage ? (
                <p aria-live="polite" className="chat-error" role="status">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
