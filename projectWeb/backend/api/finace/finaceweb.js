/***
arquivos dos modelos de entrada e saida de pagamentos
*/
const restful = require('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  value: { type: Number, min:0, required: [true, "informe o valor do Credito"]}
})

const debtSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  value: { type: Number, min:0, required: [true, "informe o valor do Debito"]},
  status: { type: String, required: true, uppercase:true,
  enum: ['PAGO', 'PENDENTE', 'AGENDADO']}
})

const billingCycleSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  month: { type: Number, min:1, max: 12, required: true},
  year: {type: Number, min:1917, max: 2100, required: true},
  credits: [creditSchema],
  debts: [debtSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)
