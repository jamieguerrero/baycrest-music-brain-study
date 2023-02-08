import { useFields } from "../../lib/hooks";
import { auth } from "../../lib/firebase";

export function NewUserForm() {
  const { fields, handleChange } = useFields({
    new_username: "",
    new_password: "",
  });

  async function createNewUser() {
    await auth.signInWithEmailAndPassword(fields.username, fields.password);
  }

  return (
    <form onSubmit={createNewUser}>
      <h4>Create New User</h4>
      <input
        name="new_username"
        value={fields.new_username}
        onChange={handleChange}
      />
      <input
        name="new_password"
        value={fields.new_password}
        onChange={handleChange}
      />
      <button type="submit" onClick={createNewUser}>
        Create User
      </button>
    </form>
  );
}
