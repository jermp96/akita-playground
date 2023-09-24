import { Component, Input, OnInit, inject } from '@angular/core';
import { Entry } from '../../state/daybook.store';
import { CommonModule } from '@angular/common';
import getDayMonthYear from '../../helpers/getDayMonthYear';
import { Router } from '@angular/router';

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

  private router = inject(Router);

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

  goToEntry(): void {
    this.router.navigate(['/daybook', this.entry?.id]);
  }
}