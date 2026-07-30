

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/disappointed" element={<About />} />
    </Routes>
  );
}