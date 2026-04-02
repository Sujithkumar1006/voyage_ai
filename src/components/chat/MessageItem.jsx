export function MessageItem({ role, content }) {
  const itemClassName = `message-item ${
    role === "user" ? "message-item-user" : "message-item-assistant"
  }`;

  return (
    <article className={itemClassName}>
      <p className="message-content">{content}</p>
    </article>
  );
}
