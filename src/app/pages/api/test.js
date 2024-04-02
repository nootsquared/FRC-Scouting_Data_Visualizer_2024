export default function handler(req, res) {
  if (res) {
    res.status(200).json({ name: 'John Doe' });
  }
}