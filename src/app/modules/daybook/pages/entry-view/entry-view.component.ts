import { Component, OnInit, inject } from '@angular/core';
import { DaybookQuery } from '../../state/daybook.query';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import getDayMonthYear from '../../helpers/getDayMonthYear';
import { Entry } from '../../state/daybook.store';
import { tap } from 'rxjs';
import { DaybookService } from '../../state/daybook.service';

@Component({
  standalone: true,
  selector: 'entry-view',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss']
})

export class EntryViewComponent implements OnInit {

  private daybookQuery = inject(DaybookQuery);
  private daybookService = inject(DaybookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public entryDate: {day: number, month: string, yearDay: string} | null = null;
  public entryForm: FormGroup | null = null;
  public entry: Entry | null = null;

  constructor() {
    this.buildForm();
    this.route.params.subscribe({
      next: (param) => {
        if(param['id']) {
          this.loadEntry(param['id']);
        }
      }
    })
  }

  ngOnInit() { }

  buildForm(): void {
    this.entryForm = new FormGroup({
      date: new FormControl(),
      text: new FormControl()
    });
  }

  loadEntry(entryId: string): void {
    if(entryId=== 'new') {
      this.entryForm?.patchValue({
        date: new Date().toDateString(),
        text: 'New Entry'
      });
      this.entryDate = getDayMonthYear(this.entryForm?.controls['date'].value);
    }

    if(entryId !== 'new') {
      this.daybookQuery.entryById(entryId)
      .pipe( tap((val) => console.log(val)))
      .subscribe({
        next: (entry) => {
          if(entry !== undefined) {
            this.entry = entry;
            this.entryForm?.patchValue({
              date: entry.date,
              text: entry.text
            });
            this.entryDate = getDayMonthYear(entry.date);
          } else {
            this.router.navigate(['/daybook/no-entry-selected'])
          }
        }
      });
    }
  }

  onSubmit(): void {
    this.daybookService.createEntry(this.entryForm?.value as Entry);
  }
}