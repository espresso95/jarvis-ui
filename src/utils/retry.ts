export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, 1000 * (3 - retries)));
    return withRetry(fn, retries - 1);
  }
}
