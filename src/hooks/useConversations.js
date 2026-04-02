"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateConversationTitle } from "@/utils/chat";

const CONVERSATIONS_KEY = "voyage-ai.v2.conversations";
const ACTIVE_CONVERSATION_KEY = "voyage-ai.v2.active-conversation-id";

export function useConversations({
  initialActiveConversationId,
  initialConversations,
}) {
  const { value: conversations, setValue: setConversations } = useLocalStorage(
    CONVERSATIONS_KEY,
    initialConversations
  );

  const {
    isHydrated,
    value: activeConversationId,
    setValue: setActiveConversationId,
  } = useLocalStorage(ACTIVE_CONVERSATION_KEY, initialActiveConversationId);

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId
      ) ?? null,
    [activeConversationId, conversations]
  );

  const createConversation = (initialMessage) => {
    const timestamp = new Date().toISOString();
    const newConversation = {
      id: `conversation-${Date.now()}`,
      title: initialMessage
        ? generateConversationTitle(initialMessage.content)
        : "New Chat",
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: initialMessage ? [initialMessage] : [],
    };

    setConversations((currentConversations) => [
      newConversation,
      ...currentConversations,
    ]);
    setActiveConversationId(newConversation.id);

    return newConversation.id;
  };

  const appendMessage = (conversationId, message) => {
    setConversations((currentConversations) =>
      currentConversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        const nextMessages = [...conversation.messages, message];
        const shouldUpdateTitle = conversation.messages.length === 0;

        return {
          ...conversation,
          messages: nextMessages,
          title: shouldUpdateTitle
            ? generateConversationTitle(message.content)
            : conversation.title,
          updatedAt: message.createdAt,
        };
      })
    );
  };

  const clearHistory = () => {
    setConversations([]);
    setActiveConversationId(null);
  };

  return {
    activeConversation,
    activeConversationId,
    appendMessage,
    clearHistory,
    conversations,
    createConversation,
    isHydrated,
    setActiveConversationId,
  };
}
