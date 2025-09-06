"use client";

import { useEffect, useState } from "react";

type Client = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients/Signup");
      const data = await res.json();
      setClients(data?.clients || []);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/Client/${id}`, { method: "DELETE" });
    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Clients</h1>
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Join At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} className="text-center">
              <td className="border p-2">
                <img
                  src={client.avatar}
                  alt={client.username}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="border p-2">{client.username}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">
                {new Date(client.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2 space-x-2">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-gray-500">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
