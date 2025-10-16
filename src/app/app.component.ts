import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  loading = false;
  protected members = signal<any>([]);

  private http = inject(HttpClient);

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  async ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });

    try {
      this.members.set(await lastValueFrom(this.http.get('http://localhost:5094/api/members')));
    } catch (err) {
      console.error(err);
    }
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: () => { alert('Registered!'); this.loading = false; },
      error: (err: any) => { alert(err?.error?.message || 'Error'); this.loading = false; }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe({
      next: () => { alert('Logged in!'); this.loading = false; },
      error: (err: any) => { alert(err?.error?.message || 'Error'); this.loading = false; }
    });
  }
}
