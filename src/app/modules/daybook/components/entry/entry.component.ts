import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '../../state/daybook.store';
import getDayMonthYear from '../../helpers/getDayMonthYear';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})

export class EntryComponent implements OnInit {
  @Input() entry: Entry | null = null;

  public entryDate: {day: number, month: string, yearDay: string} | null = null;
  public shorText = '';

  constructor() { }

  ngOnInit() {
    if(this.entry) {
      this.entryDate = getDayMonthYear(this.entry.date);
      this.shorText = this.entry.text.length > 30
      ? this.entry.text.substring(0, 130) + '...'
      : this.entry.text;
    }
  }
}