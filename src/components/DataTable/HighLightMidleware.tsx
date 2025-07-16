import { Typography } from '@mui/material';
import React from 'react';
import { useContextTable } from '../../context/TableContext';

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const { arrayKeyWord } = useContextTable();
  
  // Prepara as palavras-chave mantendo a formatação original
  const keywords = arrayKeyWord.map(item => ({
    ...item,
    words: item.label.split(' '), // Mantém o case original
    original: item.label,
    length: item.label.length // Adicionamos o comprimento total
  }));

  // Ordena por: 1) palavras com mais termos, 2) termos mais longos
  keywords.sort((a, b) => {
    if (b.words.length !== a.words.length) {
      return b.words.length - a.words.length; // Mais palavras primeiro
    }
    return b.length - a.length; // Mais longo primeiro
  });

  // Divide o texto em tokens (palavras e espaços)
  const tokens = text.split(/(\s+)/);

  // Função para verificar correspondência exata (incluindo case)
  const checkExactMatch = (token: string, keywordWord: string) => {
    return token === keywordWord;
  };

  // Função para verificar se uma sequência de tokens corresponde a uma palavra-chave
  const checkForKeyword = (startIndex: number) => {
    const remainingTokens = tokens.length - startIndex;

    for (const keyword of keywords) {
      // Não tem tokens suficientes para esta palavra-chave
      if (keyword.words.length * 2 - 1 > remainingTokens) continue;

      let match = true;
      // Verifica cada palavra da palavra-chave (ignorando espaços)
      for (let i = 0; i < keyword.words.length; i++) {
        const tokenIndex = startIndex + i * 2; // Pula os espaços
        if (!checkExactMatch(tokens[tokenIndex], keyword.words[i])) {
          match = false;
          break;
        }
      }

      if (match) {
        return {
          keyword,
          length: keyword.words.length * 2 - 1 // Número de tokens que a palavra-chave ocupa
        };
      }
    }

    return null;
  };

  const elements = [];
  let i = 0;

  while (i < tokens.length) {
    const result = checkForKeyword(i);

    if (result) {
      // Adiciona o termo destacado
      elements.push(
        <span
          key={i}
          style={{
            color: result.keyword.color,
            fontWeight: 'bold'
          }}
        >
          {tokens.slice(i, i + result.length).join('')}
        </span>
      );
      i += result.length; // Pula os tokens já processados
    } else {
      // Adiciona o token normal
      elements.push(
        <span key={i}>
          {tokens[i]}
        </span>
      );
      i++;
    }
  }


  return (
    <Typography component="span">
      {elements}
    </Typography>
  );
};

export default HighlightedText;