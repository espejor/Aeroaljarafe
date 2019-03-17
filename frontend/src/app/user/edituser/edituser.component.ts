import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "../user.model";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Option } from 'src/app/interfaces/option.interface';
import { ModelService } from 'src/app/body/model/model.service';
import { SelectOptionsComposingService } from 'src/app/select-options-composing.service';
import { ManageDataService } from 'src/app/manage-data.service';



@Component({
  selector: "app-edituser",
  templateUrl: "./edituser.component.html",
  styleUrls: ["./edituser.component.css"]
})
export class EdituserComponent implements OnInit {
  user: User = new User();
  modelsOptions: Option[];
  modelsSelected: boolean[] = [];
  form: FormGroup;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private modelService: ModelService,
    private selectOptionsComposingService:SelectOptionsComposingService,
    private dateManager:ManageDataService
    ) {
    this.getUser();
  }

  ngOnInit() {}

  getUser(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUser(id).subscribe((data) => {
      this.user = data.user;
      if (data.user.pilotData.dataExpirationLicence)
        this.user.pilotData.dataExpirationLicence = this.dateManager.setUpDateTypeForInputControl(data.user.pilotData.dataExpirationLicence)
      if (data.user.pilotData.dataExpeditionLicence)
        this.user.pilotData.dataExpeditionLicence = this.dateManager.setUpDateTypeForInputControl(data.user.pilotData.dataExpeditionLicence)
      if (data.user.pilotData.dataExpirationMedicalExamination)
        this.user.pilotData.dataExpirationMedicalExamination = this.dateManager.setUpDateTypeForInputControl(data.user.pilotData.dataExpirationMedicalExamination)
      // Obtenemos los Modelos para la selección y los convertimos en opciones
      this.modelService.getModels().subscribe((data) => {
        this.modelsOptions = this.selectOptionsComposingService.composeOptions(data.models,this.user.pilotData.aircraftsQualification)
        // Creamos el array de Opciones
        this.modelsSelected = this.selectOptionsComposingService.initItemArrayWithSelectedOptions(this.modelsOptions)
      })
    });          
  }


  updateAircraftsQualificationList(){
    for(let i = 0; i < this.modelsSelected.length; i++){
      let j = this.locateId(this.modelsOptions[i].option._id)
      if (this.modelsSelected[i]){
        if (j == -1)  // No Existe el id en el array
          this.user.pilotData.aircraftsQualification.push (this.modelsOptions[i].option._id)
      }else{  
        if (j != -1)  // Existe ya el id en el array
          this.user.pilotData.aircraftsQualification.splice(j,1)
      }
    }
  }

  private locateId(id: string): number{
    for(let i=0; i < this.user.pilotData.aircraftsQualification.length; i++)
      if (this.user.pilotData.aircraftsQualification[i] == id)
        return i
    return -1
  }

  saveUser(): void {
    console.log(this.modelsSelected)
    if (confirm("¿Estás seguro que deseas modificar el registro?")) {
      this.updateAircraftsQualificationList()
      this.userService.updateUser(this.user).subscribe(res => console.log(res));
    }
  }
}
