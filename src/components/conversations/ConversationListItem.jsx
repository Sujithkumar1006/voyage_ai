export function ConversationListItem({ title, isActive = false, onSelect }) {
  const itemClassName = `conversation-list-item ${
    isActive
      ? "conversation-list-item-active"
      : "conversation-list-item-inactive"
  }`;

  return (
    <button
      aria-current={isActive ? "page" : undefined}
      aria-pressed={isActive}
      className={itemClassName}
      onClick={onSelect}
      type="button"
    >
      <span className="conversation-list-item-title">{title}</span>
    </button>
  );
}
