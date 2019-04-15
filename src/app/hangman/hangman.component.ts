import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HangmanService } from '../hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  alphabet = [];
  lives = 10;
  gameOver: boolean;
  displayLetters = [];
  displayWord: string;
  selectedWord: string;
  removedWords: string[];

  buttonsClicked: any[] = [];
  myStickman: any;
  @ViewChild('myCanvas') public canvasRef: ElementRef;
  constructor(private hangmanService: HangmanService) {

  }

  ngOnInit() {
    this.createAlphabet();
    this.selectWord();

    this.hangmanService.removedWords.subscribe(x => {
      this.removedWords = x;
    });
  }

  selectWord() {
    const index = Math.floor(Math.random() * Math.floor(this.hangmanService.availableWords.length));
    this.selectedWord = this.hangmanService.availableWords[index];
    this.displayWord = this.selectedWord.replace(/./g, '_');
    this.canvas();
  }

  check(letter: string, button) {
    const indexes = [];
    this.buttonsClicked.push(button.target);
    button.target.classList.add('unavailable');
    if (this.selectedWord.indexOf(letter) > -1) {
      for (let i = 0; i < this.selectedWord.length; i++) {
        if (this.selectedWord[i] === letter) {
          indexes.push(i);
        }
      }

      for (const index of indexes) {
        this.displayWord = this.displayWord.substr(0, index) + letter + this.displayWord.substr(index + 1);
      }

      if (this.displayWord.indexOf('_') === -1) {
        alert('Congratulations! You won!');
        this.gameOver = true;
        this.hangmanService.removeWord(this.selectedWord);
      }

    } else {
      this.animate();
    }
  }


  createAlphabet() {
    this.alphabet = [];
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  reset() {
    for (const buttons of this.buttonsClicked) {
      if (buttons && buttons.classList) {
        buttons.classList.remove('unavailable');
      }
    }
    this.lives = 10;
    this.gameOver = false;
    this.displayWord = '';
    this.selectWord();
    const myStickman = this.canvasRef.nativeElement.getContext('2d');
    myStickman.clearRect(0, 0, 400, 400);
  }


  animate() {
    if (this.lives === 10) { this.rightLeg(); }
    if (this.lives === 9) { this.leftLeg(); }
    if (this.lives === 8) { this.rightArm(); }
    if (this.lives === 7) { this.leftArm(); }
    if (this.lives === 6) { this.torso(); }
    if (this.lives === 5) { this.head(); }
    if (this.lives === 4) { this.frame4(); }
    if (this.lives === 3) { this.frame3(); }
    if (this.lives === 2) { this.frame2(); }
    if (this.lives === 1) { this.frame1(); }
    this.lives--;

    if (this.lives <= 0) {
      this.gameOver = true;
      this.displayWord = this.selectedWord;
      this.hangmanService.removeWord(this.selectedWord);
    }
  }


  canvas() {
    const myStickman = this.canvasRef.nativeElement.getContext('2d');
    myStickman.beginPath();
    myStickman.strokeStyle = '#4d9124';
    myStickman.lineWidth = 2;
  }

  head() {
    const myStickman = this.canvasRef.nativeElement.getContext('2d');
    myStickman.beginPath();
    myStickman.arc(60, 25, 10, 0, Math.PI * 2, true);
    myStickman.stroke();
  }

  frame1() {
    this.draw(0, 150, 150, 150);
  }

  frame2() {
    this.draw(10, 0, 10, 600);
  }

  frame3() {
    this.draw(0, 5, 70, 5);
  }

  frame4() {
    this.draw(60, 5, 60, 15);
  }

  torso() {
    this.draw(60, 36, 60, 70);
  }

  rightArm() {
    this.draw(60, 46, 100, 50);
  }

  leftArm() {
    this.draw(60, 46, 20, 50);
  }

  rightLeg() {
    this.draw(60, 70, 100, 100);
  }

  leftLeg() {
    this.draw(60, 70, 20, 100);
  }

  draw(pathFromx, pathFromy, pathTox, pathToy) {
    const myStickman = this.canvasRef.nativeElement.getContext('2d');
    myStickman.moveTo(pathFromx, pathFromy);
    myStickman.lineTo(pathTox, pathToy);
    myStickman.stroke();
  }


}
