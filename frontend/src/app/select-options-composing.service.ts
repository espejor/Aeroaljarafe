import { Injectable } from '@angular/core';
import { Option } from './interfaces/option.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectOptionsComposingService {

  constructor() { }

  composeOptions(optionsCollection:any,optionsSelectedArray:any[]){
      let options:Option[] = []
      // Creamos un array de opciones
      optionsCollection.forEach(option => {
          options.push({selected:false,option:option})
      })
  
      optionsSelectedArray.forEach(optionSelected => {
          let i = this.getIndex(options, optionSelected)   // buscamos la opción seleccionada en el array de opciones 
          if (i != -1)                                // Si La opción está seleccionada
              options[i].selected = true               // La marcamos como seleccionada    
      })
      return options
  }
  
  private getIndex(options, optionSelected){
      for (let i = 0; i < options.length; i++) {
          if (options[i].option._id.toString() == optionSelected.toString())
              return i
      }
      return -1
  }

  // Crea un array de Boolean que representa el valor de cada una de las opciones
  initItemArrayWithSelectedOptions(itemsArray:Option[]): boolean[]{
    let itemsSelected: boolean[] = [];
    for (let i = 0; i < itemsArray.length; i++) {
      itemsSelected.push(itemsArray[i].selected);
    }
    return itemsSelected
  }

  setSingleSelectedOption(itemsArray:Option[]): string{
    let itemsSelected: string;
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].selected){
            itemsSelected = itemsArray[i].option._id
            return itemsSelected
        }
    }
    return itemsSelected
  }


}
