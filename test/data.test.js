const { casesData } = require('../data/cases.js')
const { guidesData } = require('../data/guides.js')
const { quizData, quizCategories } = require('../data/quiz.js')

describe('数据验证测试', () => {
  describe('案例数据 (cases.js)', () => {
    test('案例数据应该是一个数组', () => {
      expect(Array.isArray(casesData)).toBe(true)
    })

    test('案例数据应该包含至少6个案例', () => {
      expect(casesData.length).toBeGreaterThanOrEqual(6)
    })

    test('每个案例应该包含必要的字段', () => {
      casesData.forEach(caseItem => {
        expect(caseItem).toHaveProperty('id')
        expect(caseItem).toHaveProperty('title')
        expect(caseItem).toHaveProperty('category')
        expect(caseItem).toHaveProperty('summary')
        expect(caseItem).toHaveProperty('imageUrl')
        expect(typeof caseItem.id).toBe('number')
        expect(typeof caseItem.title).toBe('string')
        expect(typeof caseItem.category).toBe('string')
        expect(typeof caseItem.summary).toBe('string')
      })
    })

    test('案例ID应该唯一', () => {
      const ids = casesData.map(c => c.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })
  })

  describe('指南数据 (guides.js)', () => {
    test('指南数据应该是一个数组', () => {
      expect(Array.isArray(guidesData)).toBe(true)
    })

    test('指南数据应该包含至少5个指南', () => {
      expect(guidesData.length).toBeGreaterThanOrEqual(5)
    })

    test('每个指南应该包含必要的字段', () => {
      guidesData.forEach(guide => {
        expect(guide).toHaveProperty('id')
        expect(guide).toHaveProperty('title')
        expect(guide).toHaveProperty('category')
        expect(guide).toHaveProperty('content')
        expect(typeof guide.id).toBe('number')
        expect(typeof guide.title).toBe('string')
      })
    })

    test('指南ID应该唯一', () => {
      const ids = guidesData.map(g => g.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })
  })

  describe('题库数据 (quiz.js)', () => {
    test('题库数据应该是一个数组', () => {
      expect(Array.isArray(quizData)).toBe(true)
    })

    test('题库数据应该包含至少15道题目', () => {
      expect(quizData.length).toBeGreaterThanOrEqual(15)
    })

    test('每道题目应该包含必要的字段', () => {
      quizData.forEach(question => {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('type')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('options')
        expect(question).toHaveProperty('answer')
        expect(question).toHaveProperty('analysis')
        expect(typeof question.id).toBe('number')
        expect(typeof question.type).toBe('string')
        expect(typeof question.question).toBe('string')
        expect(Array.isArray(question.options)).toBe(true)
        expect(typeof question.answer).toBe('string')
        expect(typeof question.analysis).toBe('string')
      })
    })

    test('题目ID应该唯一', () => {
      const ids = quizData.map(q => q.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })

    test('题目类型应该是有效的', () => {
      const validTypes = ['single', 'multiple', 'judge']
      quizData.forEach(question => {
        expect(validTypes).toContain(question.type)
      })
    })

    test('题目选项应该包含正确答案', () => {
      quizData.forEach(question => {
        const optionIds = question.options.map(opt => opt.id)
        const answerChars = question.answer.split('')
        answerChars.forEach(char => {
          expect(optionIds).toContain(char)
        })
      })
    })
  })

  describe('题库分类数据', () => {
    test('题库分类应该是一个数组', () => {
      expect(Array.isArray(quizCategories)).toBe(true)
    })

    test('题库分类应该包含至少7个分类', () => {
      expect(quizCategories.length).toBeGreaterThanOrEqual(7)
    })

    test('每个分类应该包含id和name', () => {
      quizCategories.forEach(category => {
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(typeof category.id).toBe('string')
        expect(typeof category.name).toBe('string')
      })
    })
  })
})
