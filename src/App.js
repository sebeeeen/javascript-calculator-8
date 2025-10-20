import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
    
    try {
      const result = this.calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      throw error;
    }
  }

  calculate(input) {
    if (input === '') {
      return 0;
    }

    const { delimiter, numbers } = this.parseInput(input);
    const numberArray = this.parseNumbers(numbers, delimiter);
    
    return numberArray.reduce((sum, num) => sum + num, 0);
  }

  parseInput(input) {
    let delimiter = /[,:]/;
    let numbers = input;

    if (input.startsWith('//')) {
      const delimiterEndIndex = input.indexOf('\\n');
      const customDelimiter = input.substring(2, delimiterEndIndex);
      delimiter = new RegExp(`[,:${this.escapeRegExp(customDelimiter)}]`);
      numbers = input.substring(delimiterEndIndex + 2);
    }

    return { delimiter, numbers };
  }

  parseNumbers(numbers, delimiter) {
    return numbers.split(delimiter).map((num) => {
      const parsed = Number(num);
      
      this.validateNumber(parsed);
      
      return parsed;
    });
  }

  validateNumber(num) {
    if (Number.isNaN(num)) {
      throw new Error('[ERROR] 숫자가 아닌 값이 포함되어 있습니다.');
    }
    
    if (num < 0) {
      throw new Error('[ERROR] 음수는 입력할 수 없습니다.');
    }
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export default App;