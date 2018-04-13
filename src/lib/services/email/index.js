class EmailService {
  sendDiscountEmail(user) {
    return new Promise(resolve => {
      return resolve(user);
    });
  }

  sendUserBoughtProductEmail(user) {
    return new Promise(resolve => {
      return resolve(user);
    });
  }
}

module.exports = EmailService;
