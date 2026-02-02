// pages/quiz/quiz.js
const { quizData, quizCategories } = require('../../data/quiz.js')

Page({
  data: {
    // 测试状态：'start' | 'testing' | 'result'
    quizStatus: 'start',
    // 分类
    categories: quizCategories,
    currentCategory: 'all',
    // 题目列表
    questions: [],
    // 当前题目索引
    currentIndex: 0,
    // 当前题目
    currentQuestion: null,
    // 用户答案 { questionId: 'A' | 'AB' | ... }
    userAnswers: {},
    // 当前选中的答案
    selectedOptions: [],
    // 选中状态映射（用于WXML判断）
    selectedMap: {},
    // 正确答案映射
    answerMap: {},
    // 是否已提交当前题目
    hasSubmitted: false,
    // 是否答对
    isCorrect: false,
    // 测试结果
    totalScore: 0,
    correctCount: 0,
    wrongQuestions: [],
    // 登录状态
    isLoggedIn: false
  },

  onLoad() {
    this.checkLoginStatus()
  },

  onShow() {
    this.checkLoginStatus()
    
    // 更新自定义tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false
    this.setData({ isLoggedIn })
    
    // 如果未登录且正在答题中，重置为开始页面
    if (!isLoggedIn && this.data.quizStatus !== 'start') {
      this.setData({
        quizStatus: 'start',
        questions: [],
        currentIndex: 0,
        currentQuestion: null,
        userAnswers: {},
        selectedOptions: [],
        selectedMap: {},
        answerMap: {},
        hasSubmitted: false,
        isCorrect: false,
        totalScore: 0,
        correctCount: 0,
        wrongQuestions: []
      })
    }
  },

  // 选择分类
  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ currentCategory: id })
  },

  // 开始测试
  onStartQuiz() {
    // 检查登录状态
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '需要登录后才能进行知识测试，是否前往登录？',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.onLogin()
          }
        }
      })
      return
    }

    const { currentCategory } = this.data
    let questions = []
    
    if (currentCategory === 'all') {
      // 随机抽取10道题
      questions = this.shuffleArray([...quizData]).slice(0, 10)
    } else {
      // 筛选该分类的题目
      const filtered = quizData.filter(q => q.category === currentCategory)
      questions = this.shuffleArray([...filtered]).slice(0, Math.min(10, filtered.length))
    }

    if (questions.length === 0) {
      wx.showToast({
        title: '该分类暂无题目',
        icon: 'none'
      })
      return
    }

    // 构建第一题的答案映射
    const firstQuestion = questions[0]
    const answerMap = {}
    firstQuestion.answer.split('').forEach(a => {
      answerMap[a] = true
    })

    this.setData({
      quizStatus: 'testing',
      questions,
      currentIndex: 0,
      currentQuestion: firstQuestion,
      userAnswers: {},
      selectedOptions: [],
      selectedMap: {},
      answerMap: answerMap,
      hasSubmitted: false
    })
  },

  // 登录
  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
      fail: () => {
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 打乱数组
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  },

  // 选择选项
  onOptionTap(e) {
    if (this.data.hasSubmitted) return

    const { id } = e.currentTarget.dataset
    const { currentQuestion, selectedOptions } = this.data
    let newSelectedOptions = []
    let selectedMap = {}

    if (currentQuestion.type === 'single' || currentQuestion.type === 'judge') {
      // 单选题/判断题
      newSelectedOptions = [id]
      selectedMap = { [id]: true }
    } else if (currentQuestion.type === 'multiple') {
      // 多选题
      const index = selectedOptions.indexOf(id)
      if (index > -1) {
        selectedOptions.splice(index, 1)
      } else {
        selectedOptions.push(id)
      }
      newSelectedOptions = [...selectedOptions]
      newSelectedOptions.forEach(opt => {
        selectedMap[opt] = true
      })
    }

    this.setData({ 
      selectedOptions: newSelectedOptions,
      selectedMap: selectedMap
    })
  },

  // 提交答案
  onSubmitAnswer() {
    const { selectedOptions, currentQuestion, userAnswers } = this.data

    if (selectedOptions.length === 0) {
      wx.showToast({
        title: '请选择答案',
        icon: 'none'
      })
      return
    }

    // 排序后拼接答案
    const userAnswer = [...selectedOptions].sort().join('')
    const correctAnswer = currentQuestion.answer

    const isCorrect = userAnswer === correctAnswer

    // 保存用户答案
    userAnswers[currentQuestion.id] = userAnswer

    this.setData({
      hasSubmitted: true,
      isCorrect,
      userAnswers
    })
  },

  // 下一题
  onNextQuestion() {
    const { currentIndex, questions } = this.data

    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      const nextQuestion = questions[nextIndex]
      
      // 构建下一题的答案映射
      const answerMap = {}
      nextQuestion.answer.split('').forEach(a => {
        answerMap[a] = true
      })

      this.setData({
        currentIndex: nextIndex,
        currentQuestion: nextQuestion,
        selectedOptions: [],
        selectedMap: {},
        answerMap: answerMap,
        hasSubmitted: false,
        isCorrect: false
      })
    } else {
      // 测试结束，计算结果
      this.calculateResult()
    }
  },

  // 计算测试结果
  calculateResult() {
    const { questions, userAnswers } = this.data
    let correctCount = 0
    const wrongQuestions = []

    questions.forEach(q => {
      const userAnswer = userAnswers[q.id] || ''
      if (userAnswer === q.answer) {
        correctCount++
      } else {
        wrongQuestions.push({
          ...q,
          userAnswer
        })
      }
    })

    const totalScore = Math.round((correctCount / questions.length) * 100)

    this.setData({
      quizStatus: 'result',
      totalScore,
      correctCount,
      wrongQuestions
    })
  },

  // 重新测试
  onRestartQuiz() {
    this.setData({
      quizStatus: 'start',
      questions: [],
      currentIndex: 0,
      currentQuestion: null,
      userAnswers: {},
      selectedOptions: [],
      selectedMap: {},
      answerMap: {},
      hasSubmitted: false,
      isCorrect: false,
      totalScore: 0,
      correctCount: 0,
      wrongQuestions: []
    })
  },

  // 返回首页
  onGoHome() {
    wx.switchTab({
      url: '/pages/index/index',
      fail: () => {
        wx.showToast({ title: '页面跳转失败', icon: 'none' })
      }
    })
  },

  // 分享
  onShareAppMessage() {
    const { quizStatus, totalScore } = this.data
    if (quizStatus === 'result') {
      return {
        title: `我在反诈知识测试中得了${totalScore}分，你也来试试！`,
        path: '/pages/quiz/quiz'
      }
    }
    return {
      title: '反诈知识测试 - 测测你的防骗能力',
      path: '/pages/quiz/quiz'
    }
  }
})
