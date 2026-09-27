// Small helper for calling the serverless functions in /api.
export async function postJSON(path, body) {
  let res;
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch {
    throw new Error("We couldn't reach the server. Check your connection and try again.");
  }
  let data = {};
  try {
    data = await res.json();
  } catch {
    // Non-JSON response; fall through to the generic error below.
  }
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}
