import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Runs the serverless functions in /api during `npm run dev`,
// so the whole site (forms, checkout) works locally without extra tools.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next();
        const name = req.url.slice(5).split('?')[0].replace(/[^a-z0-9-]/gi, '');
        const send = (code, data) => {
          res.statusCode = code;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        let mod;
        try {
          mod = await server.ssrLoadModule(`/api/${name}.js`);
        } catch {
          return send(404, { error: 'Not found.' });
        }
        let raw = '';
        for await (const chunk of req) raw += chunk;
        try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (data) => { send(res.statusCode || 200, data); return res; };
        try {
          await mod.default(req, res);
        } catch (err) {
          console.error(err);
          if (!res.writableEnded) send(500, { error: 'Something went wrong on our side. Please try again.' });
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (!(key in process.env)) process.env[key] = value;
  }
  return { plugins: [react(), localApi()] };
});
