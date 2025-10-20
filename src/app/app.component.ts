import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],   // 👈 ADD THIS LINE HERE
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
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
    const payload = this.registerForm.value;
    console.log('Register payload:', payload);
    this.auth.register(payload).subscribe({
      next: (res: any) => { console.log('Register response:', res); alert('Registered!'); this.loading = false; },
      error: (err: any) => { console.error('Register error full:', err); alert(err?.error?.message || ('Error (' + (err?.status || 'no-status') + ')')); this.loading = false; }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const payload = this.loginForm.value;
    console.log('Login payload:', payload);
    this.auth.login(payload).subscribe({
      next: (res: any) => { console.log('Login response:', res); alert('Logged in!'); this.loading = false; },
      error: (err: any) => { console.error('Login error full:', err); alert(err?.error?.message || ('Error (' + (err?.status || 'no-status') + ')')); this.loading = false; }
    });
  }
}
