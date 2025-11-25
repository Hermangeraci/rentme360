import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: qui in futuro collegheremo l'autenticazione reale
    alert("Login eseguito (placeholder).");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        fontFamily: "sans-serif",
        padding: "16px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "360px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "4px",
            textAlign: "center",
          }}
        >
          RentMe360
        </h1>
        <p
          style={{
            fontSize: "12px",
            color: "#666",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Accedi al gestionale per continuare.
        </p>

        <label
          htmlFor="email"
          style={{ fontSize: "12px", fontWeight: 500, display: "block" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            margin: "4px 0 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "13px",
          }}
        />

        <label
          htmlFor="password"
          style={{ fontSize: "12px", fontWeight: 500, display: "block" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            margin: "4px 0 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "13px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Accedi
        </button>

        <p
          style={{
            fontSize: "10px",
            color: "#999",
            marginTop: "12px",
            textAlign: "center",
          }}
        >
          Schermata di login demo – l&apos;autenticazione reale sarà aggiunta in
          seguito.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
