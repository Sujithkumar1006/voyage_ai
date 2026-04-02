import { ChatInput } from "@/components/chat/ChatInput";
import { Icon } from "@/components/ui/Icon";

export function EmptyChatState({
  errorMessage,
  inputValue,
  isLoading = false,
  onSubmit,
  onSuggestionSelect,
  onValueChange,
  suggestions,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-copy">
          <h2 className="empty-state-title">
            Focus your ideas with{" "}
            <span className="empty-state-highlight">VoyageAI</span>
          </h2>
          <p className="empty-state-description">
            Ask questions, refine drafts, summarize research, and work through
            complex ideas in one clean conversation space.
          </p>
        </div>

        <div className="empty-state-composer">
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

        {suggestions.length > 0 ? (
          <div className="suggestions-grid">
            {suggestions.map((suggestion) => (
              <button
                aria-label={`Use suggestion: ${suggestion.title}`}
                key={suggestion.title}
                className="suggestion-card"
                onClick={() => onSuggestionSelect?.(suggestion.description)}
                type="button"
              >
                <Icon className="suggestion-icon" name={suggestion.icon} />
                <span className="suggestion-title">{suggestion.title}</span>
                <span className="suggestion-description">
                  {suggestion.description}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
