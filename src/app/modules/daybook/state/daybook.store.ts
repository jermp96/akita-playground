import { Injectable } from "@angular/core";
import { EntityState, EntityStore, Store, StoreConfig } from "@datorama/akita";

export interface Entry {
  id?: string;
  date: string
  text: string;
}

export interface DaybookState extends EntityState<Entry, string> {
  isLoading: boolean;
}

export const createInitialState = (): DaybookState => {
  return{
    isLoading: true,
  }
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'daybook'})
export class DaybookStore extends EntityStore<DaybookState> {
  constructor(){
    super(createInitialState())
  }
}