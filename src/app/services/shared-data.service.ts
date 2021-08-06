import { Injectable } from '@angular/core';
import {Poste} from "@/Model/Poste";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  posteShared : Poste;

  constructor() { }

  public setPosteShared(poste:Poste){
    this.posteShared=poste;
  }

  public getPosteShared(){
    return this.posteShared;
  }

}
