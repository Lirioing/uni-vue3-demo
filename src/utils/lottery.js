/**
 * 生成大乐透号码
 * @returns {Object} 包含前区和后区号码的对象
 */
function generateLotteryNumbers() {
  // 生成指定范围、数量的不重复随机数
  function generateUniqueNumbers(min, max, count) {
    const numbers = new Set();
    
    while (numbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNum);
    }
    
    // // 转换为数组并排序
    // return Array.from(numbers).sort((a, b) => a - b);
    // 不排序
    return Array.from(numbers)
  }
  
  // 生成前区号码 (1-35选5个)
  const frontArea = generateUniqueNumbers(1, 35, 5);
  
  // 生成后区号码 (1-12选2个)
  const backArea = generateUniqueNumbers(1, 12, 2);
  
  return {
    frontArea,  // 前区号码数组
    backArea,   // 后区号码数组
    // 完整的号码字符串表示
    toString() {
      return `前区: ${frontArea.join(' ')} | 后区: ${backArea.join(' ')}`;
    },
    // JSON格式
    toJSON() {
      return {
        frontArea,
        backArea,
        numbers: [...frontArea, ...backArea]
      };
    }
  };
}

/**
 * 生成多组大乐透号码
 * @param {number} count - 生成组数
 * @returns {Array} 多组大乐透号码
 */
function generateMultipleLotteryNumbers(count = 1) {
  const results = [];
  
  for (let i = 0; i < count; i++) {
    results.push(generateLotteryNumbers());
  }
  
  return results;
}

/**
 * 生成大乐透号码（数组形式返回）
 * @returns {Array} 包含前区和后区的二维数组
 */
function getLotteryNumbersArray() {
  const numbers = generateLotteryNumbers();
  return [numbers.frontArea, numbers.backArea];
}

/**
 * 生成大乐透号码（扁平数组形式）
 * @returns {Array} 包含所有号码的一维数组
 */
function getFlatLotteryNumbers() {
  const numbers = generateLotteryNumbers();
  return [...numbers.frontArea, ...numbers.backArea];
}

/**
 * 增强版大乐透生成器（带验证和格式化）
 */
class LotteryGenerator {
  constructor() {
    this.frontRange = { min: 1, max: 35, count: 5 };
    this.backRange = { min: 1, max: 12, count: 2 };
  }
  
  // 生成一组随机但合法的号码
  generate() {
    const front = this._generateNumbers(this.frontRange);
    const back = this._generateNumbers(this.backRange);
    
    return {
      front,
      back,
      get numbers() {
        return [...this.front, ...this.back];
      },
      format(pattern = 'default') {
        const formats = {
          default: `${front.join(' ')} + ${back.join(' ')}`,
          compact: `${front.join('')}-${back.join('')}`,
          chinese: `前区: ${front.join('、')} | 后区: ${back.join('、')}`,
          json: JSON.stringify({ front, back })
        };
        return formats[pattern] || formats.default;
      }
    };
  }
  
  // 生成指定范围的号码
  _generateNumbers({ min, max, count }) {
    const numbers = new Set();
    
    // 生成不重复随机数
    while (numbers.size < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(num);
    }
    
    // 排序返回
    return Array.from(numbers).sort((a, b) => a - b);
  }
  
  // 生成多组号码
  generateMultiple(count = 5) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(this.generate());
    }
    return results;
  }
  
  // 验证号码是否合法
  validateNumbers(frontNumbers, backNumbers) {
    const errors = [];
    
    // 验证前区
    if (!Array.isArray(frontNumbers) || frontNumbers.length !== 5) {
      errors.push('前区必须是5个数字的数组');
    } else {
      const frontSet = new Set(frontNumbers);
      if (frontSet.size !== 5) errors.push('前区号码不能重复');
      
      frontNumbers.forEach(num => {
        if (!Number.isInteger(num) || num < 1 || num > 35) {
          errors.push(`前区号码 ${num} 必须在1-35之间`);
        }
      });
      
      // 检查是否排序
      const sorted = [...frontNumbers].sort((a, b) => a - b);
      if (JSON.stringify(frontNumbers) !== JSON.stringify(sorted)) {
        errors.push('前区号码需要从小到大排序');
      }
    }
    
    // 验证后区
    if (!Array.isArray(backNumbers) || backNumbers.length !== 2) {
      errors.push('后区必须是2个数字的数组');
    } else {
      const backSet = new Set(backNumbers);
      if (backSet.size !== 2) errors.push('后区号码不能重复');
      
      backNumbers.forEach(num => {
        if (!Number.isInteger(num) || num < 1 || num > 12) {
          errors.push(`后区号码 ${num} 必须在1-12之间`);
        }
      });
      
      // 检查是否排序
      const sorted = [...backNumbers].sort((a, b) => a - b);
      if (JSON.stringify(backNumbers) !== JSON.stringify(sorted)) {
        errors.push('后区号码需要从小到大排序');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// 导出所有功能
const Lottery = {
  generate: generateLotteryNumbers,
  generateMultiple: generateMultipleLotteryNumbers,
  getArray: getLotteryNumbersArray,
  getFlat: getFlatLotteryNumbers,
  Generator: LotteryGenerator
};

export default Lottery

// // 使用示例
// console.log('=== 大乐透号码生成器使用示例 ===\n');

// // 1. 基本使用
// console.log('1. 基本使用:');
// const numbers1 = generateLotteryNumbers();
// console.log(numbers1.toString());
// console.log('数组形式:', getLotteryNumbersArray());
// console.log('扁平数组:', getFlatLotteryNumbers());

// // 2. 生成多组
// console.log('\n2. 生成3组号码:');
// const multiple = generateMultipleLotteryNumbers(3);
// multiple.forEach((item, index) => {
//   console.log(`第${index + 1}组: ${item.toString()}`);
// });

// // 3. 使用增强版生成器
// console.log('\n3. 使用增强版生成器:');
// const generator = new LotteryGenerator();
// const luckyNumbers = generator.generate();
// console.log('默认格式:', luckyNumbers.format());
// console.log('中文格式:', luckyNumbers.format('chinese'));
// console.log('所有号码:', luckyNumbers.numbers);

// // 4. 验证功能
// console.log('\n4. 号码验证:');
// const validTest = generator.validateNumbers([5, 10, 15, 20, 25], [3, 7]);
// console.log('有效号码验证:', validTest.isValid ? '通过' : validTest.errors);

// const invalidTest = generator.validateNumbers([5, 10, 10, 20, 25], [3, 15]);
// console.log('无效号码验证:', invalidTest.isValid ? '通过' : invalidTest.errors);

// // 8. 生成随机投注单
// console.log('\n8. 随机投注单（5注）:');
// const ticketGenerator = new LotteryGenerator();
// const ticket = ticketGenerator.generateMultiple(5);
// ticket.forEach((item, index) => {
//   console.log(`第${index + 1}注: ${item.format()}`);
// });
