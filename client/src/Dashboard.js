export default function Dashboard({ setPage }) {
  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => setPage("booking")}>Bookings</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}