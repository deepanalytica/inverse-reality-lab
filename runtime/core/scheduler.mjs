export class TaskScheduler {
  constructor() {
    this.tasks = new Map();
  }

  add(task) {
    if (!task || !task.id) throw new Error("Task requires id.");
    if (this.tasks.has(task.id)) throw new Error("Duplicate task id: " + task.id);
    const normalized = {
      id: task.id,
      title: task.title || task.id,
      role: task.role || "worker",
      provider: task.provider || "fixture",
      model: task.model || null,
      input: task.input || "",
      dependsOn: Array.from(new Set(task.dependsOn || [])),
      status: "QUEUED",
      output: null,
      error: null,
      metadata: task.metadata || {}
    };
    this.tasks.set(normalized.id, normalized);
    return normalized;
  }

  get(id) {
    return this.tasks.get(id) || null;
  }

  list() {
    return Array.from(this.tasks.values()).map(t => ({ ...t }));
  }

  ready() {
    return Array.from(this.tasks.values()).filter(task => {
      if (task.status !== "QUEUED") return false;
      return task.dependsOn.every(dep => this.tasks.get(dep)?.status === "COMPLETED");
    });
  }

  blockedByFailure() {
    return Array.from(this.tasks.values()).filter(task => {
      if (task.status !== "QUEUED") return false;
      return task.dependsOn.some(dep => ["FAILED", "BLOCKED"].includes(this.tasks.get(dep)?.status));
    });
  }

  async run(executor, hooks = {}) {
    const results = [];
    while (true) {
      const blocked = this.blockedByFailure();
      for (const task of blocked) {
        task.status = "BLOCKED";
        task.error = "Dependency failed or was blocked.";
        if (hooks.onTask) await hooks.onTask({ type: "blocked", task: { ...task } });
      }

      const ready = this.ready();
      if (!ready.length) break;

      for (const task of ready) {
        task.status = "RUNNING";
        if (hooks.onTask) await hooks.onTask({ type: "running", task: { ...task } });
        try {
          const output = await executor({ ...task }, this);
          task.output = output;
          task.status = "COMPLETED";
          results.push({ taskId: task.id, output });
          if (hooks.onTask) await hooks.onTask({ type: "completed", task: { ...task } });
        } catch (error) {
          task.status = "FAILED";
          task.error = String(error?.message || error);
          if (hooks.onTask) await hooks.onTask({ type: "failed", task: { ...task } });
        }
      }
    }

    const pending = Array.from(this.tasks.values()).filter(t => t.status === "QUEUED");
    if (pending.length) {
      for (const task of pending) {
        task.status = "BLOCKED";
        task.error = "Unresolvable dependency graph.";
      }
    }

    return this.list();
  }
}
