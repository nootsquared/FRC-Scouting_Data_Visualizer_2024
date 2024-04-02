import fs from 'fs';

export const GET = async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
};

export const POST = async (req, res) => {
  const data = await req.json();
  console.log("POST request received");
  console.log(data);

  const filePath = './src/app/results/results.json';
  fs.appendFileSync(filePath, JSON.stringify(data) + '\n');

  res.status(200).json({ received: true });
};