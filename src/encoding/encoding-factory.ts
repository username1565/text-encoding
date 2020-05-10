// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

import { Big5Decoder, Big5Encoder } from '../coders/big5';
import { EUCJPDecoder, EUCJPEncoder } from '../coders/euc-jp';
import { EUCKRDecoder, EUCKREncoder } from '../coders/euc-kr';
import { GB18030Decoder, GB18030Encoder } from '../coders/gb18030';
import { ISO2022JPDecoder, ISO2022JPEncoder } from '../coders/iso-2022-jp';
import { ShiftJISDecoder, ShiftJISEncoder } from '../coders/shift-jis';
import { SingleByteDecoder, SingleByteEncoder } from '../coders/single-byte';
import { UTF16Decoder, UTF16Encoder } from '../coders/utf-16';
import { UTF8Decoder, UTF8Encoder } from '../coders/utf-8';
import { XUserDefinedDecoder, XUserDefinedEncoder } from '../coders/x-user-defined';
import { Decoder } from '../common/Decoder';
import { Encoder } from '../common/Encoder';
import { encodings } from './encodings';
import { index } from './indexes';


//
// Utilities
//

// import './encoding/utilities';

//
// Implementation of Encoding specification
// https://encoding.spec.whatwg.org/
//

//
// 4. Terminology
//

// import './encoding/terminology';

//
// 5. Encodings
//

// import "./encoding/encodings";

//
// 6. Indexes
//

// import './encoding/indexes';

declare const encodingIndexes: { [x: string]: number[] };

const EncodingIndexes: { [x: string]: number[] } = encodingIndexes != null ? encodingIndexes : ('encodingIndexes' in global ? global['encodingIndexes'] : null);

//
// 8. API
//

// 8.1 Interface TextDecoder

// 8.2 Interface TextEncoder

//
// 9. The encoding
//

type XCoderFactory<Tncoder = Encoder | Decoder> = ({ fatal: boolean }) => Tncoder;

// Registry of of encoder/decoder factories, by encoding name.
/** @type {Object.<string, function({fatal:boolean}): Encoder>} */
const encoders: { [s: string]: XCoderFactory<Encoder> } = {};

/** @type {Object.<string, function({fatal:boolean}): Decoder>} */
const decoders: { [s: string]: XCoderFactory<Decoder> } = {};

// 9.1 utf-8

// 9.1.1 utf-8 decoder

// 9.1.2 utf-8 encoder

