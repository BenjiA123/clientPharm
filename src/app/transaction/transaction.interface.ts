export interface AppTransaction {

  transactionDate: {
    type: Date,
  },
  totalprice: {
    type: Number,
  },
  customerName: {
    type: String,
  },
  approved:{
    type:Boolean,   
  },

  drugs:[string],

  quantity:{
    type:[Number]
  },

  creator:{type:string},
  approver?:{
    type:string}
}