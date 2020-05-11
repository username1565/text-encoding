export type EncodingIndexMap = {
  [x: string]: number[];
};

declare const encodingIndexes: EncodingIndexMap;
declare const TextEncodingIndexes: EncodingIndexMap;

let _encodingIndexes: EncodingIndexMap;

function checkForEncodingIndexes(): EncodingIndexMap {
  
  if (encodingIndexes)
    return encodingIndexes;

  if (TextEncodingIndexes)
    return TextEncodingIndexes;

  if ('TextEncodingIndexes' in global)
    return global['TextEncodingIndexes'];

  return null;
}

export function getEncodingIndexes(): EncodingIndexMap {
  
  if (_encodingIndexes) {
    return _encodingIndexes;
  }

  const indexes = checkForEncodingIndexes();

  if (!indexes) {
    return null;
  }

  _encodingIndexes = indexes;

  return indexes;
}
