import axios from "axios";

export async function sendRequest(
  url: string,
  method = "GET",
  data: { [key: string]: string } = {}
) {
  const params = Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          (data?.[key] as unknown as string) || ""
        )}`
    )
    .join("&");

  const result = await axios(url, {
    method,
    data: (method === "POST" ? data : params) || null,
    headers:
      method === "GET"
        ? {}
        : {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
  });

  if (result.status === 200) {
    const text = await result;

    return text;
  }

  console.error(result);
  return { data: null };
}
