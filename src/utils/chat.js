export function generateConversationTitle(prompt) {
  const normalizedPrompt = prompt.replace(/\s+/g, " ").trim();

  if (!normalizedPrompt) {
    return "New Chat";
  }

  return normalizedPrompt.slice(0, 48);
}

export function createChatMessage(role, content) {
  return {
    id: `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}
