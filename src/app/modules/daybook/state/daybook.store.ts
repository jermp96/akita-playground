import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface DaybookState {
  entries: Array<Entry>
}

export interface Entry {
  id?: string;
  date: string
  text: string;
}

export const createInitialState = (): DaybookState => {
  return{
    entries: []
  }
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'daybook'})
export class DaybookStore extends Store<DaybookState> {
  constructor(){
    super(createInitialState())
  }
}