# News Intelligence Classifier – Chrome Extension

## Overview

News Intelligence Classifier is a Chrome Extension that automatically reads webpage content, detects news-like headlines, and classifies them into:

* Good News
* Bad News
* Neutral

The extension injects a live panel directly into the webpage and updates automatically as new content appears (infinite scroll / dynamic websites supported).

This project uses adaptive learning:

Users can train the classifier using feedback buttons (👍 / 👎 / 😐), and the system improves over time.

---

## Features

### Core Features

* Automatic news detection from webpages
* Good / Bad / Neutral classification
* Floating panel UI injected into the page
* Live auto-detect mode (MutationObserver)
* Works with dynamic websites and infinite scroll
* Adaptive learning using user feedback

### Learning System

* Feedback is stored using `chrome.storage.local`
* Word weights are dynamically generated
* Classification becomes personalized over time

---

## Project Structure

```
news-intelligence-extension/
│
├── manifest.json
├── background.js
│
├── config/
│   └── rules.js
│
├── content/
│   ├── content.js
│   ├── parser.js
│   ├── classifier.js
│   ├── learning.js
│   ├── storage.js
│   └── ui.js
│
└── styles/
    └── panel.css
```

---

## How It Works

### 1. Parsing

The parser scans the DOM and extracts potential headlines using multiple strategies:

* H1/H2/H3 elements
* Article containers
* Links containing headline-like text
* Common content containers

---

### 2. Classification

Hybrid approach:

* Rule-based sentiment (GOOD_WORDS / BAD_WORDS)
* Adaptive word weights from user feedback

Output:

```
Good News
Bad News
Neutral
```

---

### 3. UI Rendering

The extension injects a floating panel that shows:

* Good news first
* Bad news second
* Neutral news last

Each row includes training buttons.

---

### 4. Live Auto-Detect Mode

A MutationObserver watches for DOM changes:

```
New content appears
   ↓
Auto re-scan
   ↓
Re-classification
```

This allows the extension to work on modern dynamic websites.

---

## Installation (Developer Mode)

1. Open Chrome

```
chrome://extensions
```

2. Enable **Developer Mode**

3. Click **Load unpacked**

4. Select:

```
news-intelligence-extension/ ( folder) 
```

5. Open any news website and the panel will appear.

---

## Development Notes

### Important Chrome Extension Rule

Content scripts do NOT support ES module imports by default.

All scripts are loaded via `manifest.json` in dependency order.

---

### Data Storage

Training data is stored locally using:

```
chrome.storage.local
```

Data is saved inside the Chrome user profile, not inside the extension folder.

---

## Known Limitations

* Rule-based classifier is lightweight (not full NLP)
* Some websites may require parser tuning
* No cloud sync yet (local learning only)

---


