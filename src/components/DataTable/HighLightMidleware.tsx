import { Typography } from '@mui/material';
import React from 'react';
import { useContextTable } from '../../context/TableContext';

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const { arrayKeyWord } = useContextTable();
  // Prepara as palavras-chave: separa em palavras e mantém a informação original
  const keywords = arrayKeyWord.map(item => ({
    ...item,
    words: item.label.toLowerCase().split(' '),
    original: item.label
  }));

  // Ordena do maior para o menor (termos com mais palavras primeiro)
  keywords.sort((a, b) => b.words.length - a.words.length);

  // Divide o texto em tokens (palavras e espaços)
  const tokens = text.split(/(\s+)/);

  const normalize = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,;:!?()"'`´[\]{}<>]/g, '')
      .toLowerCase();

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
        // Use normalize aqui:
        if (normalize(tokens[tokenIndex]) !== normalize(keyword.words[i])) {
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
      i += result.length;
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