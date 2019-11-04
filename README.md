# Watermark Generator - Web Application

Generate Watermark from CSV file to PDF files

## Start

```
git clone https://github.com/RuanKlein/watermark-csv-pdf.git
cd watermark-csv-pdf
docker build --no-cache -t ruanklein/watermark-csv-pdf .
docker run --name watermark-csv-pdf -p 5000:5000 -p 4000:4000 -v $(pwd)/uploads:/usr/src/app/uploads -d ruanklein/watermark-csv-pdf
```