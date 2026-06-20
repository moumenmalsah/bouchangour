import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/firebase';

const PASSWORD_DOC = 'adminConfig/settings';
const DATA_DOC = 'siteData/main';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { password, data } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });
  if (!data) return res.status(400).json({ error: 'Data required' });

  try {
    const snap = await db.doc(PASSWORD_DOC).get();
    const stored = snap.exists
      ? (snap.data() as { password: string }).password
      : process.env.DEFAULT_ADMIN_PASSWORD || 'zawyaysf123';

    if (password !== stored) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    await db.doc(DATA_DOC).set(data, { merge: true });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Save data error:', err);
    return res.status(500).json({ error: 'Failed to save data' });
  }
}
