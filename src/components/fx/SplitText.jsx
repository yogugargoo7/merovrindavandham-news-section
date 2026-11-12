import { Fragment } from 'react';

// Heading whose words rise out of a mask when it scrolls into view.
//   "\n" in text  -> line break
//   *word*        -> italic accent (can span several words: *two words*)
const tokenize = (line) => {
  const tokens = [];
  let em = false;
  line.split(' ').filter(Boolean).forEach((raw) => {
    let word = raw;
    if (word.startsWith('*')) {
      em = true;
      word = word.slice(1);
    }
    const isEm = em;
    if (word.endsWith('*')) {
      em = false;
      word = word.slice(0, -1);
    }
    tokens.push({ word, em: isEm });
  });
  return tokens;
};

const SplitText = ({ text, as = 'h2', className = '', delay = 0, style, ...rest }) => {
  const Tag = as;
  let index = 0;
  const lines = text.split('\n');

  return (
    <Tag
      className={`split ${className}`.trim()}
      data-reveal="split"
      style={{ ...style, '--d': `${delay}ms` }}
      {...rest}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          <span className="split__line">
            {tokenize(line).map((token, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="split__word">
                  <span className="split__inner" style={{ '--i': index++ }}>
                    {token.em ? <em>{token.word}</em> : token.word}
                  </span>
                </span>
                {' '}
              </Fragment>
            ))}
          </span>
          {lineIndex < lines.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
