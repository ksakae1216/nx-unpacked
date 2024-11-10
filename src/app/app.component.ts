import { CommonModule } from '@angular/common';
import { Component, effect, signal, untracked } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, MatSelectModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loginMethods = ['Email', 'Google', 'GitHub'];

  selectedLoginMethod = signal(this.loginMethods[0]);

  constructor(private snackBar: MatSnackBar) {
    const count = signal(0);
    effect(
      () => {
        const loginMethod = this.selectedLoginMethod();
        const currentCount = untracked(() => count()); // countの変更ではeffectを発火させたくない
        this.showToast(
          `${currentCount}回目: ログイン方法が${loginMethod}に変更されました`
        );
        count.set(currentCount + 1);
      },
      { allowSignalWrites: true }
    );
  }

  private showToast(message: string) {
    this.snackBar.open(message, '閉じる', {
      duration: 3000,
    });
  }
}
