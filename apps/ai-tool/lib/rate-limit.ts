type Entry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Entry>();

function getWindowMs() {
  return Number(process.env.AI_RATE_LIMIT_WINDOW_MS ?? 60_000);
}

function getMax() {
  return Number(process.env.AI_RATE_LIMIT_MAX ?? 20);
}

export function checkRateLimit(key: string) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + getWindowMs() });
    return { allowed: true, remaining: getMax() - 1 };
  }

  if (current.count >= getMax()) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  store.set(key, current);

  return { allowed: true, remaining: Math.max(0, getMax() - current.count) };
}
