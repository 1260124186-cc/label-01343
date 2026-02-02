// 反诈知识测试题库
const quizData = [
  {
    id: 1,
    type: 'single', // single: 单选, multiple: 多选, judge: 判断
    question: '收到陌生短信称你中奖了，需要先缴纳"个税"才能领奖，你应该？',
    options: [
      { id: 'A', text: '按要求缴纳税款，领取奖品' },
      { id: 'B', text: '不理会，这是典型的中奖诈骗' },
      { id: 'C', text: '把链接转发给朋友，让他们也来领奖' },
      { id: 'D', text: '添加对方好友详细了解' }
    ],
    answer: 'B',
    analysis: '正规的中奖活动不会要求先缴纳任何费用。凡是先交钱后领奖的，都是诈骗！',
    difficulty: 'easy',
    category: 'prize'
  },
  {
    id: 2,
    type: 'single',
    question: '在QQ群看到"刷单返利"兼职广告，每单可赚取10%佣金，你应该？',
    options: [
      { id: 'A', text: '先试试小额订单，赚点零花钱' },
      { id: 'B', text: '不参与，刷单本身就是违法行为' },
      { id: 'C', text: '介绍给其他同学一起做' },
      { id: 'D', text: '下载对方推荐的刷单App' }
    ],
    answer: 'B',
    analysis: '刷单是违法行为，所有刷单返利都是诈骗套路。骗子会先用小额返利取得信任，然后诱骗你加大投入。',
    difficulty: 'easy',
    category: 'shuadan'
  },
  {
    id: 3,
    type: 'single',
    question: '有人声称可以提供"低息校园贷"，只需提供学生证和身份证照片，你应该？',
    options: [
      { id: 'A', text: '提供资料，先借一点试试' },
      { id: 'B', text: '拒绝，不向非正规平台泄露个人信息' },
      { id: 'C', text: '只提供学生证，不提供身份证' },
      { id: 'D', text: '让同学帮忙办理' }
    ],
    answer: 'B',
    analysis: '非正规校园贷陷阱多，可能面临高额利息、暴力催收等问题。需要借款请通过正规银行渠道。',
    difficulty: 'easy',
    category: 'loan'
  },
  {
    id: 4,
    type: 'single',
    question: '班级群里"辅导员"发消息要求缴纳580元资料费，你应该？',
    options: [
      { id: 'A', text: '立即扫码转账，老师说的肯定没错' },
      { id: 'B', text: '先打电话给辅导员本人核实' },
      { id: 'C', text: '在群里问其他同学是否已经交了' },
      { id: 'D', text: '私聊"辅导员"确认' }
    ],
    answer: 'B',
    analysis: '骗子会盗用或仿冒老师的头像昵称实施诈骗。任何涉及缴费的通知，都要先打电话给老师本人核实。',
    difficulty: 'medium',
    category: 'impersonate'
  },
  {
    id: 5,
    type: 'single',
    question: '接到电话称你的快递丢失可以双倍赔偿，对方准确报出了你的订单信息，你应该？',
    options: [
      { id: 'A', text: '相信对方，按要求填写银行卡信息领取赔偿' },
      { id: 'B', text: '挂断电话，通过官方渠道核实' },
      { id: 'C', text: '把验证码告诉对方完成退款' },
      { id: 'D', text: '点击对方发来的链接查看详情' }
    ],
    answer: 'B',
    analysis: '骗子通过非法渠道获取订单信息。正规退款流程不需要填写银行卡密码和验证码，请通过官方App操作。',
    difficulty: 'medium',
    category: 'refund'
  },
  {
    id: 6,
    type: 'single',
    question: '想买一个游戏账号，卖家要求私下交易"省手续费"，你应该？',
    options: [
      { id: 'A', text: '同意私下交易，省钱嘛' },
      { id: 'B', text: '坚持通过正规平台担保交易' },
      { id: 'C', text: '先付一半定金试试' },
      { id: 'D', text: '让对方先发账号密码' }
    ],
    answer: 'B',
    analysis: '私下交易风险极高，卖家可能收款后不发货，或者通过实名找回账号。请通过正规平台担保交易。',
    difficulty: 'medium',
    category: 'game'
  },
  {
    id: 7,
    type: 'judge',
    question: '接到自称"公安局"的电话说你涉嫌犯罪，要求将钱转入"安全账户"配合调查，这是真的。',
    options: [
      { id: 'A', text: '正确' },
      { id: 'B', text: '错误' }
    ],
    answer: 'B',
    analysis: '公安机关不会通过电话办案，更不会要求将钱转入所谓的"安全账户"。这是典型的冒充公检法诈骗！',
    difficulty: 'easy',
    category: 'impersonate'
  },
  {
    id: 8,
    type: 'judge',
    question: '银行发来的短信验证码可以告诉"客服"用于退款。',
    options: [
      { id: 'A', text: '正确' },
      { id: 'B', text: '错误' }
    ],
    answer: 'B',
    analysis: '银行验证码是资金安全的最后防线，任何人以任何理由索要验证码都是诈骗！正规退款不需要验证码。',
    difficulty: 'easy',
    category: 'refund'
  },
  {
    id: 9,
    type: 'judge',
    question: '刷单兼职只要不投入太多钱，小赚一笔还是可以的。',
    options: [
      { id: 'A', text: '正确' },
      { id: 'B', text: '错误' }
    ],
    answer: 'B',
    analysis: '刷单本身就是违法行为！骗子会先用小额返利"养鱼"，取得信任后再诱骗你加大投入。一旦参与，必被骗！',
    difficulty: 'easy',
    category: 'shuadan'
  },
  {
    id: 10,
    type: 'multiple',
    question: '以下哪些是网络诈骗的常见特征？（多选）',
    options: [
      { id: 'A', text: '承诺高额回报，轻松赚钱' },
      { id: 'B', text: '要求先付款或转账' },
      { id: 'C', text: '索要银行卡、验证码等敏感信息' },
      { id: 'D', text: '催促你立即行动，不给思考时间' }
    ],
    answer: 'ABCD',
    analysis: '这些都是诈骗的常见特征！遇到类似情况要提高警惕，冷静思考，不要轻易相信。',
    difficulty: 'medium',
    category: 'general'
  },
  {
    id: 11,
    type: 'multiple',
    question: '发现被诈骗后，应该怎么做？（多选）',
    options: [
      { id: 'A', text: '保留聊天记录、转账记录等证据' },
      { id: 'B', text: '立即报警，拨打110' },
      { id: 'C', text: '联系银行冻结账户' },
      { id: 'D', text: '在网上找"黑客"帮忙追回' }
    ],
    answer: 'ABC',
    analysis: '被骗后要保留证据、及时报警、联系银行止损。网上的"黑客追回"是二次诈骗，千万不要相信！',
    difficulty: 'medium',
    category: 'help'
  },
  {
    id: 12,
    type: 'single',
    question: '朋友在微信上突然向你借钱，声称急用，你应该？',
    options: [
      { id: 'A', text: '立即转账，朋友有难当然要帮' },
      { id: 'B', text: '先打电话或视频通话确认是本人' },
      { id: 'C', text: '让对方发个红包确认身份' },
      { id: 'D', text: '问几个只有朋友知道的问题' }
    ],
    answer: 'B',
    analysis: '微信账号可能被盗或被冒充。涉及借钱一定要电话或视频确认是本人，文字聊天无法确认真实身份。',
    difficulty: 'medium',
    category: 'impersonate'
  },
  {
    id: 13,
    type: 'single',
    question: '全国统一的反诈预警劝阻电话是？',
    options: [
      { id: 'A', text: '110' },
      { id: 'B', text: '96110' },
      { id: 'C', text: '12345' },
      { id: 'D', text: '120' }
    ],
    answer: 'B',
    analysis: '96110是全国统一的反诈预警劝阻电话，如果你接到96110的电话，说明你可能正在遭遇诈骗，请立即停止转账！',
    difficulty: 'easy',
    category: 'general'
  },
  {
    id: 14,
    type: 'judge',
    question: '在正规游戏交易平台购买账号是绝对安全的。',
    options: [
      { id: 'A', text: '正确' },
      { id: 'B', text: '错误' }
    ],
    answer: 'B',
    analysis: '即使在正规平台，也存在卖家找回账号的风险。交易前要详细核实账号信息，选择有保障的担保交易。',
    difficulty: 'hard',
    category: 'game'
  },
  {
    id: 15,
    type: 'multiple',
    question: '保护个人信息安全，以下做法正确的是？（多选）',
    options: [
      { id: 'A', text: '不在陌生网站填写银行卡、身份证信息' },
      { id: 'B', text: '定期修改重要账号密码' },
      { id: 'C', text: '不随意点击陌生链接' },
      { id: 'D', text: '在社交平台晒身份证、机票等证件' }
    ],
    answer: 'ABC',
    analysis: '保护个人信息非常重要！不要在陌生网站填写敏感信息，不要点击陌生链接，更不要在网上晒证件照片。',
    difficulty: 'easy',
    category: 'general'
  }
];

// 题目分类
const quizCategories = [
  { id: 'all', name: '综合测试' },
  { id: 'shuadan', name: '刷单返利' },
  { id: 'loan', name: '校园贷' },
  { id: 'impersonate', name: '冒充身份' },
  { id: 'game', name: '游戏交易' },
  { id: 'refund', name: '网购退款' },
  { id: 'general', name: '基础知识' }
];

module.exports = {
  quizData,
  quizCategories
};
