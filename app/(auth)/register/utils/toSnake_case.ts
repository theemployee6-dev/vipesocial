// Função auxiliar para converter camelCase para snake_case
export function toSnakeCase(obj: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    result[snakeKey] = value;
  }
  return result;
}

// Uso:
// const snakeData = toSnakeCase(data);
// const payload = { id: userId, ...snakeData, avatar_url: avatarPath };
