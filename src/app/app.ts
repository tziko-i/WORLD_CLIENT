import { Component, signal, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('DatingApp-Client');
  protected myname = 'John Doe';
  protected members = signal<any>([]);

  // ctor -- 1
  constructor() {}

  // Dependency Injection -- 2
  private http = inject(HttpClient);

  // -- 3
  async ngOnInit(){
    this.members.set(await this.getMembers());
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('http://localhost:5094/api/members'));
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }

  
  
}