import Image from "next/image";
import { ConversationList } from "@/components/conversations/ConversationList";
import { Icon } from "@/components/ui/Icon";

export function Sidebar({
  conversations,
  activeConversationId,
  onClearHistory,
  onNewChat,
  onSelectConversation,
}) {
  const hasHistory = conversations.length > 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-shell">
          <Image
            alt="VoyageAI"
            className="sidebar-logo"
            height={24}
            src="/icon.svg"
            width={24}
          />
        </div>
        <div>
          <h1 className="sidebar-title">VoyageAI</h1>
          <p className="sidebar-subtitle">Active Intelligence</p>
        </div>
      </div>

      <button
        aria-label="Start a new chat"
        className="sidebar-new-chat"
        onClick={onNewChat}
        type="button"
      >
        <Icon name="add" />
        <span>New Chat</span>
      </button>

      <ConversationList
        activeConversationId={activeConversationId}
        items={conversations}
        onSelectConversation={onSelectConversation}
      />

      <div className="sidebar-footer">
        {hasHistory ? (
          <button
            aria-label="Clear chat history"
            className="sidebar-secondary-button"
            onClick={onClearHistory}
            type="button"
          >
            <Icon className="sidebar-secondary-icon" name="delete" />
            <span className="sidebar-secondary-label">Clear History</span>
          </button>
        ) : null}
        <button
          aria-label="Account"
          className="sidebar-secondary-button"
          type="button"
        >
          <Icon className="sidebar-secondary-icon" name="person" />
          <span className="sidebar-secondary-label">Account</span>
        </button>
      </div>
    </aside>
  );
}
