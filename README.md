# Watermark Generator - Web Application

Generate Watermark from CSV file to PDF files

## Start

```
git clone https://github.com/RuanKlein/watermark-csv-pdf.git
cd watermark-csv-pdf
cp env-example .env
```

Change `.env` to configure application name, port and host.

### Local Environment

```
yarn install 
yarn dev
```

On Web Browser: `localhost:3000`

### Production Environment

```
docker build --no-cache -t ruanklein/watermark-csv-pdf .
docker run --name watermark-csv-pdf -p 5000:5000 -p 4000:4000 -v $(pwd)/uploads:/usr/src/app/uploads -d ruanklein/watermark-csv-pdf
```

On Web Browser: `localhost:5000`

## Example 

CSV file (separator is `;`):

![](screenshots/csv.png)

### Usage:

![](screenshots/demo.gif)

### Result:

Ruan Klein                      | John Smith
:------------------------------:|:----------:
![](screenshots/sample-ruan.png)|![](screenshots/sample-john.png)