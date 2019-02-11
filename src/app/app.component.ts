import { Component } from '@angular/core';
import { CatsService } from './services/cats.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  scoreGame = '';
  showBtnStart = true;
  countDownEmoji : number;
  emojiArray = ['🚗', '🌌', '📻', '👻', '🍦', '👽', '👯'];
  emojiIndex : number;
  maxNumberEmoji = this.emojiArray.length - 1;
  countDownEmojiSize = 5;
  emojiAskIndex: number;
  youWin = false;
  catURL = '';
constructor(private catsService: CatsService) { }

  startGame(){
    this.showBtnStart = false;
    this.randomEmoji();
  }

  randomEmoji(){
    this.emojiIndex = Math.round(Math.random() * this.maxNumberEmoji);
    this.startCountDownFirstEmoji();
  }

  startCountDownFirstEmoji(){
    const intervalEmoji = setInterval(() => this.intervalEmojiControl(intervalEmoji), 1000);
  }

  intervalEmojiControl(intervalEmoji){
    this.countDownEmoji = this.countDownEmojiSize--;

    if(this.countDownEmoji < 0){
      clearInterval(intervalEmoji);
      this.thisIsYourEmoji();
    }
  }

  compareAnswer(answer) {
    switch (answer) {
      case 'YES':
        if (this.emojiIndex === this.emojiAskIndex) {
          this.scoreGame = this.scoreGame + '✅';
          this.finishGame();
        } else {
          this.scoreGame = this.scoreGame + '❌';
        }
        break;
      case 'NO':
        if (this.emojiIndex !== this.emojiAskIndex) {
          this.scoreGame = this.scoreGame + '✅';
          this.thisIsYourEmoji();
        } else {
          this.scoreGame = this.scoreGame + '❌';
        }
        break;
    }
  }

  thisIsYourEmoji() {
    this.emojiAskIndex = Math.round(Math.random() *             this.maxNumberEmoji);
  }

  finishGame() {
    this.youWin = true;
    this.getCatImage();
  }

  getCatImage(): void {
    this.catsService
    .getImage()
    .subscribe(
   resultQuestion => this.catURL = resultQuestion[0].url,
    error => (console.log('Ups! we have an error: ', error))
    )
  }
}
