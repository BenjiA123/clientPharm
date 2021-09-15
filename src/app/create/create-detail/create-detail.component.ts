import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.scss']
})
export class CreateDetailComponent implements OnInit {

  constructor(private route :ActivatedRoute) { }

  public createDrugData:any[] =[

    {
      url:"drug"
    },
    {
      header:"Drug"
    },
    {
      drugFields:[

        {
          name:"genericName",placeholder:"Generic Name",type:"string",label:"Generic Name"
        },
        {
          name:"brandName",placeholder:"Brand Name",type:"string",label:"Brand Name"
        },
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
    }

  ]

  currentRoute:any
  ngOnInit(): void {
    this.currentRoute
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.currentRoute = params['detail']
        console.log(this.currentRoute)

      }
    )

  }

  createDrug(drugForm){
    console.log(drugForm)
  }
}
