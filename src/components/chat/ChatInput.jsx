import { Icon } from "@/components/ui/Icon";

export function ChatInput({
  isLoading = false,
  onSubmit,
  onValueChange,
  placeholder = "Ask me anything or paste a research link...",
  value,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const nextValue = value.trim();

    if (!nextValue || isLoading) {
      return;
    }

    onSubmit?.(nextValue);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    const nextValue = value.trim();

    if (!nextValue || isLoading) {
      return;
    }

    onSubmit?.(nextValue);
  };

  return (
    <div className="chat-input-shell">
      <div className="chat-input-glow" />
      <form
        aria-describedby="chat-input-hint"
        className="chat-input-form"
        onSubmit={handleSubmit}
      >
        <Icon className="chat-input-icon" name="search" />
        <label className="sr-only" htmlFor="chat-input">
          Message VoyageAI
        </label>
        <textarea
          className="chat-input-field"
          id="chat-input"
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          value={value}
        />
        <button
          aria-label="Send message"
          className="chat-input-submit"
          disabled={isLoading || value.trim().length === 0}
          type="submit"
        >
          <Icon name="arrow_forward" />
        </button>
      </form>
      <p className="sr-only" id="chat-input-hint">
        Press Enter to send. Press Shift plus Enter for a new line.
      </p>
    </div>
  );
}
