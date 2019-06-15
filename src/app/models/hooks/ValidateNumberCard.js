function validateAndFormatTransaction (transaction) {
  transaction.numberCard = transaction.numberCard.substring(12, 16)
  return transaction
}

module.exports = { validateAndFormatTransaction }
