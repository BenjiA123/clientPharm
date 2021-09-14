import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.scss']
})
export class CreateDetailComponent implements OnInit {

  constructor() { }
  public fields:any[]= [

    {
      name:"genericName",placeholder:"Generic Name",type:"string",label:"Generic Name"
    },
    {
      name:"brandName",placeholder:"Brand Name",type:"string",label:"Brand Name"
    },
    // {
    //   name:"type",placeholder:"Type",type:"select",label:"Type"
    // },
    {
      name:"sellingPrice",placeholder:"Selling Price",type:"number",label:"Sellong Price"
    },
    {
      name:"costPrice",placeholder:"Cost Price",type:"number",label:"Cost Price"
    },
    {
      name:"expiryDate",placeholder:"Expiry Date",type:"date",label:"Expiry Date"
    },
    {
      name:"amount",placeholder:"Amount",type:"number",label:"Amount"
    },
    {
      name:"sources",placeholder:"Sources",type:"string",label:"Source"
    },
  ]

  ngOnInit(): void {
  }

  createDrug(drugForm){
    console.log(drugForm)
  }
}
