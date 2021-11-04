import { useEffect, useState } from 'react';

export default function useInputValidation(input: string) {
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    if (input) {
      const englishLetters = /^[A-Za-z]+$/;
      setTypeError(!input.match(englishLetters));
    }
  }, [input]);

  return typeError;
}
