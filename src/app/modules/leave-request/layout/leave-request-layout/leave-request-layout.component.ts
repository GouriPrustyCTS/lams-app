// C:\Users\2402077\OneDrive - Cognizant\Desktop\project-1\ANGULAR\lams-app\src\app\modules\leave-request\layout\leave-request-layout.component.ts

import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; // <-- Import RouterModule
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-request-layout',
  standalone: true, // <-- Add this line: Mark the component as standalone
  imports: [
    CommonModule,   // <-- Add CommonModule to use *ngIf, *ngFor, etc.
    RouterModule    // <-- Add RouterModule to use <router-outlet>
  ],
  templateUrl: './leave-request-layout.component.html',
  styleUrls: ['./leave-request-layout.component.css'] // Component-specific styles if any
})
export class LeaveRequestLayoutComponent implements OnInit, OnDestroy {
  isSidebarPinned: boolean = false; // For desktop: true if sidebar is explicitly pinned
  isSidebarOpen: boolean = false; // For desktop: true if sidebar is hovered or pinned
  isSidebarOpenMobile: boolean = false; // For mobile: true if offcanvas sidebar is open

  // Added `window` property to make it accessible in the template for `window.innerWidth`
  // Make sure your template uses `this.window.innerWidth` or a getter if you prefer
  window: Window = window;

  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Close mobile sidebar on route change within this module
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebarMobile();
    });

    // Set initial sidebar state based on screen width
    this.checkScreenWidth();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Toggle sidebar for desktop pinning
  toggleSidebar(): void {
    this.isSidebarPinned = !this.isSidebarPinned;
    // When pinned, sidebar is "open"
    if (this.isSidebarPinned) {
      this.isSidebarOpen = true;
    } else {
      // If unpinned, and not hovered, it collapses
      this.isSidebarOpen = false;
    }
    // Also toggle mobile state if on mobile (handle click for mobile menu)
    if (window.innerWidth <= 768) {
      this.isSidebarOpenMobile = !this.isSidebarOpenMobile;
    }
  }

  // Handle desktop hover state
  onSidebarHover(isHovering: boolean): void {
    // Only apply hover effect if not pinned and on desktop
    if (!this.isSidebarPinned && window.innerWidth > 768) {
      this.isSidebarOpen = isHovering;
    }
  }

  // Close mobile sidebar (e.g., when clicking outside or a link)
  closeSidebarMobile(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarOpenMobile = false;
    }
  }

  // Listen for window resize to adjust sidebar behavior
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    if (window.innerWidth > 768) {
      // Desktop: Sidebar starts collapsed unless pinned
      this.isSidebarOpenMobile = false; // Ensure mobile sidebar is closed
      // Maintain pinned state if it was set
      if (this.isSidebarPinned) {
        this.isSidebarOpen = true;
      } else {
        this.isSidebarOpen = false; // Collapsed by default on desktop if not pinned
      }
    } else {
      // Mobile: Sidebar starts hidden
      this.isSidebarPinned = false; // No pinning on mobile
      this.isSidebarOpen = false; // No hover state on mobile
      // Mobile sidebar state is controlled by isSidebarOpenMobile
    }
  }
}