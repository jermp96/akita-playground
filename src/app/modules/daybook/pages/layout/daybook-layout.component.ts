import { Component, OnInit, inject } from '@angular/core';
import { EntryListComponent } from '../../components/entry-list/entry-list.component';
import { DaybookService } from '../../state/daybook.service';

@Component({
  standalone: true,
  selector: 'daybook-layout',
  imports: [
    EntryListComponent
  ],
  templateUrl: './daybook-layout.component.html'
})

export class DaybookLayoutComponent implements OnInit {
  daybookService = inject(DaybookService);
  constructor() { }

  ngOnInit() {
    this.daybookService.loadEntries();
  }
}