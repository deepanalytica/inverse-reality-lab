export class PraxiosApiClient {
  constructor({ baseUrl, token = "" } = {}) {
    if (!baseUrl) throw new Error("PRAXIOS API base URL is required.");
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.token = token;
  }

  async request(path, { method = "GET", body = undefined } = {}) {
    const headers = { "accept": "application/json" };
    if (body !== undefined) headers["content-type"] = "application/json";
    if (this.token) headers["authorization"] = "Bearer " + this.token;

    const response = await fetch(this.baseUrl + path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store"
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.message || payload.error || ("HTTP " + response.status));
      error.status = response.status;
      error.payload = payload;
      throw error;
    }
    return payload;
  }

  health() {
    return this.request("/api/health");
  }

  providers() {
    return this.request("/api/providers");
  }

  orchestrate(body) {
    return this.request("/api/orchestrate", { method: "POST", body });
  }

  getSession(sessionId) {
    return this.request("/api/sessions/" + encodeURIComponent(sessionId));
  }

  authorize(sessionId, authorizationId, { approved, actor = "human", reason = "" } = {}) {
    return this.request(
      "/api/sessions/" + encodeURIComponent(sessionId) +
      "/authorizations/" + encodeURIComponent(authorizationId),
      {
        method: "POST",
        body: { approved, actor, reason }
      }
    );
  }

  execute(sessionId, { action, authorizationId, actor = "praxios" } = {}) {
    return this.request(
      "/api/sessions/" + encodeURIComponent(sessionId) + "/actions/execute",
      {
        method: "POST",
        body: { action, authorizationId, actor }
      }
    );
  }

  selectDecision(sessionId, packageId, { selectedOptionId, actor = "human", rationale = "" } = {}) {
    return this.request(
      "/api/sessions/" + encodeURIComponent(sessionId) +
      "/decisions/" + encodeURIComponent(packageId) + "/select",
      {
        method: "POST",
        body: { selectedOptionId, actor, rationale }
      }
    );
  }

  audit(sessionId) {
    return this.request("/api/sessions/" + encodeURIComponent(sessionId) + "/audit");
  }
}
