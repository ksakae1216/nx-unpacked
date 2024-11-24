import { CommonModule } from '@angular/common';
import { Component, effect, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="container">
      <h2>ボタンカウンター</h2>

      <div class="button-group">
        <button mat-raised-button color="primary" (click)="incrementButton1()">
          ボタン1
        </button>
        <p>ボタン1が押された回数: {{ button1Count() }}</p>
      </div>

      <div class="button-group">
        <button mat-raised-button color="accent" (click)="incrementButton2()">
          ボタン2
        </button>
        <p>ボタン2が押された回数: {{ button2Count() }}</p>
      </div>

      <div class="log-info">
        <p>ログ出力回数: {{ logCount() }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
      }
      .button-group {
        margin: 20px 0;
      }
      button {
        border: 2px solid #ccc !important;
      }
      button[color='primary'] {
        border-color: #3f51b5 !important;
      }
      button[color='accent'] {
        border-color: #ff4081 !important;
      }
      .log-info {
        margin-top: 20px;
        color: #666;
      }
    `,
  ],
})
export class AppComponent {
  button1Count = signal(0);
  button2Count = signal(0);
  logCount = signal(0);

  constructor() {
    effect(
      () => {
        const count1 = this.button1Count();
        if (count1 >= 5) {
          const count2 = untracked(() => this.button2Count());
          // const count2 = this.button2Count();
          console.log(
            `#ボタン1ログ送信：ボタン1が5回を超えました(${count1}回), ボタン2の現在値: ${count2}回`
          );
          this.logCount.update((count) => count + 1);
        }
      },
      { allowSignalWrites: true }
    );
  }

  incrementButton1() {
    this.button1Count.update((count) => count + 1);
  }

  incrementButton2() {
    this.button2Count.update((count) => count + 1);
  }
}
