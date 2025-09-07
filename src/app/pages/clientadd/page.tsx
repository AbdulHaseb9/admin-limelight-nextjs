"use client";

import React, { useState } from "react";

export default function ClientSignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const primary = "#32CD32"; // Theme color

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!form.username || !form.email || !form.password) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/Client/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage({ type: "error", text: data?.message || "Something went wrong" });
      } else {
        setMessage({ type: "success", text: data?.message || "Client created" });
        setForm({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Add Client</h1>

        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className= "space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Choose a password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white rounded-xl shadow-sm"
            style={{ background: primary }}
          >
            {loading ? "Creating..." : "Create Client"}
          </button>
        </form>
      </div>
    </div>
  );
}
