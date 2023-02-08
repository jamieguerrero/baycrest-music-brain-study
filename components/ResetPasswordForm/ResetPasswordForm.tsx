import { useFields } from "../../lib/hooks";

import { auth } from "../../lib/firebase";

export function ResetPasswordForm() {
  const { fields, handleChange } = useFields({
    email: "",
  });

  const resetPassword = () => auth.sendPasswordResetEmail(fields.email);

  return (
    <form>
      <h4>Reset Password</h4>
      <label>Email</label>
      <input name="email" value={fields.email} onChange={handleChange} />
      <button onClick={resetPassword}>Reset Password</button>
    </form>
  );
}
