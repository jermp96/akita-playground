import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'no-entry-selected',
  template: `
    <div class="is-flex is-justify-content-center">
      <h1 class="has-text-centered">No entry selected</h1>
    </div>
  `
})

export class NoEntrySelectedComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}