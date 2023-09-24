import { Query, QueryEntity } from "@datorama/akita";
import { DaybookState, DaybookStore, Entry } from "./daybook.store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class DaybookQuery extends QueryEntity<DaybookState> {

  constructor(protected override store: DaybookStore) {
    super(store)
  }

  entriesByTerm(term?: string): Observable<Array<Entry>> {
    return (!term || term.length === 0)
     ? this.selectAll()
     : this.selectAll({
        filterBy: (entity) => entity.text.toLowerCase().includes(term.toLowerCase())
      })
  }

  entryById(id: string): Observable<Entry | undefined>  {
    return this.selectEntity(e => e.id === id);
  }
}