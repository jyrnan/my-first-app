interface Env {
  DB: D1Database;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function errorResponse(message: string, status = 500): Response {
  return jsonResponse({ error: message }, status);
}

function handleOptions(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

async function listNotes(db: D1Database): Promise<Response> {
  const { results } = await db
    .prepare('SELECT * FROM notes ORDER BY created_at DESC')
    .all();
  return jsonResponse(results);
}

async function createNote(db: D1Database, request: Request): Promise<Response> {
  const body = await request.json<{ content?: string }>();
  if (!body.content?.trim()) {
    return errorResponse('Content is required', 400);
  }
  const { results } = await db
    .prepare('INSERT INTO notes (content) VALUES (?) RETURNING *')
    .bind(body.content.trim())
    .all();
  return jsonResponse(results[0], 201);
}

async function updateNote(db: D1Database, id: string, request: Request): Promise<Response> {
  const body = await request.json<{ content?: string }>();
  if (!body.content?.trim()) {
    return errorResponse('Content is required', 400);
  }
  const { results } = await db
    .prepare('UPDATE notes SET content = ? WHERE id = ? RETURNING *')
    .bind(body.content.trim(), id)
    .all();
  if (results.length === 0) {
    return errorResponse('Note not found', 404);
  }
  return jsonResponse(results[0]);
}

async function deleteNote(db: D1Database, id: string): Promise<Response> {
  const result = await db
    .prepare('DELETE FROM notes WHERE id = ?')
    .bind(id)
    .run();
  if (result.meta.changes === 0) {
    return errorResponse('Note not found', 404);
  }
  return jsonResponse({ success: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // GET /api/notes
      if (request.method === 'GET' && path === '/api/notes') {
        return listNotes(env.DB);
      }

      // POST /api/notes
      if (request.method === 'POST' && path === '/api/notes') {
        return createNote(env.DB, request);
      }

      // PUT /api/notes/:id
      const putMatch = path.match(/^\/api\/notes\/([^/]+)$/);
      if (request.method === 'PUT' && putMatch) {
        return updateNote(env.DB, putMatch[1], request);
      }

      // DELETE /api/notes/:id
      const deleteMatch = path.match(/^\/api\/notes\/([^/]+)$/);
      if (request.method === 'DELETE' && deleteMatch) {
        return deleteNote(env.DB, deleteMatch[1]);
      }

      return errorResponse('Not found', 404);
    } catch (err) {
      console.error('Worker error:', err);
      return errorResponse('Internal server error', 500);
    }
  },
};
