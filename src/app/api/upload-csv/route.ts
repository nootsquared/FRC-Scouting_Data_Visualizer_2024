import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const csvData = await file.text();
    const jsonData = await csv().fromString(csvData);

    const resultsDir = path.join(process.cwd(), '2025-NEW-RESULTS');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir);
    }

    const resultsFilePath = path.join(resultsDir, 'results.json');
    fs.writeFileSync(resultsFilePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ success: true, message: 'CSV converted to JSON and saved to 2025-NEW-RESULTS/results.json' }), { status: 200 });
  } catch (error) {
    console.error('Error processing CSV upload:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the file' }), { status: 500 });
  }
}
