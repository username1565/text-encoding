const {
  assert_equals,
} = require('../assert-package.js');

require('../../dist/umd/encoding-indexes');
const { TextDecoder, TextEncoder } = require('../../dist/cjs/encoding');

describe('TextDecoder spec', () => {

  it('can be called with uint8 array or buffer', () => { 
    
    const latin_1_alphabet_string =
                  //_0        _1          _2          _3          _4          _5          _6          _7          _8          _9          _A          _B          _C          _D          _E          _F
    //0_
                  '\x00'+     '\x01'+     '\x02'+     '\x03'+     '\x04'+     '\x05'+     '\x06'+     '\x07'+     '\x08'+     '\x09'+     '\n'+       '\x0B'+     '\x0C'+     '\x0D'+     '\x0E'+     '\x0F'+
    //1_
                  '\x10'+     '\x11'+     '\x12'+     '\x13'+     '\x14'+     '\x15'+     '\x16'+     '\x17'+     '\x18'+     '\x19'+     '\x1A'+     '\x1B'+     '\x1C'+     '\x1D'+     '\x1E'+     '\x1F'+
    //2_
                  ' '+        '!'+        '\"'+       '#'+        '$'+        '%'+        '&'+        '\''+       '('+        ')'+        '*'+        '+'+        ','+        '-'+        '.'+        '/'+
    //3_
                  '0'+        '1'+        '2'+        '3'+        '4'+        '5'+        '6'+        '7'+        '8'+        '9'+        ':'+        ';'+        '<'+        '='+        '>'+        '?'+
    //4_
                  '@'+        'A'+        'B'+        'C'+        'D'+        'E'+        'F'+        'G'+        'H'+        'I'+        'J'+        'K'+        'L'+        'M'+        'N'+        'O'+
    //5_
                  'P'+        'Q'+        'R'+        'S'+        'T'+        'U'+        'V'+        'W'+        'X'+        'Y'+        'Z'+        '['+        '\\'+        ']'+        '^'+        '_'+
    //6_
                  '`'+        'a'+        'b'+        'c'+        'd'+        'e'+        'f'+        'g'+        'h'+        'i'+        'j'+        'k'+        'l'+        'm'+        'n'+        'o'+
    //7_
                  'p'+        'q'+        'r'+        's'+        't'+        'u'+        'v'+        'w'+        'x'+        'y'+        'z'+        '{'+        '|'+        '}'+        '~'+        '\x7F'+
    //8_
                  '\x80'+     '\x81'+     '\x82'+     '\x83'+     '\x84'+     '\x85'+     '\x86'+     '\x87'+     '\x88'+     '\x89'+     '\x8A'+     '\x8B'+     '\x8C'+     '\x8D'+     '\x8E'+     '\x8F'+
    //9_
                  '\x90'+     '\x91'+     '\x92'+     '\x93'+     '\x94'+     '\x95'+     '\x96'+     '\x97'+     '\x98'+     '\x99'+     '\x9A'+     '\x9B'+     '\x9C'+     '\x9D'+     '\x9E'+     '\x9F'+
    //A_
                  '\xA0'+     '¡'+        '¢'+        '£'+        '¤'+        '¥'+        '¦'+        '§'+        '¨'+        '©'+        'ª'+        '«'+        '¬'+        '­'+        '®'+        '¯'+
    //B_
                  '°'+        '±'+        '²'+        '³'+        '´'+        'µ'+        '¶'+        '·'+        '¸'+        '¹'+        'º'+        '»'+        '¼'+        '½'+        '¾'+        '¿'+
    //C_
                  'À'+        'Á'+        'Â'+        'Ã'+        'Ä'+        'Å'+        'Æ'+        'Ç'+        'È'+        'É'+        'Ê'+        'Ë'+        'Ì'+        'Í'+        'Î'+        'Ï'+
    //D_
                  'Ð'+        'Ñ'+        'Ò'+        'Ó'+        'Ô'+        'Õ'+        'Ö'+        '×'+        'Ø'+        'Ù'+        'Ú'+        'Û'+        'Ü'+        'Ý'+        'Þ'+        'ß'+
    //E_
                  'à'+        'á'+        'â'+        'ã'+        'ä'+        'å'+        'æ'+        'ç'+        'è'+        'é'+        'ê'+        'ë'+        'ì'+        'í'+        'î'+        'ï'+
    //F_
                  'ð'+        'ñ'+        'ò'+        'ó'+        'ô'+        'õ'+        'ö'+        '÷'+        'ø'+        'ù'+        'ú'+        'û'+        'ü'+        'ý'+        'þ'+        'ÿ'
;

    const allBytes = new Uint8Array(256); //create buffer with bytelength 256 bytes
    for (var i = 0 ; i < 256 ; i++) {	//fill this by 256
        allBytes[i] = i;							//consecutive bytes
    }

    const latin1String = new TextDecoder('iso-8859-1').decode(allBytes);	//decode buffer to "iso-8859-1"-encoded string
    assert_equals(latin_1_alphabet_string, latin1String);					//compare this string with alphabet-string.

    const encodedLatin1Bytes = new TextEncoder('latin1').encode(latin_1_alphabet_string);	//encode this string back to bytes.
    const decodedLatin1String = new TextDecoder('iso-8859-1').decode(encodedLatin1Bytes);	//decode it again, from bytes;

    assert_equals(latin_1_alphabet_string, decodedLatin1String);			//compare last result with latin1-alphabet string.
	
  });

});
