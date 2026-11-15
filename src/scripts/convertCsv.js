#!/usr/bin/env node
/**
 * ONE-TIME script: Convert A-Z Medicines CSV to optimized JSON
 * 
 * Usage: node src/scripts/convertCsv.js
 * 
 * Reads: C:\Users\ACER\OneDrive\Desktop\A_Z_medicines_dataset_of_India.csv
 * Writes: public/medicines.json
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve('C:\\Users\\ACER\\OneDrive\\Desktop\\A_Z_medicines_dataset_of_India.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../../..', 'public/medicines.json');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function main() {
  console.log('📦 Reading CSV file...');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ CSV file not found at: ${CSV_PATH}`);
    console.log('Please ensure the A_Z_medicines_dataset_of_India.csv file is on your Desktop.');
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = raw.split('\n').filter(line => line.trim());

  if (lines.length < 2) {
    console.error('❌ CSV file appears empty or malformed.');
    process.exit(1);
  }

  // Parse header
  const header = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  console.log(`📋 Columns: ${header.join(', ')}`);

  // Find column indices
  const colIdx = {
    id: header.indexOf('id'),
    name: header.indexOf('name'),
    price: header.indexOf('price(₹)') !== -1 ? header.indexOf('price(₹)') : header.indexOf('price'),
    is_discontinued: header.indexOf('is_discontinued'),
    manufacturer_name: header.indexOf('manufacturer_name'),
    type: header.indexOf('type'),
    pack_size_label: header.indexOf('pack_size_label'),
    short_composition1: header.indexOf('short_composition1'),
    short_composition2: header.indexOf('short_composition2'),
  };

  // Fallback: if exact match fails, do partial match
  for (const key of Object.keys(colIdx)) {
    if (colIdx[key] === -1) {
      const idx = header.findIndex(h => h.includes(key.replace('_', '')));
      if (idx !== -1) colIdx[key] = idx;
    }
  }

  console.log(`🔍 Column mapping:`, colIdx);

  const medicines = [];
  let skippedDiscontinued = 0;
  let skippedParsing = 0;

  for (let i = 1; i < lines.length; i++) {
    try {
      const fields = parseCSVLine(lines[i]);

      // Skip discontinued medicines
      const isDiscontinued = fields[colIdx.is_discontinued];
      if (isDiscontinued && (isDiscontinued === 'True' || isDiscontinued === 'true' || isDiscontinued === '1' || isDiscontinued === 'TRUE')) {
        skippedDiscontinued++;
        continue;
      }

      const name = fields[colIdx.name] || '';
      if (!name.trim()) continue;

      const price = parseFloat(fields[colIdx.price]) || 0;

      medicines.push({
        id: parseInt(fields[colIdx.id]) || i,
        name: name.trim(),
        price: price,
        manufacturer: (fields[colIdx.manufacturer_name] || '').trim(),
        type: (fields[colIdx.type] || '').trim(),
        packSize: (fields[colIdx.pack_size_label] || '').trim(),
        composition1: (fields[colIdx.short_composition1] || '').trim(),
        composition2: (fields[colIdx.short_composition2] || '').trim(),
      });
    } catch (err) {
      skippedParsing++;
    }
  }

  console.log(`✅ Parsed ${medicines.length} active medicines`);
  console.log(`⏩ Skipped ${skippedDiscontinued} discontinued`);
  console.log(`⚠️  Skipped ${skippedParsing} parsing errors`);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(medicines), 'utf-8');

  const sizeMB = (fs.statSync(OUTPUT_PATH).size / (1024 * 1024)).toFixed(2);
  console.log(`💾 Saved to: ${OUTPUT_PATH} (${sizeMB} MB)`);
  console.log('🎉 Done!');
}

main();
