import { Component, OnInit, inject } from '@angular/core';
import { DaybookQuery } from '../../state/daybook.query';

@Component({
  standalone: true,
  selector: 'entry-list',
  templateUrl: './entry-list.component.html'
})

export class EntryListComponent implements OnInit {
  daybookQuery = inject(DaybookQuery);

  constructor() { }

  ngOnInit() {
    this.daybookQuery.entriesByTerm().subscribe({
      next: (entries) => {
        console.log(entries);
      }
    })
  }
}