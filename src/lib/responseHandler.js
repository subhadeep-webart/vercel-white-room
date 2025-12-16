export function sendResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function success(message, data = {}, status = 200) {
  return sendResponse({ success: true, msg: message, data: data }, status);
}

export function error(message, status = 400) {
  return sendResponse({ success: false, error: message }, status);
}
