export default {
    async fetch(request, env): Promise<Response> {
        const url = new URL(request.url);
        const path =
            /^\/[A-Za-z0-9]{4,5}$/.test(url.pathname) || url.pathname.toLowerCase().endsWith('.png')
                ? '/index.png'
                : url.pathname.toLowerCase().endsWith('.mp4')
                  ? '/index.mp4'
                  : '/index.html';

        const response = await env.ASSETS.fetch(new Request(new URL(path, request.url), request));
        return path === '/index.html'
            ? new Response(response.body, { status: 503, headers: response.headers })
            : response;
    },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>;