/** @param {{fatal: boolean}} options */
encoders['UTF-8'] = function (options: { fatal: boolean; }) {
  return new UTF8Encoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['UTF-8'] = function (options: { fatal: boolean; }) {
  return new UTF8Decoder(options);
};

//
// 10. Legacy single-byte encodings
//

// 10.1 single-byte decoder

// 10.2 single-byte encoder

if (EncodingIndexes && EncodingIndexes.length) {
  encodings.forEach(function (category) {
    if (category.heading !== 'Legacy single-byte encodings')
      return;
    category.encodings.forEach(function (encoding) {
      const name = encoding.name;
      const idx = index(name.toLowerCase());
      /** @param {{fatal: boolean}} options */
      decoders[name] = function (options: { fatal: boolean; }) {
        return new SingleByteDecoder(idx as number[], options);
      };
      /** @param {{fatal: boolean}} options */
      encoders[name] = function (options: { fatal: boolean; }) {
        return new SingleByteEncoder(idx as number[], options);
      };
    });
  });
}

//
// 11. Legacy multi-byte Chinese (simplified) encodings
//

// 11.1 gbk

// 11.1.1 gbk decoder
// gbk's decoder is gb18030's decoder.
/** @param {{fatal: boolean}} options */
decoders['GBK'] = function (options: { fatal: boolean; }) {
  return new GB18030Decoder(options);
};

// 11.1.2 gbk encoder
// gbk's encoder is gb18030's encoder with its gbk flag set.
/** @param {{fatal: boolean}} options */
encoders['GBK'] = function (options: { fatal: boolean; }) {
  return new GB18030Encoder(options, true);
};

// 11.2 gb18030
// 11.2.1 gb18030 decoder

// 11.2.2 gb18030 encoder

/** @param {{fatal: boolean}} options */
encoders['gb18030'] = function (options: { fatal: boolean; }) {
  return new GB18030Encoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['gb18030'] = function (options: { fatal: boolean; }) {
  return new GB18030Decoder(options);
};


//
// 12. Legacy multi-byte Chinese (traditional) encodings
//

// 12.1 Big5

// 12.1.1 Big5 decoder

// 12.1.2 Big5 encoder

/** @param {{fatal: boolean}} options */
encoders['Big5'] = function (options: { fatal: boolean; }) {
  return new Big5Encoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['Big5'] = function (options: { fatal: boolean; }) {
  return new Big5Decoder(options);
};


//
// 13. Legacy multi-byte Japanese encodings
//

// 13.1 euc-jp

// 13.1.1 euc-jp decoder

// 13.1.2 euc-jp encoder

/** @param {{fatal: boolean}} options */
encoders['EUC-JP'] = function (options: { fatal: boolean; }) {
  return new EUCJPEncoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['EUC-JP'] = function (options: { fatal: boolean; }) {
  return new EUCJPDecoder(options);
};

// 13.2 iso-2022-jp

// 13.2.1 iso-2022-jp decoder

// 13.2.2 iso-2022-jp encoder

/** @param {{fatal: boolean}} options */
encoders['ISO-2022-JP'] = function (options: { fatal: boolean; }) {
  return new ISO2022JPEncoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['ISO-2022-JP'] = function (options: { fatal: boolean; }) {
  return new ISO2022JPDecoder(options);
};

// 13.3 Shift_JIS

// 13.3.1 Shift_JIS decoder

// 13.3.2 Shift_JIS encoder

/** @param {{fatal: boolean}} options */
encoders['Shift_JIS'] = function (options: { fatal: boolean; }) {
  return new ShiftJISEncoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['Shift_JIS'] = function (options: { fatal: boolean; }) {
  return new ShiftJISDecoder(options);
};

//
// 14. Legacy multi-byte Korean encodings
//

// 14.1 euc-kr

// 14.1.1 euc-kr decoder

// 14.1.2 euc-kr encoder

/** @param {{fatal: boolean}} options */
encoders['EUC-KR'] = function (options: { fatal: boolean; }) {
  return new EUCKREncoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['EUC-KR'] = function (options: { fatal: boolean; }) {
  return new EUCKRDecoder(options);
};


//
// 15. Legacy miscellaneous encodings
//

// 15.1 replacement

// Not needed - API throws RangeError

// 15.2 Common infrastructure for utf-16be and utf-16le

// 15.2.1 shared utf-16 decoder

// 15.2.2 shared utf-16 encoder

// 15.3 utf-16be
// 15.3.1 utf-16be decoder
/** @param {{fatal: boolean}} options */
encoders['UTF-16BE'] = function (options: { fatal: boolean; }) {
  return new UTF16Encoder(true, options);
};
// 15.3.2 utf-16be encoder
/** @param {{fatal: boolean}} options */
decoders['UTF-16BE'] = function (options: { fatal: boolean; }) {
  return new UTF16Decoder(true, options);
};

// 15.4 utf-16le
// 15.4.1 utf-16le decoder
/** @param {{fatal: boolean}} options */
encoders['UTF-16LE'] = function (options: { fatal: boolean; }) {
  return new UTF16Encoder(false, options);
};
// 15.4.2 utf-16le encoder
/** @param {{fatal: boolean}} options */
decoders['UTF-16LE'] = function (options: { fatal: boolean; }) {
  return new UTF16Decoder(false, options);
};

// 15.5 x-user-defined

// 15.5.1 x-user-defined decoder

// 15.5.2 x-user-defined encoder

/** @param {{fatal: boolean}} options */
encoders['x-user-defined'] = function (options: { fatal: boolean; }) {
  return new XUserDefinedEncoder(options);
};
/** @param {{fatal: boolean}} options */
decoders['x-user-defined'] = function (options: { fatal: boolean; }) {
  return new XUserDefinedDecoder(options);
};

export { decoders, encoders, EncodingIndexes };

