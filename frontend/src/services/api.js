const API_BASE = 'http://127.0.0.1:8000';

async function handleResponse(res) {
  if (!res.ok) {
    let errorDetail = `Request failed with status ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      }
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }
  return res.json();
}

export const api = {
  // System Health
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  },

  // Epic 2: Safety Analysis
  async analyzeSafety(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/api/safety/analyze`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(res);
  },

  async getSafetySample() {
    const res = await fetch(`${API_BASE}/api/safety/sample`);
    return handleResponse(res);
  },

  // Epic 2: Crack Detection
  async detectCrack(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/api/crack/detect`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(res);
  },

  async getCrackSample() {
    const res = await fetch(`${API_BASE}/api/crack/sample`);
    return handleResponse(res);
  },

  // Epic 3: Planning
  async generatePlan(payload) {
    const res = await fetch(`${API_BASE}/api/planning/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getPlanTemplates() {
    const res = await fetch(`${API_BASE}/api/planning/templates`);
    return handleResponse(res);
  },

  // Epic 3: Valuation
  async calculateValuation(payload) {
    const res = await fetch(`${API_BASE}/api/valuation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getValuationTiers() {
    const res = await fetch(`${API_BASE}/api/valuation/tiers`);
    return handleResponse(res);
  },

  // Epic 5: Weather Advisory
  async getWeatherAdvisory(payload) {
    const res = await fetch(`${API_BASE}/api/weather/advisory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getWeatherPresets() {
    const res = await fetch(`${API_BASE}/api/weather/presets`);
    return handleResponse(res);
  },

  // Epic 5: Chatbot & Daily Log
  async sendChatMessage(message, topic = 'general') {
    const res = await fetch(`${API_BASE}/api/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, topic }),
    });
    return handleResponse(res);
  },

  async analyzeSiteLog(payload) {
    const res = await fetch(`${API_BASE}/api/site-log/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getSampleSiteLog() {
    const res = await fetch(`${API_BASE}/api/site-log/sample`);
    return handleResponse(res);
  },
};
