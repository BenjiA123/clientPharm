import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DrugsService } from 'src/app/drugs/drugs.service';
import { SourcesService } from 'src/app/sources/sources.service';

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.scss']
})
export class CreateDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private drugsService: DrugsService, private sourceService: SourcesService) { }

  public createDrugFields: any[] = [
    {
      name: "genericName", placeholder: "Generic Name", type: "string", label: "Generic Name"
    },
    {
      name: "brandName", placeholder: "Brand Name", type: "string", label: "Brand Name"
    },
    {
      name: "sellingPrice", placeholder: "Selling Price", type: "number", label: "Sellong Price"
    },
    {
      name: "costPrice", placeholder: "Cost Price", type: "number", label: "Cost Price"
    },
    {
      name: "expiryDate", placeholder: "Expiry Date", type: "date", label: "Expiry Date"
    },
    {
      name: "amount", placeholder: "Amount", type: "number", label: "Amount"
    },
    {
      name: "sources", placeholder: "Sources", type: "string", label: "Source"
    },

  ]


  public createSourceData: any[] = [
    {
      name: "name", placeholder: "Name", type: "string", label: "Name"
    },
    {
      name: "address", placeholder: "Address", type: "textarea", label: "Brand Name"
    },
    {
      name: "purchaseDate", placeholder: "Purchase Date", type: "date", label: "Purchase Date"
    },
    {
      name: "drug", placeholder: "Drugs", type: "string", label: "Drug"
    },

  ]

  currentRoute: any
  ngOnInit(): void {
    this.currentRoute
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRoute = params['detail']

        }
      )

  }

  async createDrug(drugForm: NgForm): Promise<any> {

    if (drugForm.invalid) {
      return
    }
    const fVal = drugForm.form.value
    const createDrugData = {
      amount: fVal.amount,
      brandName: fVal.brandName,
      costPrice: fVal.costPrice,
      expiryDate: fVal.expiryDate,
      genericName: fVal.genericName,
      sellingPrice: fVal.sellingPrice,
      sources: fVal.sources,
      type: fVal.type
    }

    try {
      await this.drugsService.createOneDrug(createDrugData).toPromise()
      alert("Drug CREATED")
    } catch (error) {
      throw (error)

    }
  }

  async createSource(sourceForm: NgForm) {


    if (sourceForm.invalid) {
      return
    }
    const fVal = sourceForm.form.value
    const createSourceData = {
      name: fVal.name,
      address: fVal.address,
      date: fVal.date,
      drug: fVal.drug,

    }

    try {
      await this.sourceService.createSource(createSourceData).toPromise()
      alert("Source CREATED")
    } catch (error) {
      throw (error)
    }
  }
}
