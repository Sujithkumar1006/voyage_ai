"use client";

import { useState } from "react";
import { requestAssistantMessage } from "@/services/chatService";
import { createChatMessage } from "@/utils/chat";

export function useChat({
  activeConversation,
  activeConversationId,
  appendMessage,
  createConversation,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const resetDraft = () => {
    setErrorMessage(null);
    setInputValue("");
  };

  const submitMessage = async (value) => {
    if (isLoading) {
      return;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    setErrorMessage(null);
    setInputValue("");

    const userMessage = createChatMessage("user", trimmedValue);

    const conversationId =
      activeConversationId && activeConversation
        ? activeConversationId
        : createConversation(userMessage);

    if (activeConversationId && activeConversation) {
      appendMessage(activeConversationId, userMessage);
    }

    setIsLoading(true);

    try {
      const { message } = await requestAssistantMessage({
        message: userMessage,
      });
      const assistantMessage = createChatMessage("assistant", message);

      appendMessage(conversationId, assistantMessage);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not generate a response right now. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMessage,
    inputValue,
    isLoading,
    resetDraft,
    setInputValue,
    submitMessage,
  };
}
