import fs from 'fs';

// export const GET = async () => {
//   res.status(200).json({ name: 'John Doe' });
// };

export async function GET() {
  return Response.json({"Hello": "World"})
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log("POST request received");
  console.log(data);

  const filePath = './src/app/results/results.json';
  fs.appendFileSync(filePath, JSON.stringify(data) + '\n');

  Response.json({ received: true });
};