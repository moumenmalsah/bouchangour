import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/firebase.js';

const DOC_PATH = 'adminConfig/settings';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'oldPassword and newPassword required' });
  }

  try {
    const snap = await db.doc(DOC_PATH).get();
    const current = snap.exists
      ? (snap.data() as { password: string }).password
      : process.env.DEFAULT_ADMIN_PASSWORD || 'zawyaysf123';

    if (oldPassword !== current) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }

    await db.doc(DOC_PATH).set({ password: newPassword }, { merge: true });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ error: 'Failed to change password' });
  }
}
