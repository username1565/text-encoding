// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

test(
  function () {
    var allBytes = new Uint8Array(256); for(var i = 0; i<256; i++){allBytes[i] = i;}			//generate Uint8Array with all possible 256 consecutive byte-values.
	var s = ''; for(var i = 0; i<allBytes.length; i++){s += String.fromCharCode(allBytes[i]);}	//generate iso-8859-1 string with char-codes of this bytes.

	var decoded_latin1_string = new TextEncoding.TextDecoder("iso-8859-1").decode(allBytes);	//decode allBytes "latin1"-string
    assert_equals(decoded_latin1_string, s);													//compare decoded string and generated string.
	
	var encoded_allBytes = new TextEncoding.
		TextEncoder(									//encode into new Uint8Array
			"iso-8859-1",								//"iso-8859-1"-encoded string
			{NONSTANDARD_allowLegacyEncoding: true}		//as legacy encoding
		)
		.encode(decoded_latin1_string)					//from this value
	;

	var decoded_latin1_string_again = new TextEncoding.TextDecoder("iso-8859-1").decode(encoded_allBytes);	//and decode this string back, by using TextDecoder.
    
    assert_equals(decoded_latin1_string_again, s);		//compare the second decoded string and generated string.

//test, by using this way
if(
			(	typeof document.getElementsByTagName('meta')[0] 					!==	'undefined'		)
	&&		(	document.getElementsByTagName('meta')[0].getAttribute('charset') 	===	'utf-8'			)
){ 	//To use this test, add <meta charset="utf-8"> in "index.html" and "libTEST.html"
	console.log('try to test "iso-8859-1", with latin_1_alphabet_string...');
	
    var latin_1_alphabet_string =
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

    assert_equals(latin_1_alphabet_string, s);		//compare the second decoded string and generated string.
	
}

  },
  "iso-8859-1"	//LATIN-1 encoding. Test encode and decode this.
);
