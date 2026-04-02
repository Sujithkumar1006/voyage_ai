import { ConversationListItem } from "@/components/conversations/ConversationListItem";

export function ConversationList({
  items,
  activeConversationId,
  onSelectConversation,
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Conversation history" className="conversation-list">
      <div className="conversation-list-label-row">
        <span className="conversation-list-label">History</span>
      </div>

      {items.map((item) => (
        <ConversationListItem
          key={item.id}
          isActive={item.id === activeConversationId}
          onSelect={() => onSelectConversation?.(item.id)}
          title={item.title}
        />
      ))}
    </nav>
  );
}
