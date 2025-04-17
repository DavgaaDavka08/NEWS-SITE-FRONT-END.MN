import { Category } from "./_Components/Category";
import { SiteHeader } from "./_Components/Header";
import { Navbar } from "./_Components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SiteHeader />
      <Category />
    </div>
  );
}
