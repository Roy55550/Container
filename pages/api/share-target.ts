import { NextApiRequest, NextApiResponse } from 'next'
import { addItemToInbox } from '../../src/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, text, url } = req.body

    // Here you would typically get the user ID from the session
    // For this example, we'll use a placeholder
    const userId = 'placeholder-user-id'

    try {
      await addItemToInbox(userId, {
        source: new URL(url).hostname,
        header: title,
        summary: text,
        link: url,
        suggestedTags: [],
        category: 'Uncategorized',
        note: '',
      })

      res.redirect(307, '/inbox')
    } catch (error) {
      console.error('Error adding shared item:', error)
      res.status(500).json({ error: 'Failed to add shared item' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
