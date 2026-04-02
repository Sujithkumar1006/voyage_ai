"use client";

import { ChatPanel } from "@/components/chat/ChatPanel";
import { defaultSuggestions } from "@/constants/chat";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  const conversationState = useConversations({
    initialActiveConversationId: null,
    initialConversations: [],
  });

  const {
    activeConversation,
    activeConversationId,
    appendMessage,
    clearHistory,
    conversations: storedConversations,
    createConversation,
    isHydrated,
    setActiveConversationId,
  } = conversationState;

  const chatState = useChat({
    activeConversation,
    activeConversationId,
    appendMessage,
    createConversation,
  });

  const {
    errorMessage,
    inputValue,
    isLoading,
    resetDraft,
    setInputValue,
    submitMessage,
  } = chatState;

  const handleNewChat = () => {
    resetDraft();
    createConversation();
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeConversationId={activeConversationId}
        conversations={storedConversations}
        onClearHistory={clearHistory}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />
      <main className="app-main">
        {!isHydrated ? null : (
          <ChatPanel
            conversation={activeConversation}
            errorMessage={errorMessage}
            inputValue={inputValue}
            isLoading={isLoading}
            onSubmit={submitMessage}
            onSuggestionSelect={setInputValue}
            onValueChange={setInputValue}
            suggestions={defaultSuggestions}
          />
        )}
      </main>
    </div>
  );
}
