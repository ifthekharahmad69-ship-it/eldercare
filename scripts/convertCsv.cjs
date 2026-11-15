const fs = require('fs');
const readline = require('readline');
const path = require('path');

const csvPath = 'C:\\Users\\ACER\\OneDrive\\Desktop\\A_Z_medicines_dataset_of_India.csv';
const outputPath = path.join(__dirname, '..', 'public', 'medicines.json');

if (!fs.existsSync(csvPath)) {
  console.error('CSV file not found at:', csvPath);
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(csvPath),
  crlfDelay: Infinity
});

let count = 0;
const medicines = [];
let header = null;

function parseCsvLine(line) {
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  return parts;
}

rl.on('line', (line) => {
  if (!header) {
    header = line;
    return;
  }
  const parts = parseCsvLine(line);
  if (parts.length >= 7) {
    const isDiscontinued = (parts[3] || '').toLowerCase();
    if (isDiscontinued === 'false' || isDiscontinued === '') {
      const name = parts[1];
      const price = parts[2] || '';
      const mfr = parts[4] || '';
      const pack = parts[6] || '';
      const comp1 = parts[7] || '';
      const comp2 = parts[8] || '';
      const composition = [comp1, comp2].filter(Boolean).join(', ');

      if (name && count < 20000) {
        medicines.push({
          id: parts[0] || String(count + 1),
          name: name,
          price: price,
          mfr: mfr,
          pack: pack,
          comp: composition
        });
        count++;
      }
    }
  }
});

rl.on('close', () => {
  fs.writeFileSync(outputPath, JSON.stringify(medicines));
  console.log(`Saved ${medicines.length} Indian medicines to public/medicines.json`);
});
