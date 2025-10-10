// src/api/chatApi.js

const API_URL = "http://127.0.0.1:8000/api/chat";

export async function suggestInfluencers(company) {
  const res = await fetch(`${API_URL}/suggest_influencers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(company),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export async function generateMessage(company, influencer) {
  const res = await fetch(`${API_URL}/generate_message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company, influencer }),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export async function sendMessage(to_contact, subject, body) {
  const res = await fetch(`${API_URL}/send_message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to_contact, subject, body }),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
