// Your mapping objects
const EngtoArb = {
    '`':'ذ', 'q':'ض', 'w':'ص', 'e':'ث', 'r':'ق', 't':'ف', 'y':'غ', 'u':'ع', 
    'i':'ه', 'o':'خ', 'p':'ح', '[':'ج', ']':'د', 'a':'ش', 's':'س', 'd':'ي', 
    'f':'ب', 'g':'ل', 'h':'ا', 'j':'ت', 'k':'ن', 'l':'م', ';':'ك', "'":'ط', 
    'z':'ئ', 'x':'ء', 'c':'ؤ', 'v':'ر', 'b':'لا', 'n':'ى', 'm':'ة', ',':'و', 
    '.':'ز', '/':'ظ', '~':'ّ', 'Q':'َ', 'W':'ً', 'E':'ُ', 'R':'ٌ', 'T':'لإ', 
    'Y':'إ', 'U':'‘', 'I':'÷', 'O':'×', 'P':'؛', '{':'<', '}':'>', 'A':'ِ', 
    'S':'ٍ', 'D':']', 'F':'[', 'G':'لأ', 'H':'أ', 'J':'ـ', 'K':'،', 'L':'/', 
    ':':':', '"':'"', 'Z':'~', 'X':'ْ', 'C':'}', 'V':'{', 'B':'لآ', 'N':'آ', 
    'M':'’', '<':',', '>':'.', '?':'؟'
};

// Create reverse mapping
const ArbtoEng = {};
for (const [key, value] of Object.entries(EngtoArb)) {
    ArbtoEng[value] = key;
}

// DOM elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const directionSwitch = document.getElementById('directionSwitch');
const directionIndicator = document.getElementById('directionIndicator');
const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
const clearBtn = document.getElementById('clearBtn');
const helpBtn = document.getElementById('helpBtn');

// Proper Arabic text handling
function formatArabicText(text) {
    return text;
}

// Improved correction functions
function correctToArabic(englishText) {
    let ArabicString = '';
    for (let i = 0; i < englishText.length; i++) {
        if (englishText[i] === ' ') {
            ArabicString += ' ';
        } else {
            ArabicString += EngtoArb[englishText[i]] || englishText[i];
        }
    }
    return ArabicString;
}

function correctToEnglish(arabicText) {
    let EnglishString = '';
    for (let i = 0; i < arabicText.length; i++) {
        if (arabicText[i] === ' ') {
            EnglishString += ' ';
        } else {
            EnglishString += ArbtoEng[arabicText[i]] || arabicText[i];
        }
    }
    EnglishString = EnglishString.replace(/tY/g, 'T')
                                 .replace(/gH/g, 'G')
                                 .replace(/gN/g, 'B')
                                 .replace(/gh/g, 'b');
    return EnglishString;
}

// Update output based on input and direction
function updateOutput() {
    const text = inputText.value.trim();
    if (!text) {
        outputText.value = '';
        outputText.style.direction = 'ltr';
        outputText.style.textAlign = 'left';
        return;
    }

    if (directionSwitch.checked) {
        // English to Arabic
        outputText.value = correctToArabic(text);
        outputText.style.direction = 'rtl';
        outputText.style.textAlign = 'right';
        outputText.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        directionIndicator.textContent = "Direction: English → Arabic";
    } else {
        // Arabic to English
        outputText.value = correctToEnglish(text);
        outputText.style.direction = 'ltr';
        outputText.style.textAlign = 'left';
        outputText.style.fontFamily = "Arial, sans-serif";
        directionIndicator.textContent = "Direction: Arabic → English";
    }
}

// Robust paste functionality with fallback
async function pasteFromClipboard() {
    try {
        // Method 1: Modern clipboard API (requires HTTPS or localhost)
        if (navigator.clipboard && navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            return text;
        }
        
        // Method 2: Fallback using document.execCommand (deprecated but works in extensions)
        return new Promise((resolve) => {
            // Create a temporary input element
            const tempInput = document.createElement('textarea');
            tempInput.style.position = 'fixed';
            tempInput.style.opacity = '0';
            document.body.appendChild(tempInput);
            tempInput.focus();
            
            // Try to paste
            const success = document.execCommand('paste');
            if (success) {
                const text = tempInput.value;
                document.body.removeChild(tempInput);
                resolve(text);
            } else {
                document.body.removeChild(tempInput);
                resolve(null);
            }
        });
    } catch (error) {
        console.log('Clipboard API failed, trying fallback...');
        
        // Method 3: Final fallback - prompt user to paste manually
        return new Promise((resolve) => {
            const manualText = prompt('Clipboard access blocked. Please paste your text here:');
            resolve(manualText || '');
        });
    }
}

// Event listeners
inputText.addEventListener('input', updateOutput);
directionSwitch.addEventListener('change', updateOutput);

copyBtn.addEventListener('click', async () => {
    if (outputText.value) {
        try {
            await navigator.clipboard.writeText(outputText.value);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Results';
            }, 2000);
        } catch (err) {
            // Fallback copy method
            outputText.select();
            document.execCommand('copy');
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Results';
            }, 2000);
        }
    }
});

pasteBtn.addEventListener('click', async () => {
    // Show loading state
    const originalText = pasteBtn.textContent;
    pasteBtn.textContent = 'Pasting...';
    pasteBtn.disabled = true;
    
    try {
        const text = await pasteFromClipboard();
        if (text !== null) {
            inputText.value = text;
            updateOutput();
        } else {
            alert('Could not access clipboard. Please paste manually into the input field.');
        }
    } catch (error) {
        console.error('Paste error:', error);
        alert('Clipboard access denied. Please paste manually (Ctrl+V) into the input field.');
    } finally {
        // Reset button state
        pasteBtn.textContent = originalText;
        pasteBtn.disabled = false;
    }
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    outputText.style.direction = 'ltr';
    outputText.style.textAlign = 'left';
});

helpBtn.addEventListener('click', () => {
    // Open a help page or documentation
    chrome.tabs.create({
        url: 'https://github.com/JoeSherif97/Mis-Shift-Handler'
    });
    
    // Or open an external link:
    // chrome.tabs.create({
    //             url: chrome.runtime.getURL('help.html') // You can create a help page
    // });
});

// Auto-update when switching directions
directionSwitch.addEventListener('change', () => {
    directionIndicator.textContent = directionSwitch.checked 
        ? "Direction: English → Arabic" 
        : "Direction: Arabic → English";
    updateOutput();
});

// Add keyboard shortcut for paste (Ctrl+V)
inputText.addEventListener('paste', (e) => {
    // Let the paste happen naturally, then update
    setTimeout(updateOutput, 10);
});

// Add right-click context menu to input field
inputText.addEventListener('contextmenu', (e) => {
    // Allow default context menu for paste options
});

// Initialize
updateOutput();