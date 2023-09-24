import { Query } from "@datorama/akita";
import { DaybookState, DaybookStore, Entry } from "./daybook.store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class DaybookQuery extends Query<DaybookState> {
  constructor(protected override store: DaybookStore) {
    super(store)
  }

  entriesByTerm(term?: string): Observable<Array<Entry>> {
    return (!term || term.length === 0) 
    ? this.select(state => state.entries)
    : this.select(state => state.entries.filter(e => e.text.toLowerCase().includes(term!.toLowerCase())))
  }
}