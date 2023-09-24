import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DaybookStore, Entry } from './daybook.store';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DaybookService {
  private httpClient = inject(HttpClient);
  private daybookStore = inject(DaybookStore);
  private baseUrl = environment.apiUrl;

  constructor() { }
  
  loadEntries(): void {
    let entries: Array<Entry> = [];
    this.httpClient.get(`${this.baseUrl}/entries.json`).subscribe({
      next: (data: any) => {
        if(!data) {
          entries = [];
        }
        if(data) {
          for(const id of Object.keys(data)) {
            const entry = {id, ...data[id]}
            entries.push(entry)
          }
        }
        this.daybookStore.update({entries})
      }
    });
  }
}