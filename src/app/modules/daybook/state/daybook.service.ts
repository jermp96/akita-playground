import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DaybookStore, Entry } from './daybook.store';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DaybookService {
  private baseUrl = environment.apiUrl;
  
  private httpClient = inject(HttpClient);
  private daybookStore = inject(DaybookStore);
  private router = inject(Router);
  

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
        this.daybookStore.add([...entries])
      }
    });
  }

  createEntry(payload: Entry): void {
    this.httpClient.post(`${this.baseUrl}/entries.json`, payload)
      .subscribe({
        next: (data: any) => {
          if(data) {
            payload = {id: data.name, ...payload};
            this.daybookStore.add(payload, {prepend: true});
            this.router.navigate(['/daybook', payload.id]);
          }
        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}