function sendDiscountEmail(user) {
  return new Promise(resolve => {
    return resolve(user);
  });
}

function sendUserBoughtProductEmail(user) {
  return new Promise(resolve => {
    return resolve(user);
  });
}

class MockEmailService {
  constructor() {
    this.sendDiscountEmail = jest.fn().mockImplementation(sendDiscountEmail);
    this.sendUserBoughtProductEmail = jest
      .fn()
      .mockImplementation(sendUserBoughtProductEmail);
  }
}

module.exports = MockEmailService;
