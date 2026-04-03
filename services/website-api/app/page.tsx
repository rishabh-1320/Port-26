export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", lineHeight: 1.5 }}>
      <h1>Website API Service</h1>
      <p>Available endpoints:</p>
      <ul>
        <li>/health</li>
        <li>/api/site-config</li>
        <li>/api/pages/:slug</li>
      </ul>
    </main>
  );
}
