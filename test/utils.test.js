const {
  formatTime,
  formatDate,
  formatNumber,
  debounce,
  throttle
} = require('../utils/util.js')

describe('工具函数测试', () => {
  describe('formatNumber 函数', () => {
    test('个位数应该补零', () => {
      expect(formatNumber(5)).toBe('05')
      expect(formatNumber(0)).toBe('00')
      expect(formatNumber(9)).toBe('09')
    })

    test('两位数及以上不应该补零', () => {
      expect(formatNumber(10)).toBe('10')
      expect(formatNumber(99)).toBe('99')
      expect(formatNumber(100)).toBe('100')
    })

    test('字符串数字也应该正确处理', () => {
      expect(formatNumber('5')).toBe('05')
      expect(formatNumber('12')).toBe('12')
    })
  })

  describe('formatTime 函数', () => {
    test('应该正确格式化时间', () => {
      const date = new Date(2024, 0, 15, 10, 5, 30)
      const formatted = formatTime(date)
      expect(formatted).toBe('2024/01/15 10:05:30')
    })

    test('应该正确处理个位数的月份、日期、时分秒', () => {
      const date = new Date(2024, 1, 5, 3, 2, 1)
      const formatted = formatTime(date)
      expect(formatted).toBe('2024/02/05 03:02:01')
    })
  })

  describe('formatDate 函数', () => {
    test('应该正确格式化日期对象', () => {
      const date = new Date(2024, 0, 15)
      const formatted = formatDate(date)
      expect(formatted).toBe('2024-01-15')
    })

    test('应该正确格式化日期字符串', () => {
      const formatted = formatDate('2024-01-15')
      expect(formatted).toBe('2024-01-15')
    })

    test('应该正确处理个位数的月份和日期', () => {
      const date = new Date(2024, 1, 5)
      const formatted = formatDate(date)
      expect(formatted).toBe('2024-02-05')
    })
  })

  describe('debounce 防抖函数', () => {
    jest.useFakeTimers()

    test('应该延迟执行函数', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('快速多次调用应该只执行最后一次', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('应该使用默认延迟时间', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn)

      debouncedFn()
      jest.advanceTimersByTime(300)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    afterAll(() => {
      jest.useRealTimers()
    })
  })

  describe('throttle 节流函数', () => {
    let nowSpy
    let currentTime = 0

    beforeEach(() => {
      currentTime = 0
      nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => currentTime)
    })

    afterEach(() => {
      nowSpy.mockRestore()
    })

    test('应该限制函数调用频率', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      currentTime = 100
      throttledFn()
      currentTime = 150
      throttledFn()
      currentTime = 199
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      currentTime = 200
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    test('应该使用默认间隔时间', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn)

      currentTime = 300
      throttledFn()
      currentTime = 400
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      currentTime = 600
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })
})
