export async function requestAssistantMessage(payload) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      "error" in data && data.error
        ? data.error
        : "Could not generate a response.";

    throw new Error(errorMessage);
  }

  if (!("message" in data) || typeof data.message !== "string") {
    throw new Error("The server returned an invalid response.");
  }

  return data;
}
