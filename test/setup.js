global.wx = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showToast: jest.fn(),
  showModal: jest.fn((options) => {
    if (options.success) {
      options.success({ confirm: true })
    }
  }),
  navigateTo: jest.fn(),
  switchTab: jest.fn(),
  makePhoneCall: jest.fn(),
  getStorageSync: jest.fn(() => []),
  setStorageSync: jest.fn(),
  removeStorageSync: jest.fn(),
  clearStorageSync: jest.fn()
}
