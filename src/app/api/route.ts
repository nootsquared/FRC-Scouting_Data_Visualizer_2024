import fs from 'fs';
import csv from 'csvtojson';

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
}

export async function POST_UPLOAD_CSV(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const csvData = await file.text();
  const jsonData = await csv().fromString(csvData);

  const resultsFilePath = 'results.json';
  fs.writeFileSync(resultsFilePath, JSON.stringify(jsonData, null, 2));

  return Response.json({ success: true, message: 'CSV converted to JSON and saved to results.json' });
}