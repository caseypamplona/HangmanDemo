import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  public availableWords = [];
  removedWords = new BehaviorSubject<string[]>([]);
  usedWords: string[] = [];
  originalList = ['JAVASCRIPT', 'TYPESCRIPT', 'ALGORITHM', 'SNIPPETS', 'PROGRAMMING', 'DEVELOPERS', 'CODESTACK'];

  constructor() {
    this.availableWords = this.originalList;
  }

  removeWord(word: string) {
    this.availableWords = this.availableWords.filter(a => a !== word);
    this.usedWords.push(word);
    this.removedWords.next(this.usedWords);

    if (this.availableWords.length === 0) {
      this.availableWords = this.originalList;
      this.usedWords = [];
      this.removedWords.next(this.usedWords);
    }
  }
}
