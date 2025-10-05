# ONLYOFFICE Offices Scraper

> A script to automatically scrape office location data from the official ONLYOFFICE website.

---

## 🚀 Overview

This script uses [Playwright](https://playwright.dev/) to navigate the ONLYOFFICE contacts page, extract office details and save them to a CSV file.

The project follows clean architecture principles:

- Separation of concerns
- Comprehensive testing (unit, integration, E2E)
- Full JSDoc-based type safety
- Automated CI/CD pipeline

---

## 🛠️ Technologies & Tools

| Инструмент     | Назначение                           |
| -------------- | ------------------------------------ |
| [Node.js]      | Runtime environment                  |
| [Playwright]   | Browser automation (Firefox)         |
| [Jest]         | Unit and integration tests           |
| [csv-writer]   | CSV file generation                  |
| [JSDoc]        | Type safety and inline documentation |
| GitHub Actions | CI/CD automation                     |

---

## 🗂️ Project Structure

```bash
ssrc/
├── config/ # Configuration files
│ ├── index.js # Main config export
│ ├── messages.js # Log and error messages
│ ├── selectors.js # CSS selectors for DOM elements
│ └── timeouts.js # Timeout values
├── services/ # Business logic services
│ └── saveOfficesToCsv.js
├── utils/ # Helper utilities
│ ├── ensureDir.js # Ensure directory exists
│ ├── retry.js # Retry function for flaky operations
│ ├── sortOfficesByLocality.js # Sort offices by locality
│ └── cli.js # CLI entry point (main script)
└── scraper.js # Core scraping logic (uses page.$$eval)

tests/
├── unit/ # Unit tests (no browser)
│ ├── ensureDir.test.js
│ ├── retry.test.js
│ └── sortOfficesByLocality.test.js
├── integration/ # Integration tests (DOM parsing logic)
│ └── extractOffices.test.js
└── e2e/ # End-to-end tests (real browser + live site)
└── scraper.e2e.test.js

.github/workflows/ci.yml # CI/CD pipeline configuration

```

---

## 🧪 Testing Strategy

🔹 Unit Tests (fast & reliable)

Run on every commit and PR:

```bash
npm test
```

🔹 Integration Tests

Validate data extraction logic without a browser:

```bash
npm run test:integration
```

🔹 E2E Tests (real browser)

Execute only on merge to master:

```bash
npm run test:e2e

// Run all tests:

npm run test:all
```

## 🔄 CI/CD Pipeline (GitHub Actions)

Automated test execution on push to master or pull request:

- ✅ Unit + Integration tests → on every PR
- ⚠️ E2E tests → only on merge to master
- 📁 Artifacts (screenshots, CSV) → saved on E2E failure

  > Config file: .github/workflows/ci.yml

## 🚀 Getting Started

1. Install dependencies

```bash
npm ci
```

2. Run the scraper (specify output CSV path)

```bash
node src/cli.js data/offices.csv

// or
npm run scrape data/offices.csv
```

> 📝 The data/ directory will be created automatically if it doesn’t exist.

📝 Sample Output

```bash
➡️  Starting scraper for: https://www.onlyoffice.com
🌐 Target URL: https://www.onlyoffice.com
✅  Page loaded: https://www.onlyoffice.com/
📖  Opening Resources menu...
📞  Navigating to Contacts...
⏳  Waiting for office data to load...
♻️   Extracting office data...
✍️   Saving data to file: data/offices.csv
✅  Successfully scraped 9 offices.
```

## Error Handling & Validation

- Configuration validation (BASE_URL, SELECTORS)
- Automatic retry logic for transient failures
- Required field validation
- Debug screenshots on error (DEBUG_MODE=true)
- Clear, actionable error messages
