import { Component, OnInit, inject } from '@angular/core';
import { DaybookQuery } from '../../state/daybook.query';
import { EntryComponent } from '../entry/entry.component';
import { CommonModule } from '@angular/common';
import { Entry } from '../../state/daybook.store';
import { Router } from '@angular/router';

const COMPONENTS = [EntryComponent];
@Component({
  standalone: true,
  selector: 'entry-list',
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})

export class EntryListComponent implements OnInit {
  
  private daybookQuery = inject(DaybookQuery);
  private router = inject(Router);

  public entries: Array<Entry> = [];

  constructor() { }

  ngOnInit() {
    this.daybookQuery.entriesByTerm().subscribe({
      next: (entries) => {
        this.entries = entries;
      }
    })
  }

  onNewEntry(): void {
    this.router.navigate(['/daybook', 'new']);
  }
}