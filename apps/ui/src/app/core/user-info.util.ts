export function getUserInfoFromToken(token: string | null): { name?: string; email?: string } {
  if (!token) return {};
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return {};
  }
}
