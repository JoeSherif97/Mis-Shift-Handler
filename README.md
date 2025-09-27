# Mis-Shift Handler - Browser Extension

Mis-Shift Handler is a Microsoft Edge extension that instantly corrects Arabic/English keyboard layout mistakes. When you accidentally type in the wrong language layout (e.g., typing Arabic words with English keyboard settings), this extension converts the text back to its intended form in real-time.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Conversion](#basic-conversion)
  - [Switch Directions](#switch-directions)
  - [Copy/Paste Functionality](#copy-paste-functionality)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Examples](#examples)

## Features
- **Bidirectional Conversion**: Convert between English and Arabic keyboard layouts in both directions
- **Real-time Processing**: See corrections instantly as you type
- **Clipboard Integration**: Paste text directly from the clipboard and copy results with one click
- **User-Friendly Interface**: Clean, intuitive design with visual direction indicators
- **RTL Support**: Proper right-to-left text rendering for the Arabic language

## Installation

### Method 1: Load Unpacked Extension (Development)
1. **Download the .zip file** from this repository
2. **Extract it** in a folder named extension
3. **Open Microsoft Edge or Chrome** and navigate to extensions
4. **Enable Developer Mode** using the toggle in the bottom-left corner
5. **Click "Load unpacked"** and select the folder containing your extension files
6. **The extension will appear** in your toolbar and is ready to use

### Method 2: Load packed Extension
1. **Download the .crx file** from this repository
2. **Open Microsoft Edge or Chrome** and navigate to extensions
3. **Enable Developer Mode** using the toggle in the bottom-left corner
4. **Drag and drop** the CRX file to the screen, and press accept
5. **The extension will appear** in your toolbar and is ready to use

## Usage

### Basic Conversion

1. **Click the extension icon** in your Browser toolbar
2. **Type or paste text** into the input field
3. **View corrected text** instantly in the output field
4. **Use the toggle switch** to change conversion direction

### Switch Directions

- **Arabic to English**: Corrects text typed with the Arabic keyboard layout back to English
- **English to Arabic**: Corrects text typed with the English keyboard layout back to Arabic

### Copy-Paste Functionality

- **Paste Button**: Import text directly from your clipboard
- **Copy Button**: Export corrected results to the clipboard
- **Clear Button**: Reset both input and output fields
- **Help Button**: Lead you to this repository

## Project Structure

```
mis-shift-handler/
├── manifest.json         # Extension configuration
├── popup.html            # Main interface
├── popup.js              # Core conversion logic
├── MisSpellCorrector.py  # Original Python Logic
├── content.js            # Page content scripts
├── icons/                # Extension icons
└── README.md             # Documentation
```

## Technical Details

### File Descriptions

#### manifest.json

- Defines extension metadata and permissions
- Specifies popup interface and content scripts
- Configures required permissions (clipboard, activeTab)

#### popup.html

- Main user interface with responsive design
- Contains input/output textareas and control buttons
- Implements RTL/LTR text direction handling

#### popup.js

- Core conversion algorithm with comprehensive character mapping
- Handles real-time text processing
- Manages clipboard operations and UI interactions

### Character Mapping System
The extension uses a comprehensive mapping system covering:

- **Lowercase letters**: English to Arabic character equivalents
- **Uppercase letters**: Diacritics and special Arabic characters
- **Special characters**: Punctuation and symbols conversion

## Examples

### Interface

<img width="324" height="400" alt="image" src="https://github.com/user-attachments/assets/bb8e4968-32a6-470a-bd5a-395b9f3465ab" />

### Common Use Cases

#### English to Arabic Conversion:

```
Input:  "uhlg hdi"
Output: "عامل ايه"

Input:  "hib ,sib"
Output: "اهلا وسهلا"
```

#### Arabic to English Conversion:

```
Input:  "عامل ايه"  
Output: "uhlg hdi"

Input:  "اهلا وسهلا"
Output: "hib ,sib"
```
