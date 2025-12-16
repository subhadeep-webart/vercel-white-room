export default function EmailTemplete({ name }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "#333" }}>Welcome, {name}! 👋</h2>
      <p style={{ color: "#555" }}>
        Thank you for joining our platform. This is a test email sent via{" "}
        <strong>Resend + Next.js</strong>.
      </p>
    </div>
  );
}
