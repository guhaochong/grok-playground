import { handleGrokRequest } from "./handle_grok.js";

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const filePath = url.pathname;
  console.log('Request URL:', req.url);

  // 处理静态文件
  if (filePath === '/' || filePath === '/index.html') {
    const file = await Deno.readFile("./src/static/index.html");
    return new Response(file, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }

  if (filePath === '/users.json') {
    const file = await Deno.readFile("./src/static/users.json");
    return new Response(file, {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }

  if (filePath === '/how_to_get_cookie.png') {
    const file = await Deno.readFile("./src/static/how_to_get_cookie.png");
    return new Response(file, {
      headers: { "content-type": "image/png" },
    });
  }

  // 处理 Grok 和其他请求
  return handleGrokRequest(req);
}

Deno.serve({ port: 80 }, handleRequest);