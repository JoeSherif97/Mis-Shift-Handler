import arabic_reshaper
from bidi.algorithm import get_display

string=input("Enter the miswritten phrase: ")
lang=input("Enter what the supposed language was? english or arabic (e or a):").lower()

EngtoArb={
    #small letters
    '`':'ذ',    'q':'ض',    'w':'ص',    'e':'ث',    'r':'ق',
    't':'ف',    'y':'غ',    'u':'ع',    'i':'ه',    'o':'خ',
    'p':'ح',    '[':'ج',    ']':'د',    'a':'ش',    's':'س',
    'd':'ي',    'f':'ب',    'g':'ل',    'h':'ا',    'j':'ت',    
    'k':'ن',    'l':'م',    ';':'ك',    "'":'ط',    'z':'ئ',
    'x':'ء',    'c':'ؤ',    'v':'ر',    'b':'لا',    'n':'ى',    
    'm':'ة',    ',':'و',    '.':'ز',    '/':'ظ',
    #Capital Letters
    '~':'ّ',     'Q':'َ',     'W':'ً',     'E':'ُ',     'R':'ٌ',
    'T':'لإ',    'Y':'إ',    'U':'‘',    'I':'÷',    'O':'×',
    'P':'؛',    '{':'<',    '}':'>',    'A':'ِ',     'S':'ٍ',      
    'D':']',    'F':'[',    'G':'لأ',    'H':'أ',    'J':'ـ',      
    'K':'،',    'L':'/',    ':':':',    '"':'"',    'Z':'~',
    'X':'ْ',     'C':'}',    'V':'{',    'B':'لآ',    'N':'آ',
    'M':'’',    '<':',',    '>':'.',    '?':'؟',
    }
ArbtoEng = {v: k for k, v in EngtoArb.items()}

if lang=='e':
    EnglishString=''
    for i in range(len(string)):
        if string[i]==' ':
            EnglishString+=' '
        else:
            EnglishString+=ArbtoEng[string[i]]
        EnglishString=EnglishString.replace('tY','T')
        EnglishString=EnglishString.replace('gH','G')
        EnglishString=EnglishString.replace('gN','B')
        EnglishString=EnglishString.replace('gh','b')
    print('The Corrected Phrase was: ',EnglishString)
elif lang=='a':
    ArabicString=''
    for i in range(len(string)):
        if string[i]==' ':
            ArabicString+=' '
        else:
            ArabicString+=EngtoArb[string[i]]
    ArabicString = arabic_reshaper.reshape(ArabicString)    # correct its shape
    ArabicString = get_display(ArabicString)           # correct its direction
    print('The Corrected Phrase was: ',ArabicString)
else:
    print('Enter a valid language')
