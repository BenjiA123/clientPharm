export interface Drug {
  _id:string
    genericName: string,
      brandName:string,
      type: {
        type: string,
        // enum: ["1", "2", "3"],
      },
      sellingPrice:number,
      costPrice:number,
      purchaseDate:Date,
      expiryDate:Date,
      expired: boolean,
      available: boolean
      amount: {
        type: Number,
      },
      sources:[string],


}