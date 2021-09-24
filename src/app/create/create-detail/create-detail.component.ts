import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Drug } from 'src/app/drugs/drugs.interface';
import { DrugsService } from 'src/app/drugs/drugs.service';
import { SourcesService } from 'src/app/sources/sources.service';
import { environment } from "../../../environments/environment"



import { io } from "socket.io-client";
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import { Source } from 'src/app/sources/sources.interface';

const socket = io(environment.baseUrl);

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.scss']
})
export class CreateDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private drugsService: DrugsService,
    private sourceService: SourcesService,
    private _dialog: MatDialog) { }

  public currentRoute: any
  public sources: any
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

  ]


  public createSourceData: any[] = [
    {
      name: "name", placeholder: "Name", type: "string", label: "Name"
    },
    {
      name: "address", placeholder: "Address", type: "textarea", label: "Address"
    },
    {
      name: "purchaseDate", placeholder: "Purchase Date", type: "date", label: "Purchase Date"
    },


  ]

  public drugsForSource: Drug[] = [

  ]

  public selectedDrugsQueue: any[] = [

  ]

  addToQueue(form: NgForm) {
    if (form.invalid) {

      this._dialog.open(DialogMessageComponent, {
        data: { message: "Invalid Drug" }
      })
      return
    }
    if (this.selectedDrugsQueue.length > 0) {
      this.selectedDrugsQueue = this.selectedDrugsQueue.filter(transData => transData.drugId != form.form.value.drug.drugId)

    }

    const drugData = {
      drugId: form.form.value.drug.drugId,
      quantity: form.form.value.quantity

    }
    this.selectedDrugsQueue.push(drugData)
  }

  public selectedDrugsArray: any[] = []
  searchField(searchText: string) {
    socket.emit("searchDrug", searchText);

    socket.on("drugSearchResult", (searchResult: Drug[]) => {
      this.drugsForSource = searchResult
    })

  }

  selectDrugs(drugId: string, genericName: string) {
    if (this.selectedDrugsArray.length > 0) {
      this.selectedDrugsArray = this.selectedDrugsArray.filter(selectedDrugs => selectedDrugs.drugId != drugId)

    }
    this.selectedDrugsArray.push({ drugId, genericName })
  }

  unSelectDrug(unselectId: string) {
    this.selectedDrugsQueue = this.selectedDrugsQueue.filter(drug => drug.drugId != unselectId)
    this.selectedDrugsArray = this.selectedDrugsArray.filter(selectedDrug => selectedDrug.drugId != unselectId)
  }


  getAllSources() {
    socket.emit("getSources");

    socket.on("sourceResult", (sources: Source[]) => {
      this.sources = sources
    })

  }


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
    if (fVal.sellingPrice * 1 < fVal.costPrice * 1) {
      this._dialog.open(DialogMessageComponent, {
        data: { message: "Selling Price must be more than cost price" }
      })
      return
    }
    const createDrugData = {
      amount: fVal.amount,
      brandName: fVal.brandName,
      costPrice: fVal.costPrice,
      expiryDate: fVal.expiryDate,
      genericName: fVal.genericName,
      sellingPrice: fVal.sellingPrice,
      sources: fVal.source,
      type: fVal.type
    }

    try {
      await this.drugsService.createOneDrug(createDrugData).toPromise()
      this._dialog.open(DialogMessageComponent, {
        data: { message: "Drug Created" }
      })
    } catch (error) {
      throw (error)

    }
  }

  async createSource(sourceForm: NgForm) {


    if (sourceForm.invalid) {
      // return
    }
    const fVal = sourceForm.form.value
    const createSourceData = {
      name: fVal.name,
      address: fVal.address,
      purchaseDate: fVal.purchaseDate,
      drugs: this.selectedDrugsQueue,

    }

    try {
      await this.sourceService.createSource(createSourceData).toPromise()
      this._dialog.open(DialogMessageComponent, {
        data: { message: "Source Created" }
      })
    } catch (error) {
    }
  }
}
