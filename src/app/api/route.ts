import fs from 'fs';

// export const GET = async () => {
//   res.status(200).json({ name: 'John Doe' });
// };

export async function GET() {
  return Response.json({"Hello": "World"})
}

export async function POST(req: Request) {
  const { data, path: filePath } = await req.json();
  console.log("POST request received");
  console.log(data);

  let fileContent = fs.readFileSync(filePath, 'utf8');

  if (fileContent.length === 0 || fileContent[0] !== '[') {
    fs.writeFileSync(filePath, '[\n]\n');
    fileContent = '[\n]\n';
  }

  fileContent = fileContent.slice(0, -2);

  if (fileContent.length > 3) {
    fileContent = fileContent.slice(0, -1) + ',\n';
  }
  fs.writeFileSync(filePath, fileContent + JSON.stringify(data) + '\n');
  fs.appendFileSync(filePath, ']\n');
  return Response.json({ received: true });
};