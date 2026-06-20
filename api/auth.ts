import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/firebase.js';

const DOC_PATH = 'adminConfig/settings';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  try {
    const snap = await db.doc(DOC_PATH).get();
    const stored = snap.exists
      ? (snap.data() as { password: string }).password
      : process.env.DEFAULT_ADMIN_PASSWORD || 'zawyaysf123';

    if (password === stored) {
      return res.status(200).json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
  } catch {
    return res.status(500).json({ error: 'Auth check failed' });
  }
}
