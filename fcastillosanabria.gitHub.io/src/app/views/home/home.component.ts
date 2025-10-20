import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Lista de roles que se van escribiendo
  roles: string[] = [
    "Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI Specialist",
    "Systems Administrator",
    "Database Administrator",
    "Full Stack Developer",
    "Administrator"
  ];

  currentRole = '';
  private roleIndex = 0;
  private typingSpeed = 150;
  private erasingSpeed = 100;

  // Rotación de imágenes
  images: string[] = [
    'assets/linux-pc.png',
    'assets/linuxOS.png',
    'assets/linuxSleeping.png'
  ];

  currentImage = 'assets/logoLinux.png';
  private imageIndex = 0;
  isFading = false;

  ngOnInit(): void {
    this.startRoleAnimation();
    this.startImageRotation();
  }

  /** ===============================
   * Animación de texto (typing effect)
   * =============================== */
  private startRoleAnimation(): void {
    const role = this.roles[this.roleIndex];
    this.typeEffect(role, () => {
      setTimeout(() => {
        this.eraseEffect(() => {
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          this.startRoleAnimation();
        });
      }, 1000);
    });
  }

  private typeEffect(text: string, callback: () => void): void {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.currentRole += text[i];
        i++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, this.typingSpeed);
  }

  private eraseEffect(callback: () => void): void {
    const interval = setInterval(() => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.slice(0, -1);
      } else {
        clearInterval(interval);
        callback();
      }
    }, this.erasingSpeed);
  }

  /** ===============================
   * Rotación de imágenes
   * =============================== */
  private startImageRotation(): void {
    setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.imageIndex = (this.imageIndex + 1) % this.images.length;
        this.currentImage = this.images[this.imageIndex];
        this.isFading = false;
      }, 1000);
    }, 4000);
  }
}
