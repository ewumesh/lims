import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirm_password').value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMatch: true };
  }

  return null;
};
