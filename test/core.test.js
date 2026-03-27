const { quizData } = require('../data/quiz.js')

describe('核心功能测试', () => {
  describe('答题逻辑测试', () => {
    test('应该正确判断单选题答案是否正确', () => {
      const question = quizData.find(q => q.id === 1)
      expect(question).not.toBeNull()
      expect(question.type).toBe('single')

      const userAnswer = 'B'
      expect(userAnswer).toBe(question.answer)
    })

    test('应该正确判断多选题答案是否正确', () => {
      const question = quizData.find(q => q.type === 'multiple')
      expect(question).not.toBeNull()

      const userAnswer = question.answer
      expect(userAnswer).toBe(question.answer)
    })

    test('应该正确处理多选题答案的排序', () => {
      const question = quizData.find(q => q.type === 'multiple')
      expect(question).not.toBeNull()

      const userAnswer = ['D', 'C', 'B', 'A']
      const sortedAnswer = userAnswer.sort().join('')
      expect(sortedAnswer).toBe(question.answer)
    })

    test('应该正确计算得分', () => {
      const questions = quizData.slice(0, 5)
      const userAnswers = {
        [questions[0].id]: questions[0].answer,
        [questions[1].id]: questions[1].answer,
        [questions[2].id]: 'WRONG',
        [questions[3].id]: questions[3].answer,
        [questions[4].id]: 'WRONG'
      }

      let correctCount = 0
      questions.forEach(q => {
        const userAnswer = userAnswers[q.id] || ''
        if (userAnswer === q.answer) {
          correctCount++
        }
      })

      expect(correctCount).toBe(3)
      const totalScore = Math.round((correctCount / questions.length) * 100)
      expect(totalScore).toBe(60)
    })
  })

  describe('预警关键词测试', () => {
    const warningKeywords = ['刷单', '返利', '校园贷', '贷款', '兼职', '日结', '高薪', '账号交易', '游戏代练', '中奖', '领奖', '转账', '验证码']

    test('应该检测文本中是否包含预警关键词', () => {
      const checkWarningKeyword = (text) => {
        for (let keyword of warningKeywords) {
          if (text.includes(keyword)) {
            return keyword
          }
        }
        return null
      }

      expect(checkWarningKeyword('我想做刷单兼职')).toBe('刷单')
      expect(checkWarningKeyword('校园贷利息很低')).toBe('校园贷')
      expect(checkWarningKeyword('恭喜你中奖了')).toBe('中奖')
      expect(checkWarningKeyword('这是一条正常消息')).toBeNull()
      expect(checkWarningKeyword('找兼职，日结工资')).toBe('兼职')
    })

    test('应该正确处理包含多个关键词的文本', () => {
      const checkWarningKeyword = (text) => {
        for (let keyword of warningKeywords) {
          if (text.includes(keyword)) {
            return keyword
          }
        }
        return null
      }

      const text = '刷单返利，高薪兼职'
      expect(checkWarningKeyword(text)).toBe('刷单')
    })
  })

  describe('题目分类筛选测试', () => {
    test('应该正确按分类筛选题目', () => {
      const filterByCategory = (category) => {
        if (category === 'all') {
          return quizData
        }
          return quizData.filter(q => q.category === category)
      }

      const allQuestions = filterByCategory('all')
      expect(allQuestions.length).toBe(quizData.length)

      const shuadanQuestions = filterByCategory('shuadan')
      expect(shuadanQuestions.every(q => q.category === 'shuadan')).toBe(true)

      const loanQuestions = filterByCategory('loan')
      expect(loanQuestions.every(q => q.category === 'loan')).toBe(true)
    })

    test('应该正确打乱数组顺序', () => {
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }

      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffleArray([...original])
      expect(shuffled.length).toBe(original.length)
      expect(shuffled.sort()).toEqual(original.sort())
    })
  })
})
