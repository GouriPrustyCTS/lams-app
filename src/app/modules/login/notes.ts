import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server'; // ✅ correct import
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';

@NgModule({
  imports: [LoginModule, ServerModule],
  providers: [provideServerRendering()],
  // bootstrap: [LoginComponent]
})
export class LoginServerModule {}
