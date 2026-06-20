import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/firebase';

const DOC_PATH = 'adminConfig/settings';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'zawyaysf123';
  try {
    const snap = await db.doc(DOC_PATH).get();
    if (!snap.exists) {
      await db.doc(DOC_PATH).set({ password: defaultPassword });
      return res.status(200).json({ message: 'Admin config initialized', password: defaultPassword });
    }
    return res.status(200).json({ message: 'Admin config already exists' });
  } catch (err) {
    console.error('Init error:', err);
    return res.status(500).json({ error: 'Failed to initialize' });
  }
}
